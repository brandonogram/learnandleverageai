import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, zipCode, age } = body;

    if (!name || !email || !phone || !zipCode || !age) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    // Split name into first and last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Push contact to GoHighLevel
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (!ghlApiKey || !ghlLocationId) {
      console.error('GHL credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
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
        phone,
        postalCode: zipCode,
        tags: ['facebook-lead', 'llai-connect-form'],
        source: 'Facebook Video - Connect Form',
        customFields: [
          { id: 'b1i6FqoUpRQ8vCKFHNY8', field_value: String(age) },
        ],
      }),
    });

    if (!ghlRes.ok) {
      const errText = await ghlRes.text();
      console.error('GHL API error:', ghlRes.status, errText);
      return NextResponse.json(
        { error: 'Failed to save your info. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('Connect form error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
