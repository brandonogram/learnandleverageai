import { NextRequest, NextResponse } from 'next/server';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';

interface WaitlistPayload {
  full_name: string;
  email: string;
  location_preference: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

async function sendWaitlistEmail(email: string, firstName: string): Promise<void> {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) {
    console.error('AGENTMAIL_API_KEY not configured, skipping waitlist email');
    return;
  }

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 500px; color: #1C1917; font-size: 15px; line-height: 1.5; text-align: left;">
  <p>Hi ${firstName},</p>
  <p>You're on the list. When we lock in the next workshop date and location, you'll be the first to know.</p>
  <p>These are small sessions (10-15 people max), so waitlist gets priority seating.</p>
  <p>In the meantime, if you have a specific AI question or a task you wish you could automate, just reply to this email. I read every one.</p>
  <p>— Brandon</p>
  <p style="color: #78716C; font-size: 13px; margin-top: 20px;">Learn & Leverage AI<br/>(302) 416-6285 | info@learnandleverageai.com</p>
</div>
`.trim();

  const res = await fetch(
    'https://api.agentmail.to/v0/inboxes/info@learnandleverageai.com/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: [email],
        subject: "You're on the waitlist — we'll reach out soon",
        html,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error('AgentMail send error:', res.status, errText);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistPayload = await request.json();

    if (!body.full_name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const nameParts = body.full_name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const tags = ['waitlist'];
    if (body.location_preference) tags.push(`location:${body.location_preference}`);
    if (body.utm_source) tags.push(`source:${body.utm_source}`);
    if (body.utm_medium) tags.push(`medium:${body.utm_medium}`);
    if (body.utm_campaign) tags.push(`campaign:${body.utm_campaign}`);

    // Create or update contact in GHL
    const contactPayload = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email: body.email,
      tags,
      source: body.utm_source || 'waitlist',
    };

    const contactRes = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_TOKEN}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok && (contactRes.status === 422 || contactRes.status === 400)) {
      // Duplicate — that's fine, they're already a contact
      console.log('GHL duplicate detected for waitlist signup:', body.email);
    } else if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error('GHL create contact error:', contactRes.status, errText);
    }

    // Send waitlist confirmation email
    try {
      await sendWaitlistEmail(body.email, firstName);
    } catch (err) {
      console.error('Error sending waitlist email:', err);
    }

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist!",
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
