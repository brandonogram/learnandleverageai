import { NextRequest, NextResponse } from 'next/server';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';
const PIPELINE_ID = process.env.GHL_PIPELINE_ID || 'Lb2EtR2nnxlLGRWCwBpD';
const STAGE_ID = process.env.GHL_STAGE_ID || 'cda116cd-7fa9-428f-9e44-073d9de85036';
const AI_SKILL_FIELD_ID = 'kZhmzNgVM6wxpGziPzgj';
const CHALLENGE_FIELD_ID = 'zvozfQ2LOnzBBzpVF204';

interface RegistrationPayload {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  job_title: string;
  ai_skill_level: string;
  biggest_challenge: string;
  source: string;
  registered_at: string;
  // UTM parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

function buildConfirmationEmailHtml(firstName: string): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <p>Hi ${firstName},</p>

  <p>You are officially registered for the AI Hands-On Workshop. I am looking forward to meeting you.</p>

  <p>Here are the details:</p>

  <table style="border-collapse: collapse; margin: 16px 0;">
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">What:</td><td>AI Hands-On: Walk Out With 3 Tools Working For Your Job</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">When:</td><td>Thursday, April 2, 2026, 6:00 PM - 8:00 PM EST</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Where:</td><td>Wilmington, DE area (exact venue details coming soon)</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Cost:</td><td>Free</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Parking:</td><td>Available on-site (free)</td></tr>
  </table>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

  <p><strong>What to bring:</strong></p>
  <ol>
    <li><strong>Your work laptop</strong> (fully charged) — you will be setting up AI tools during the session</li>
    <li><strong>A charger</strong> — we will have power strips, but bring your own just in case</li>
    <li><strong>A specific work task</strong> you want AI help with — we will use real examples from your job during the exercises</li>
    <li><strong>An open mind</strong> — no tech experience required, I promise</li>
  </ol>

  <p><strong>What is provided:</strong></p>
  <ul>
    <li>Printed workbook with all exercises</li>
    <li>Coffee, water, and light snacks</li>
    <li>Wi-Fi (you will need it — we use AI tools live)</li>
    <li>Resource guide with QR codes to every tool we cover</li>
  </ul>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

  <p><strong>What to expect:</strong></p>
  <ul>
    <li><strong>First Hour:</strong> What AI actually is — demystified, no buzzwords. Live demos. Then prompt engineering for YOUR job — hands-on exercises with your real tasks.</li>
    <li><strong>Second Hour:</strong> AI agents and automation — see how AI handles repetitive work (I will demo my own tools). Then build your toolkit — you set up AI tools on your laptop. You leave with them working.</li>
  </ul>

  <p>This is a small group (25 people max) so you will get individual attention. If you get stuck on anything, I will be right there to help.</p>

  <p><strong>One favor:</strong> If something comes up and you cannot make it, please let me know so I can give your seat to someone on the waitlist. Just reply to this email.</p>

  <p>See you on April 2,<br/>Brandon</p>

  <p><em>P.S. — Wondering if your company will cover this as professional development? Even though the workshop is free, it helps to have it on record as training.</em></p>
</div>
`.trim();
}

async function sendConfirmationEmail(email: string, firstName: string): Promise<void> {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) {
    console.error('AGENTMAIL_API_KEY not configured, skipping confirmation email');
    return;
  }

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
        subject: "You're in! AI Workshop — Thursday, April 2",
        html: buildConfirmationEmailHtml(firstName),
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error('AgentMail send error:', res.status, errText);
  } else {
    console.log('Confirmation email sent to', email);
  }
}

async function sendConfirmationSms(phone: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE;

  if (!accountSid || !authToken || !fromPhone) {
    console.error('Twilio env vars not configured, skipping confirmation SMS');
    return;
  }

  const body =
    "You're registered for the free AI workshop! Thursday April 2, 6-8 PM, Wilmington DE area. Bring your laptop + charger. Details coming soon. — Brandon, Learn & Leverage AI";

  const params = new URLSearchParams();
  params.append('To', phone);
  params.append('From', fromPhone);
  params.append('Body', body);

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error('Twilio SMS send error:', res.status, errText);
  } else {
    console.log('Confirmation SMS sent to', phone);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationPayload = await request.json();

    // Validate required fields
    if (!body.full_name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      );
    }

    // Split full_name into first and last
    const nameParts = body.full_name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build UTM-based tags for attribution
    const tags = ['workshop-lead'];
    if (body.utm_source) tags.push(`source:${body.utm_source}`);
    if (body.utm_medium) tags.push(`medium:${body.utm_medium}`);
    if (body.utm_campaign) tags.push(`campaign:${body.utm_campaign}`);

    // Log UTM parameters for analytics
    if (body.utm_source || body.utm_medium || body.utm_campaign) {
      console.log('Workshop registration UTM:', {
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        utm_term: body.utm_term,
        utm_content: body.utm_content,
        email: body.email,
      });
    }

    // Step 1: Create (or update) contact in GHL
    const contactPayload = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
      companyName: body.company_name,
      tags,
      source: body.utm_source || body.source || 'workshop-landing-page',
      customFields: [
        { id: AI_SKILL_FIELD_ID, value: body.ai_skill_level },
        { id: CHALLENGE_FIELD_ID, value: body.biggest_challenge },
      ],
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

    let contactId: string | undefined;

    if (contactRes.ok) {
      const contactData = await contactRes.json();
      contactId = contactData.contact?.id;
    } else if (contactRes.status === 422) {
      // Duplicate contact — look up existing contact by email and update
      console.log('GHL duplicate contact detected, searching for existing:', body.email);
      const searchRes = await fetch(
        `${GHL_API_BASE}/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(body.email)}`,
        {
          headers: {
            Authorization: `Bearer ${GHL_API_TOKEN}`,
            Version: '2021-07-28',
          },
        }
      );
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        contactId = searchData.contact?.id;
        if (contactId) {
          // Update the existing contact with latest info and add tag
          await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${GHL_API_TOKEN}`,
              'Content-Type': 'application/json',
              Version: '2021-07-28',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              companyName: body.company_name,
              tags,
              customFields: contactPayload.customFields,
            }),
          });
          console.log('Updated existing GHL contact:', contactId);
        }
      }
    } else {
      const errText = await contactRes.text();
      console.error('GHL create contact error:', contactRes.status, errText);
      return NextResponse.json(
        { error: 'Failed to register. Please try again.' },
        { status: 500 }
      );
    }

    if (!contactId) {
      console.error('GHL contact not found or created for:', body.email);
      return NextResponse.json(
        { error: 'Registration issue. Please try again.' },
        { status: 500 }
      );
    }

    // Step 2: Add contact to pipeline
    const opportunityRes = await fetch(`${GHL_API_BASE}/opportunities/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_TOKEN}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        pipelineId: PIPELINE_ID,
        pipelineStageId: STAGE_ID,
        contactId,
        name: `${body.full_name} - Workshop Registration`,
        status: 'open',
      }),
    });

    if (!opportunityRes.ok) {
      const errText = await opportunityRes.text();
      console.error('GHL create opportunity error:', opportunityRes.status, errText);
      // Contact was created, so we still consider this partially successful
      // Don't fail the whole registration
    }

    // Step 3: Send confirmation email and SMS (fire-and-forget, don't block response)
    // Errors are logged but do NOT fail the registration
    try {
      await Promise.allSettled([
        sendConfirmationEmail(body.email, firstName),
        sendConfirmationSms(body.phone),
      ]);
    } catch (notifError) {
      console.error('Unexpected error sending notifications:', notifError);
    }

    return NextResponse.json({
      success: true,
      message: "You're registered! Check your email for details.",
    });
  } catch (error) {
    console.error('Workshop registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
