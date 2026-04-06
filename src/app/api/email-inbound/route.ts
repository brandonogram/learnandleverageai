import { NextRequest, NextResponse } from 'next/server';

const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';
const AGENTMAIL_API_KEY = process.env.AGENTMAIL_API_KEY || '';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

// ── Contact lookup by email ────────────────────────────────────────────

interface EmailContact {
  state: 'unknown' | 'registered' | 'attended' | 'no-show' | 'purchased';
  name: string;
  contactId: string | null;
}

async function lookupContactByEmail(email: string): Promise<EmailContact> {
  const empty: EmailContact = { state: 'unknown', name: '', contactId: null };
  if (!GHL_API_TOKEN || !GHL_LOCATION_ID) return empty;
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, Version: '2021-07-28' } }
    );
    if (!res.ok) return empty;
    const data = await res.json();
    const contact = data.contact;
    if (!contact?.id) return empty;
    const tags: string[] = contact.tags || [];
    const name = contact.contactName || contact.firstName || '';
    let state: EmailContact['state'] = 'unknown';
    if (tags.includes('workshop-purchased')) state = 'purchased';
    else if (tags.includes('workshop-attended')) state = 'attended';
    else if (tags.includes('workshop-no-show')) state = 'no-show';
    else if (tags.includes('workshop-lead')) state = 'registered';
    return { state, name, contactId: contact.id };
  } catch {
    return empty;
  }
}

// ── Auto-reply generation ──────────────────────────────────────────────

async function generateReply(senderEmail: string, senderName: string, subject: string, body: string, contact: EmailContact): Promise<{ subject: string; html: string } | null> {
  // Skip auto-reply for certain senders
  const lowerFrom = senderEmail.toLowerCase();
  if (lowerFrom.includes('noreply') || lowerFrom.includes('no-reply') || lowerFrom.includes('mailer-daemon') || lowerFrom.includes('postmaster')) {
    return null;
  }

  const firstName = contact.name ? contact.name.split(' ')[0] : senderName.split(' ')[0] || 'there';
  const lowerSubject = (subject || '').toLowerCase();
  const lowerBody = (body || '').toLowerCase();

  // Check if this is a venue reply (high priority — flag it, don't auto-reply)
  const isVenueReply = lowerFrom.includes('hilton') || lowerFrom.includes('doubletree') || lowerFrom.includes('embassy') ||
    lowerFrom.includes('hotel') || lowerFrom.includes('marriott') || lowerFrom.includes('venue') ||
    lowerSubject.includes('meeting room') || lowerSubject.includes('venue') || lowerSubject.includes('event space');

  if (isVenueReply) {
    console.log(`[Email] VENUE REPLY DETECTED from ${senderEmail}: ${subject}`);
    // Don't auto-reply to venues — just log it for attention
    return null;
  }

  // Generate AI reply, then wrap in clean email template with CTA
  const aiReply = await getAIEmailReply(firstName, subject, body, contact.state);
  const replyBody = aiReply || getTemplateReply(firstName, subject, body, contact.state);
  const cta = getCTA(contact.state);

  return {
    subject: `Re: ${subject}`,
    html: wrapEmail(replyBody, cta),
  };
}

// Clean email wrapper — left-aligned, simple, with CTA button
function wrapEmail(body: string, cta: { text: string; url: string } | null): string {
  const ctaHtml = cta
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td><a href="${cta.url}" style="background-color:#F59E0B;color:#1C1917;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px;display:inline-block;">${cta.text}</a></td></tr></table>`
    : '';
  return `<div style="font-family:Arial,sans-serif;max-width:500px;color:#1C1917;font-size:15px;line-height:1.5;text-align:left;">${body}${ctaHtml}<p style="color:#78716C;font-size:13px;margin-top:20px;">— Learn & Leverage AI<br/>(302) 416-6285 | info@learnandleverageai.com</p></div>`;
}

// Journey-aware CTAs
function getCTA(state: string): { text: string; url: string } | null {
  switch (state) {
    case 'unknown':
      return { text: 'Join the Waitlist — Free Workshop', url: 'https://learnandleverageai.com/workshops' };
    case 'registered':
    case 'confirmed':
      return { text: 'Know someone who should come? Share this', url: 'https://learnandleverageai.com/workshops' };
    case 'attended':
      return { text: 'Go deeper — AI Starter Pack ($497)', url: 'https://buy.stripe.com/aFa4gs97W9neg3Ycwv87K01' };
    case 'no-show':
      return { text: 'Join the waitlist for the next session', url: 'https://learnandleverageai.com/workshops' };
    case 'purchased':
      return null; // VIP — no upsell needed
    default:
      return { text: 'Learn more', url: 'https://learnandleverageai.com/workshops' };
  }
}

// Short template replies (fallback when AI is unavailable)
function getTemplateReply(firstName: string, subject: string, body: string, state: string): string {
  if (state === 'registered' || state === 'confirmed') {
    return `<p>Hi ${firstName},</p><p>Got your email. The next workshop date and location are TBA — we'll reach out as soon as the next session is confirmed. You're on the waitlist!</p>`;
  }
  if (state === 'attended') {
    return `<p>Hi ${firstName},</p><p>Great to hear from you! If you have questions about the AI tools from the workshop, just reply here.</p>`;
  }
  if (state === 'purchased') {
    return `<p>Hi ${firstName},</p><p>Got your message — I've flagged it for Brandon. He'll get back to you directly.</p>`;
  }
  if (state === 'no-show') {
    return `<p>Hi ${firstName},</p><p>We missed you! Another session is being planned — next date and venue TBA. Stay on the waitlist and you'll be first to know.</p>`;
  }
  // Unknown
  return `<p>Hi ${firstName},</p><p>Thanks for reaching out! We run free hands-on AI workshops in the Delaware and Greater Philadelphia area — small group, in-person. Next session date and location TBA. Join the waitlist at learnandleverageai.com/workshops to be first to know!</p>`;
}

async function getAIEmailReply(firstName: string, subject: string, body: string, state: string): Promise<string | null> {
  if (!GROQ_API_KEY) return null;
  try {
    const stateContext = state === 'registered'
      ? `This person previously registered for a workshop. The workshop already happened. There is no confirmed next date or venue yet. Let them know the next session is TBA and they're on the waitlist. Answer their question helpfully.`
      : state === 'attended'
        ? `This person ATTENDED a previous workshop. Thank them, answer their question, and if relevant mention paid offerings.`
        : `This person has NOT registered. Answer their question and encourage them to join the waitlist at learnandleverageai.com/workshops. The next session date and location are TBA.`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You write short, friendly email replies for Learn & Leverage AI. ${stateContext}

FACTS YOU KNOW (only use these — do NOT invent anything else):
- Free hands-on AI workshops, small group (10-15 people), in-person in the Delaware and Greater Philadelphia area
- The next session date and location are TBA — no confirmed date or venue yet
- Join the waitlist at learnandleverageai.com/workshops to be notified when the next session is announced
- No tech experience needed — bring a laptop and charger
- Instructor: Brandon Calloway — runs 5+ businesses on AI (pool company, photo booth company, voice agent company). Practitioner, not professor.
- No guest speakers — it's just Brandon teaching
- Workshops are typically 2 hours: first hour is AI basics + how to talk to AI tools for your job; second hour is automation demos + you set up AI tools on your laptop
- What we provide: printed workbook, coffee, snacks
- Paid offerings exist (mention only if asked): AI Starter Pack ($497), Advanced Workshop ($997), Corporate Training ($5K-$10K/day), Consulting ($4,997+)

CRITICAL RULES:
- NEVER make up specific details you don't have (specific food menu items beyond what's listed, room names, etc.).
- If someone asks about something not in your facts list above, say: "Good question — I'll check with Brandon and get back to you on that."
- Be direct and honest. Never be evasive or mysterious.
- Keep it to 2-3 sentences. This is email, not an essay.

Write ONLY the reply body — 2-3 sentences max. Use <p> tags only. Start with "Hi ${firstName}," then answer directly. Do NOT include sign-offs, CTAs, links, or bullet points — those are added automatically after your response.`,
          },
          { role: 'user', content: `Subject: ${subject}\n\n${body}` },
        ],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

// ── Send reply via AgentMail ───────────────────────────────────────────

async function sendReply(toEmail: string, subject: string, html: string): Promise<void> {
  if (!AGENTMAIL_API_KEY) {
    console.error('[Email] AGENTMAIL_API_KEY not set, skipping reply');
    return;
  }
  const res = await fetch('https://api.agentmail.to/v0/inboxes/info@learnandleverageai.com/messages/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${AGENTMAIL_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: [toEmail], subject, html }),
  });
  if (!res.ok) {
    console.error('[Email] AgentMail send error:', res.status, await res.text());
  } else {
    console.log(`[Email] Auto-reply sent to ${toEmail}`);
  }
}

// ── Webhook handler ────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[Email] Webhook payload keys:', Object.keys(body));

    // AgentMail webhook wraps the message in a data/payload field, or sends flat
    const msg = body.data || body.payload || body.message || body;

    // Extract sender - AgentMail sends "from" as a string like "Name <email>" or just "email"
    let senderEmail = '';
    let senderName = '';
    const rawFrom = msg.from || msg.sender || msg.from_email || '';
    if (typeof rawFrom === 'string') {
      const emailMatch = rawFrom.match(/<([^>]+)>/);
      senderEmail = emailMatch ? emailMatch[1] : rawFrom;
      const nameMatch = rawFrom.match(/^([^<]+)</);
      senderName = nameMatch ? nameMatch[1].trim() : '';
    } else if (typeof rawFrom === 'object') {
      senderEmail = rawFrom.email || rawFrom.address || '';
      senderName = rawFrom.name || '';
    }

    const subject = msg.subject || '';
    const textBody = msg.text || msg.body || msg.preview || msg.snippet || '';

    console.log(`[Email] Inbound from ${senderEmail}: "${subject}"`);

    if (!senderEmail) {
      return NextResponse.json({ status: 'ignored', reason: 'no sender' });
    }

    // Don't reply to our own emails (prevent loops)
    if (senderEmail.includes('learnandleverageai.com')) {
      return NextResponse.json({ status: 'ignored', reason: 'own email' });
    }

    // Look up contact
    const contact = await lookupContactByEmail(senderEmail);
    console.log(`[Email] Contact state: ${contact.state}, name: ${contact.name}`);

    // Generate and send auto-reply
    const reply = await generateReply(senderEmail, senderName, subject, textBody, contact);
    if (reply) {
      await sendReply(senderEmail, reply.subject, reply.html);
    }

    return NextResponse.json({ status: 'processed', contactState: contact.state, replied: !!reply });
  } catch (error) {
    console.error('[Email] Handler error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
