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
- Tell them about the free workshop
- Encourage them to register at learnandleverageai.com/workshops`,

    'sms-lead': `CONTACT STATE: This person has contacted us before but has NOT registered for the workshop yet.
- Their name: ${contact.name || 'unknown'}
- Answer their question directly
- Gently encourage registration if relevant: learnandleverageai.com/workshops`,

    registered: `CONTACT STATE: This person is ALREADY REGISTERED for the workshop.
- Their name: ${contact.name || 'a registered attendee'}
- Do NOT tell them to register — they already did!
- Answer their question helpfully and directly
- Workshop is Thursday, April 2, 6-8 PM at Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713
- If they ask logistics (what to bring, etc.), answer directly without unnecessary sign-offs`,

    confirmed: `CONTACT STATE: This person is REGISTERED and CONFIRMED for the workshop.
- Their name: ${contact.name || 'a confirmed attendee'}
- Do NOT tell them to register — they are confirmed!
- Answer their question helpfully and directly
- Workshop is Thursday, April 2, 6-8 PM at Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713`,

    attended: `CONTACT STATE: This person ATTENDED the workshop already.
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
- Offer to keep them on the list for the next one`,

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
- FREE hands-on AI workshop for corporate professionals
- Thursday, April 2, 2026, 6:00-8:00 PM
- Venue: Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713
- Parking: free on-site parking (400+ spaces)
- The venue has Wi-Fi, LCD projector, screen, and power outlets
- Complimentary water provided by the venue
- 2 hours: first hour = AI basics + how to talk to AI for your job; second hour = automation demos + set up tools on your laptop
- Bring a laptop and charger. No tech experience needed.
- Limited to 25 seats
- No guest speakers — it's just Brandon teaching
- We provide: printed workbook, coffee, and snacks
- Register at learnandleverageai.com/workshops
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
    return "Hey! Thanks for reaching out. We're hosting a FREE hands-on AI workshop on Thursday, April 2, 6-8 PM at Hilton Wilmington/Christiana in Newark, DE. No tech experience needed. Register at learnandleverageai.com/workshops. Got any questions?";
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
    return `Hey${name}! We missed you at the workshop. No worries — life happens. We're planning another session soon. Want me to keep you on the list?`;
  }

  // Purchased customer
  if (contact.state === 'purchased') {
    return `Hey${name}! Thanks for being part of the program. How can I help? If you need anything from Brandon directly, I'll have him reach out.`;
  }

  // Registered person — context-aware responses
  if (isRegistered) {
    if (lower.includes('when') || lower.includes('date') || lower.includes('time')) {
      return `The workshop is Thursday, April 2, 6-8 PM at Hilton Wilmington/Christiana in Newark, DE. You're all set${name}!`;
    }
    if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
      return `Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713. Free parking on-site (400+ spaces).`;
    }
    if (lower.includes('bring') || lower.includes('laptop') || lower.includes('need') || lower.includes('prepare')) {
      return 'Bring your laptop (fully charged), a charger, and ideally a real work task you want to speed up. We provide everything else — workbook, coffee, snacks, Wi-Fi.';
    }
    if (lower.includes('cancel') || lower.includes('can\'t make') || lower.includes('won\'t be able')) {
      return `No problem${name}. Just let us know and we'll open your seat for someone on the waitlist. You can always register for the next one. Thanks for letting us know!`;
    }
    if (lower.includes('thank') || lower.includes('awesome') || lower.includes('great') || lower.includes('perfect')) {
      return `You're welcome${name}! See you April 2 at the Hilton Wilmington/Christiana.`;
    }
    if (lower.includes('register') || lower.includes('sign up') || lower.includes('rsvp')) {
      return `You're already registered${name}! Thursday, April 2, 6-8 PM at Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713. See you there!`;
    }
    // Default for registered person
    return `Hey${name}! You're registered for the workshop on April 2. How can I help? Feel free to ask about what to bring, what we'll cover, or anything else.`;
  }

  // Known but not registered (sms-lead)
  if (lower.includes('when') || lower.includes('date') || lower.includes('time')) {
    return 'Thursday, April 2, 6:00-8:00 PM at Hilton Wilmington/Christiana, Newark, DE. Register at learnandleverageai.com/workshops!';
  }
  if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
    return "Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713. Free parking on-site. Register at learnandleverageai.com/workshops!";
  }
  if (lower.includes('cost') || lower.includes('price') || lower.includes('free') || lower.includes('how much')) {
    return "Completely FREE. No catch. Brandon runs it to show people what AI can do. Optional paid programs start at $297 if you want to go deeper, but the workshop is free.";
  }
  if (lower.includes('register') || lower.includes('sign up') || lower.includes('rsvp') || lower.includes('spot')) {
    return 'Register here: learnandleverageai.com/workshops — takes 15 seconds (just name, email, phone). See you there!';
  }
  if (lower.includes('thank') || lower.includes('awesome') || lower.includes('great')) {
    return "You're welcome! Register at learnandleverageai.com/workshops if you haven't yet — spots are limited to 25.";
  }

  return "Great question! Reply here and I'll help, or check out all the details at learnandleverageai.com/workshops.";
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
