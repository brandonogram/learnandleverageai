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
  company_name?: string;
  job_title?: string;
  ai_skill_level?: string;
  biggest_challenge?: string;
  source: string;
  registered_at: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

function buildConfirmationEmailHtml(firstName: string): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 500px; color: #1C1917; font-size: 15px; line-height: 1.5; text-align: left;">

  <p>Hi ${firstName},</p>

  <p>You're registered. Here are the details:</p>

  <table style="border-collapse: collapse; margin: 12px 0; font-size: 15px;">
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">What:</td><td>Free AI Hands-On Workshop</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">When:</td><td>Thursday, April 2, 2026, 6:00 - 8:00 PM EST</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Where:</td><td>Hilton Christiana</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Address:</td><td>100 Continental Dr, Newark, DE 19713</td></tr>
  </table>

  <p><strong>What to bring:</strong> Your laptop (charged), a charger, and a real work task you want to speed up with AI. That's it. We provide everything else — workbook, coffee, snacks, Wi-Fi.</p>

  <p>Small group (25 max), so you'll get individual attention. If something comes up and you can't make it, just reply so I can open your seat.</p>

  <p>— Brandon</p>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
    <tr>
      <td style="padding-right: 8px;">
        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+Hands-On+Workshop&dates=20260402T220000Z/20260403T000000Z&details=Free+AI+workshop+with+Brandon+Calloway.+Bring+your+laptop+%26+charger.+100+Continental+Dr,+Newark+DE+19713.&location=Hilton+Christiana,+100+Continental+Dr,+Newark,+DE+19713&sf=true" style="background-color: #F59E0B; color: #1C1917; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block;">Add to Google Calendar</a>
      </td>
      <td>
        <a href="https://learnandleverageai.com/workshop-april2.ics" style="background-color: #FFFFFF; color: #1C1917; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block; border: 1px solid #D6D3D1;">Apple / Outlook (.ics)</a>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 12px;">
    <tr><td><a href="https://learnandleverageai.com/workshops" style="color: #78716C; font-size: 13px; text-decoration: underline;">Know someone who should come? Share this link</a></td></tr>
  </table>

  <p style="color: #78716C; font-size: 13px; margin-top: 20px;">Learn & Leverage AI<br/>(302) 416-6285 | info@learnandleverageai.com</p>

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
        subject: "You're in! Free AI Workshop — Thursday, April 2",
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
    "You're registered for the free AI workshop! Thursday, April 2, 6-8 PM at Hilton Christiana, 100 Continental Dr, Newark, DE 19713. Bring your laptop + charger. — Brandon, Learn & Leverage AI";

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
    const customFields: { id: string; value: string }[] = [];
    if (body.ai_skill_level) customFields.push({ id: AI_SKILL_FIELD_ID, value: body.ai_skill_level });
    if (body.biggest_challenge) customFields.push({ id: CHALLENGE_FIELD_ID, value: body.biggest_challenge });

    const contactPayload: Record<string, unknown> = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
      tags,
      source: body.utm_source || body.source || 'workshop-landing-page',
    };
    if (body.company_name) contactPayload.companyName = body.company_name;
    if (customFields.length > 0) contactPayload.customFields = customFields;

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
    } else if (contactRes.status === 422 || contactRes.status === 400) {
      // Duplicate contact — GHL may match on email OR phone
      const errBody = await contactRes.json().catch(() => ({}));
      console.log('GHL duplicate detected:', JSON.stringify(errBody));

      // Try to get contactId from the error response (GHL includes it)
      contactId = errBody?.meta?.contactId;

      // If not in error, search by email then by phone
      if (!contactId) {
        const emailSearch = await fetch(
          `${GHL_API_BASE}/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(body.email)}`,
          { headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, Version: '2021-07-28' } }
        );
        if (emailSearch.ok) {
          const data = await emailSearch.json();
          contactId = data.contact?.id;
        }
      }

      if (!contactId) {
        const phoneSearch = await fetch(
          `${GHL_API_BASE}/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&number=${encodeURIComponent(body.phone)}`,
          { headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, Version: '2021-07-28' } }
        );
        if (phoneSearch.ok) {
          const data = await phoneSearch.json();
          contactId = data.contact?.id;
        }
      }

      if (contactId) {
        // Update existing contact
        const updatePayload: Record<string, unknown> = { firstName, lastName, tags };
        if (body.company_name) updatePayload.companyName = body.company_name;
        if (customFields.length > 0) updatePayload.customFields = customFields;
        await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, 'Content-Type': 'application/json', Version: '2021-07-28' },
          body: JSON.stringify(updatePayload),
        });
        console.log('Updated existing GHL contact:', contactId);
      } else {
        // Can't find the duplicate — register anyway, skip GHL pipeline
        console.error('Duplicate detected but contact not found. Proceeding without GHL pipeline.');
        contactId = 'skip-pipeline';
      }
    } else {
      const errText = await contactRes.text();
      console.error('GHL create contact error:', contactRes.status, errText);
      // Don't fail the registration — still send confirmation
      contactId = 'skip-pipeline';
    }

    // contactId might be 'skip-pipeline' if GHL had issues — still send confirmations

    // Step 2: Add contact to pipeline (skip if GHL had issues)
    if (contactId === 'skip-pipeline') {
      console.log('Skipping pipeline — GHL contact issue, but still sending confirmations');
    }
    const opportunityRes = contactId !== 'skip-pipeline' ? await fetch(`${GHL_API_BASE}/opportunities/`, {
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
    }) : null;

    if (opportunityRes && !opportunityRes.ok) {
      const errText = await opportunityRes.text();
      console.error('GHL create opportunity error:', opportunityRes.status, errText);
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
