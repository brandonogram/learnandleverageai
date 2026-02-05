import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, industry, question } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    // Log registration (visible in Vercel logs)
    console.log('New event registration:', {
      name,
      email,
      company: company || 'N/A',
      industry: industry || 'N/A',
      question: question || 'N/A',
      timestamp: new Date().toISOString(),
    });

    // TODO: Connect to your preferred backend:
    // - Google Sheets API (add row to spreadsheet)
    // - SendGrid/Resend (send confirmation email)
    // - Supabase (store in database)
    // - Zapier webhook (trigger automation)
    //
    // Example with a webhook:
    // await fetch(process.env.REGISTRATION_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, company, industry, question }),
    // });

    return NextResponse.json({ success: true });
  } catch {
    console.error('Registration error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
