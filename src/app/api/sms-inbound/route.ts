import { NextRequest, NextResponse } from 'next/server';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE = process.env.TWILIO_PHONE || '';
const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

// ── Contact state detection ────────────────────────────────────────────

type ContactState = 'unknown' | 'sms-lead' | 'registered' | 'confirmed' | 'attended' | 'no-show' | 'purchased';

interface ContactInfo {
  state: ContactState;
  name: string;
  contactId: string | null;
  tags: string[];
}

async function lookupContact(phone: string): Promise<ContactInfo> {
  const empty: ContactInfo = { state: 'unknown', name: '', contactId: null, tags: [] };
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&number=${encodeURIComponent(phone)}`,
      { headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, Version: '2021-07-28' } }
    );
    if (!res.ok) return empty;
    const data = await res.json();
    const contact = data.contact;
    if (!contact?.id) return empty;

    const tags: string[] = contact.tags || [];
    const name = contact.contactName || contact.firstName || '';

    // Determine state from tags (most specific first)
    let state: ContactState = 'sms-lead';
    if (tags.includes('workshop-purchased')) state = 'purchased';
    else if (tags.includes('workshop-attended')) state = 'attended';
    else if (tags.includes('workshop-no-show')) state = 'no-show';
    else if (tags.includes('workshop-confirmed')) state = 'confirmed';
    else if (tags.includes('workshop-lead')) state = 'registered';

    return { state, name, contactId: contact.id, tags };
  } catch {
    return empty;
  }
}

// ── System prompt builder ──────────────────────────────────────────────

function buildSystemPrompt(contact: ContactInfo): string {
  const stateContext = {
    unknown: `CONTACT STATE: This is a NEW person — they have never contacted us before.
- Welcome them warmly
- Tell them about the free AI workshops (next date and venue TBA)
- Encourage them to join the waitlist at learnandleverageai.com/workshops to be first to know when the next session is announced`,

    'sms-lead': `CONTACT STATE: This person has contacted us before but has NOT registered for a workshop yet.
- Their name: ${contact.name || 'unknown'}
- Answer their question directly
- The next workshop date and venue are TBA — encourage them to join the waitlist at learnandleverageai.com/workshops`,

    registered: `CONTACT STATE: This person previously registered for a workshop.
- Their name: ${contact.name || 'a past registrant'}
- The previous workshop has already happened. There is no confirmed next date or venue yet.
- Let them know the next session date and location are TBA
- Encourage them to stay on the waitlist at learnandleverageai.com/workshops for first access
- Answer their question helpfully and directly`,

    confirmed: `CONTACT STATE: This person previously confirmed for a workshop.
- Their name: ${contact.name || 'a past confirmed attendee'}
- The previous workshop has already happened. There is no confirmed next date or venue yet.
- Let them know the next session date and location are TBA
- Encourage them to stay on the waitlist at learnandleverageai.com/workshops for first access
- Answer their question helpfully and directly`,

    attended: `CONTACT STATE: This person ATTENDED a previous workshop.
- Their name: ${contact.name || 'a past attendee'}
- Do NOT mention the free workshop — they already came!
- Thank them for attending if it comes up naturally
- If they ask questions about AI, help them
- If relevant, mention the paid offerings (AI Starter Pack $497, Advanced Workshop $997, Corporate Training, Consulting)
- Ask if they want to refer a colleague — they get $50 off their next purchase`,

    'no-show': `CONTACT STATE: This person REGISTERED but DID NOT ATTEND the workshop.
- Their name: ${contact.name || 'someone who missed the workshop'}
- Don't guilt them — life happens
- Let them know we missed them and a future session is being planned
- Next date and venue are TBA — encourage them to stay on the waitlist at learnandleverageai.com/workshops`,

    purchased: `CONTACT STATE: This person is a PAYING CUSTOMER.
- Their name: ${contact.name || 'a valued customer'}
- Treat them as VIP
- Answer any questions they have
- If they need Brandon directly, say you'll have him reach out personally
- Do NOT pitch them on things they already bought`,
  };

  return `You are the SMS assistant for Learn & Leverage AI. Keep responses SHORT — this is SMS, not email. Max 3-4 sentences per reply. Be friendly, conversational, and helpful.

${stateContext[contact.state]}

FACTS YOU KNOW (only use these — do NOT invent anything else):
- FREE hands-on AI workshops, small group (10-15 people), in-person in the Delaware and Greater Philadelphia area
- The next session date and location are TBA — no confirmed date or venue yet
- Join the waitlist at learnandleverageai.com/workshops to be notified when the next session is announced
- Workshops are typically 2 hours: first hour = AI basics + how to talk to AI for your job; second hour = automation demos + set up tools on your laptop
- Bring a laptop and charger. No tech experience needed.
- No guest speakers — it's just Brandon teaching
- We provide: printed workbook, coffee, and snacks
- Brandon Calloway runs 5+ businesses on AI (pool company, photo booth company, voice agent company). Practitioner, not professor.
- Contact email: info@learnandleverageai.com | Phone: (302) 416-6285
- Paid offerings (mention only if asked or if they already attended): AI Starter Pack $497, Advanced Workshop $997, Corporate Training $5K-$10K/day, Consulting $4,997+

RULES:
- NEVER make up specific details you don't have (exact address, specific food menu items, room names).
- If they ask something not in the facts above: "Good question — I'll check on that and get back to you."
- Never give out Brandon's personal phone or email
- Be warm and direct, not corporate
- Keep it SHORT — 2-3 sentences max. This is texting.
- Do NOT repeat information they already have
- If someone is just acknowledging (sounds good, ok, got it) — don't reply
- Be honest. Never be evasive or mysterious.`;
}

// ── AI response generation ─────────────────────────────────────────────

async function getAIResponse(userMessage: string, contact: ContactInfo): Promise<string> {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: buildSystemPrompt(contact) },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error('Groq error:', res.status, await res.text());
      return getTemplateResponse(userMessage, contact);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    return reply || getTemplateResponse(userMessage, contact);
  } catch (err) {
    console.error('AI response error:', err);
    return getTemplateResponse(userMessage, contact);
  }
}

// ── Template fallback responses (state-aware) ──────────────────────────

function getTemplateResponse(message: string, contact: ContactInfo): string {
  const lower = message.toLowerCase();
  const isRegistered = ['registered', 'confirmed', 'attended', 'purchased'].includes(contact.state);
  const name = contact.name ? ` ${contact.name.split(' ')[0]}` : '';

  // STOP / opt-out
  if (lower === 'stop' || lower === 'unsubscribe' || lower === 'opt out') {
    return "You've been unsubscribed. You won't receive any more messages from us. If you change your mind, just text us anytime.";
  }

  // First-time unknown contact
  if (contact.state === 'unknown') {
    return "Hey! Thanks for reaching out. We run FREE hands-on AI workshops in the Delaware and Greater Philadelphia area — small group, in-person. Next session date and location TBA. Join the waitlist at learnandleverageai.com/workshops and you'll be first to know!";
  }

  // Post-workshop attendee
  if (contact.state === 'attended') {
    if (lower.includes('thank') || lower.includes('great') || lower.includes('awesome')) {
      return `Glad you enjoyed it${name}! If you want to go deeper, check out the AI Starter Pack ($497) — includes a 1-on-1 call with Brandon. And if you know someone who'd benefit, refer them and you get $50 off.`;
    }
    return `Hey${name}! Great to hear from you. How can I help? If you have AI questions from the workshop, fire away. Or if you're interested in going deeper, I can share info on the paid programs.`;
  }

  // No-show
  if (contact.state === 'no-show') {
    return `Hey${name}! We missed you at the last workshop. No worries — life happens. Next session date and location TBA. Stay on the waitlist at learnandleverageai.com/workshops and you'll be first to know!`;
  }

  // Purchased customer
  if (contact.state === 'purchased') {
    return `Hey${name}! Thanks for being part of the program. How can I help? If you need anything from Brandon directly, I'll have him reach out.`;
  }

  // Previously registered person — context-aware responses
  if (isRegistered) {
    if (lower.includes('when') || lower.includes('date') || lower.includes('time')) {
      return `The next workshop date and location are TBA${name}. Join the waitlist at learnandleverageai.com/workshops and we'll let you know as soon as it's set!`;
    }
    if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
      return `The next workshop venue hasn't been confirmed yet. Stay on the waitlist at learnandleverageai.com/workshops for updates!`;
    }
    if (lower.includes('bring') || lower.includes('laptop') || lower.includes('need') || lower.includes('prepare')) {
      return 'Bring your laptop (fully charged), a charger, and ideally a real work task you want to speed up. We provide everything else — workbook, coffee, snacks, Wi-Fi.';
    }
    if (lower.includes('cancel') || lower.includes('can\'t make') || lower.includes('won\'t be able')) {
      return `No problem${name}. We'll keep you on the waitlist for the next session. Thanks for letting us know!`;
    }
    if (lower.includes('thank') || lower.includes('awesome') || lower.includes('great') || lower.includes('perfect')) {
      return `You're welcome${name}! We'll let you know when the next session is confirmed.`;
    }
    if (lower.includes('register') || lower.includes('sign up') || lower.includes('rsvp')) {
      return `You're on the list${name}! Next session date and location TBA. We'll reach out as soon as it's confirmed.`;
    }
    // Default for registered person
    return `Hey${name}! The next workshop date and location are TBA. You're on the waitlist — we'll let you know as soon as the next session is set. Anything else I can help with?`;
  }

  // Known but not registered (sms-lead)
  if (lower.includes('when') || lower.includes('date') || lower.includes('time')) {
    return 'Next session date and location TBA. Join the waitlist at learnandleverageai.com/workshops and you\'ll be first to know!';
  }
  if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
    return "Next venue hasn't been confirmed yet — workshops are in the Delaware and Greater Philadelphia area. Join the waitlist at learnandleverageai.com/workshops for updates!";
  }
  if (lower.includes('cost') || lower.includes('price') || lower.includes('free') || lower.includes('how much')) {
    return "Completely FREE. No catch. Brandon runs it to show people what AI can do. Optional paid programs start at $297 if you want to go deeper, but the workshop is free.";
  }
  if (lower.includes('register') || lower.includes('sign up') || lower.includes('rsvp') || lower.includes('spot')) {
    return 'Join the waitlist here: learnandleverageai.com/workshops — takes 15 seconds (just name, email, phone). We\'ll let you know when the next session is set!';
  }
  if (lower.includes('thank') || lower.includes('awesome') || lower.includes('great')) {
    return "You're welcome! Join the waitlist at learnandleverageai.com/workshops if you haven't yet — you'll be first to know when the next session drops.";
  }

  return "Great question! Reply here and I'll help, or join the waitlist at learnandleverageai.com/workshops to get notified about our next session.";
}

// ── Main handler ───────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const body = (formData.get('Body') as string || '').trim();

    console.log(`SMS received from ${from}: ${body}`);

    const lowerBody = body.toLowerCase();

    // Don't respond to conversation closers — "sounds good", "ok", "got it", thumbs up, etc.
    // These are acknowledgments, not questions. Responding creates noise.
    const closers = ['sounds good', 'ok', 'okay', 'k', 'got it', 'cool', 'perfect', 'will do', 'noted', 'yep', 'yup', 'sure', 'alright', 'all good', 'good to know', 'nice', '👍', '👌', '✅', '🙏'];
    if (closers.includes(lowerBody.trim()) || (lowerBody.length <= 3 && !lowerBody.includes('?'))) {
      console.log(`SMS from ${from}: "${body}" — conversation closer, not responding`);
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    // Handle STOP/opt-out
    if (lowerBody === 'stop' || lowerBody === 'unsubscribe' || lowerBody === 'opt out' || lowerBody === 'opt-out') {
      // Tag contact as opted out in GHL
      const contact = await lookupContact(from);
      if (contact.contactId) {
        await fetch(`https://services.leadconnectorhq.com/contacts/${contact.contactId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, 'Content-Type': 'application/json', Version: '2021-07-28' },
          body: JSON.stringify({ tags: [...contact.tags, 'sms-opt-out'] }),
        }).catch(() => {});
      }
      // Respond with opt-out confirmation (Twilio also handles STOP natively)
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Message>You've been unsubscribed. You won't receive more messages from us. Text us anytime if you change your mind.</Message></Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    // Look up contact state from GHL
    const contact = await lookupContact(from);
    console.log(`Contact state: ${contact.state}, name: ${contact.name}, id: ${contact.contactId}`);

    // Check if opted out
    if (contact.tags.includes('sms-opt-out')) {
      console.log(`SMS from opted-out contact ${from}, ignoring`);
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    // Get state-aware AI response
    const replyMessage = await getAIResponse(body, contact);

    // Send reply via Twilio
    const twilioAuth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
    await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: { Authorization: `Basic ${twilioAuth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ To: from, From: TWILIO_PHONE, Body: replyMessage }),
      }
    );

    // Create contact in GHL if unknown (first-time texter)
    if (contact.state === 'unknown') {
      await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, 'Content-Type': 'application/json', Version: '2021-07-28' },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          phone: from,
          tags: ['source:sms'],
          source: 'inbound-sms',
        }),
      }).catch((e) => console.error('GHL contact creation failed:', e));
    }

    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { headers: { 'Content-Type': 'text/xml' } }
    );
  } catch (error) {
    console.error('SMS handler error:', error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { headers: { 'Content-Type': 'text/xml' } }
    );
  }
}
