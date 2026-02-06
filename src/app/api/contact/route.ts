import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const contactData = {
      type: 'callback_request',
      name,
      email,
      phone,
      message: message || 'N/A',
      timestamp: new Date().toISOString(),
    };

    // Log contact request (visible in Vercel logs)
    console.log('NEW CALLBACK REQUEST:', JSON.stringify(contactData, null, 2));

    // Send notification email if webhook is configured
    if (process.env.NOTIFICATION_WEBHOOK_URL) {
      try {
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        });
      } catch (webhookError) {
        console.error('Webhook notification failed:', webhookError);
      }
    }

    // Send to Google Sheets if configured
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        });
      } catch (sheetsError) {
        console.error('Google Sheets webhook failed:', sheetsError);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact form error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
