import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, industry, question } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Split name into first and last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Push contact to GoHighLevel
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (ghlApiKey && ghlLocationId) {
      const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({
          locationId: ghlLocationId,
          firstName,
          lastName,
          email,
          companyName: company || undefined,
          tags: ['event-registration', industry || 'unknown-industry'],
          source: 'Learn & Leverage AI Event Page',
          customFields: [
            ...(question ? [{ key: 'question', field_value: question }] : []),
            ...(industry ? [{ key: 'industry', field_value: industry }] : []),
          ],
        }),
      });

      if (!ghlRes.ok) {
        const errText = await ghlRes.text();
        console.error('GHL API error:', ghlRes.status, errText);
      }
    } else {
      console.warn('GHL credentials not configured — contact not saved');
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('Registration error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
