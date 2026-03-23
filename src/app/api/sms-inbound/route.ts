import { NextRequest, NextResponse } from 'next/server';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE = process.env.TWILIO_PHONE || '';
const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const SYSTEM_PROMPT = `You are the SMS assistant for Learn & Leverage AI. You text with people who are interested in our free AI workshop. Be friendly, conversational, and helpful. Keep responses SHORT — this is SMS, not email. Max 3-4 sentences per reply.

WORKSHOP DETAILS:
- FREE hands-on AI workshop
- Thursday, April 2, 2026 | 6:00-8:00 PM
- Wilmington, DE area (exact venue TBD)
- 2 hours, completely hands-on
- Bring a laptop and charger
- No tech experience needed
- Register at learnandleverageai.com/workshops

ABOUT THE INSTRUCTOR:
- Brandon Calloway runs 5+ businesses using AI
- Built Call2Calendar (AI voice agent that answers phones)
- Automated operations at Tri-State Aquatic Solutions
- Runs 302 Photo Booth with AI booking
- NOT a theoretical consultant — a practitioner

WHAT ATTENDEES LEARN:
- What AI actually is (no jargon)
- How to talk to AI tools like ChatGPT and Claude
- See a live AI agent answer a phone call
- The math on how much time AI saves

PAID OFFERINGS (mention only if asked):
- Full AI Workshop ($297) — 4-hour deep dive
- AI Starter Pack ($497) — includes 1-on-1 call with Brandon
- 2-Day Intensive ($997) — capped at 10 people
- Corporate Team Training ($5K-$10K/day)
- AI Consulting ($4,997+) — done-for-you implementation

RULES:
- Never give out Brandon's personal phone or email
- Contact email: info@learnandleverageai.com
- Contact phone: (302) 416-6285
- Always encourage them to register at learnandleverageai.com/workshops
- Be warm and human, not corporate
- If they ask something you don't know, say "Great question — I'll have Brandon's team follow up on that"
- Keep it SHORT. This is texting, not a sales pitch.`;

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

async function getAIResponse(userMessage: string, isFirstMessage: boolean): Promise<string> {
  const context = isFirstMessage
    ? 'This is the first time this person has texted us. Give them a warm welcome and tell them about the workshop.'
    : 'This person has texted before. Answer their specific question directly.';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + '\n\n' + context },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('Groq error:', response.status, await response.text());
      return getTemplateResponse(userMessage, isFirstMessage);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (reply) return reply;
    return getTemplateResponse(userMessage, isFirstMessage);
  } catch (err) {
    console.error('AI response error:', err);
    return getTemplateResponse(userMessage, isFirstMessage);
  }
}

function getTemplateResponse(message: string, isFirstMessage: boolean): string {
  const lower = message.toLowerCase();

  if (isFirstMessage) {
    return "Thanks for reaching out! We're hosting a FREE hands-on AI workshop on Thursday April 2, 6-8 PM in Wilmington, DE. No tech experience needed. Register at learnandleverageai.com/workshops — got any questions?";
  }

  if (lower.includes('when') || lower.includes('date') || lower.includes('time')) {
    return 'Thursday, April 2nd, 6:00-8:00 PM. Wilmington, DE area. Register at learnandleverageai.com/workshops';
  }

  if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
    return "Wilmington, DE area — we're finalizing the exact venue this week. Register at learnandleverageai.com/workshops and we'll send you the address as soon as it's confirmed.";
  }

  if (lower.includes('cost') || lower.includes('price') || lower.includes('free') || lower.includes('pay') || lower.includes('how much')) {
    return "The workshop is completely FREE. No catch. Brandon wants to show people what AI can do — if you want to go deeper after, there are optional programs starting at $297. But the workshop itself is free.";
  }

  if (lower.includes('what') && (lower.includes('learn') || lower.includes('cover') || lower.includes('teach'))) {
    return "You'll learn what AI actually is (no jargon), how to use tools like ChatGPT for your job, see a live AI agent answer a phone call, and figure out where AI fits in your work. You walk out with tools working on your laptop.";
  }

  if (lower.includes('experience') || lower.includes('technical') || lower.includes('beginner') || lower.includes('know nothing')) {
    return "No experience needed at all. Most people who come have never used AI. That's exactly who this is for. Just bring your laptop and an open mind.";
  }

  if (lower.includes('register') || lower.includes('sign up') || lower.includes('rsvp') || lower.includes('spot')) {
    return 'Register here: learnandleverageai.com/workshops — takes about 60 seconds. See you there!';
  }

  if (lower.includes('who') && (lower.includes('brandon') || lower.includes('instructor') || lower.includes('teaching'))) {
    return "Brandon Calloway — he runs 5+ businesses on AI. Built a voice agent that answers phones 24/7, automated multiple companies with AI operations, and runs a photo booth business with AI booking. He's a practitioner, not a professor.";
  }

  if (lower.includes('bring') || lower.includes('laptop') || lower.includes('need')) {
    return 'Just bring a laptop (charged) and a charger. We provide everything else. Oh, and bring a real work task you want to speed up — we use those as practice.';
  }

  if (lower.includes('thank') || lower.includes('awesome') || lower.includes('great') || lower.includes('perfect')) {
    return "You're welcome! Register at learnandleverageai.com/workshops if you haven't yet. See you April 2nd!";
  }

  // Default for anything else
  return "Great question! The best way to get all the details is at learnandleverageai.com/workshops. Or just reply here — happy to help with anything specific.";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get('From') as string;
    const body = (formData.get('Body') as string || '').trim();

    console.log(`SMS received from ${from}: ${body}`);

    // Check if this is a first-time texter by looking up in GHL
    let isFirstMessage = true;
    try {
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&phone=${encodeURIComponent(from)}`,
        {
          headers: {
            'Authorization': `Bearer ${GHL_API_TOKEN}`,
            'Version': '2021-07-28',
          },
        }
      );
      const searchData = await searchRes.json();
      if (searchData.contact?.id) {
        isFirstMessage = false;
      }
    } catch {
      // Default to first message behavior
    }

    // Get AI-powered response
    const replyMessage = await getAIResponse(body, isFirstMessage);

    // Send reply via Twilio
    const twilioAuth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
    await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${twilioAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: from,
          From: TWILIO_PHONE,
          Body: replyMessage,
        }),
      }
    );

    // Create/update contact in GHL (only on first message)
    if (isFirstMessage) {
      try {
        await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_TOKEN}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28',
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            phone: from,
            tags: ['workshop-lead', 'source:sms'],
            source: 'inbound-sms',
          }),
        });
      } catch (e) {
        console.error('GHL contact creation failed:', e);
      }
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
