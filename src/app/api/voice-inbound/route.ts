/**
 * Twilio Voice Inbound Webhook — LearnAndLeverageAI AI Voice Agent
 *
 * Fully stateless multi-turn voice agent for serverless (Vercel).
 * Conversation history is passed through the Gather action URL as a
 * base64-encoded query parameter, so no in-memory state is needed.
 *
 * Flow:
 * 1. Twilio calls POST → greeting + <Gather> with action URL containing empty history
 * 2. User speaks → Twilio transcribes → POSTs to action URL with SpeechResult
 * 3. We decode history, add user message, call OpenAI, return response + updated history
 * 4. Repeat until caller hangs up
 */

import { NextRequest, NextResponse } from 'next/server';

// ---- Types ----

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// ---- GHL Contact Lookup ----

const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';

interface CallerInfo {
  state: 'unknown' | 'lead' | 'registered' | 'confirmed' | 'attended' | 'no-show' | 'purchased';
  name: string;
  contactId: string | null;
}

async function lookupCaller(phone: string): Promise<CallerInfo> {
  const empty: CallerInfo = { state: 'unknown', name: '', contactId: null };
  if (!GHL_API_TOKEN || !GHL_LOCATION_ID || !phone) return empty;
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
    let state: CallerInfo['state'] = 'lead';
    if (tags.includes('workshop-purchased')) state = 'purchased';
    else if (tags.includes('workshop-attended')) state = 'attended';
    else if (tags.includes('workshop-no-show')) state = 'no-show';
    else if (tags.includes('workshop-confirmed')) state = 'confirmed';
    else if (tags.includes('workshop-lead')) state = 'registered';
    return { state, name, contactId: contact.id };
  } catch {
    return empty;
  }
}

// ---- System prompt (state-aware) ----

function buildVoiceSystemPrompt(caller: CallerInfo): string {
  const stateInstructions: Record<CallerInfo['state'], string> = {
    unknown: `CALLER STATE: Unknown caller — first time calling.
- Welcome them warmly
- Tell them about the free workshop
- Guide them toward registering (online at learnandleverageai.com/workshops, or collect info over the phone)`,
    lead: `CALLER STATE: This person has contacted us before but is NOT registered.
- Their name: ${caller.name || 'unknown'}
- Answer their questions
- Encourage registration`,
    registered: `CALLER STATE: This person is ALREADY REGISTERED for the workshop.
- Their name: ${caller.name || 'a registered attendee'}
- Greet them by name if possible
- Do NOT pitch the workshop or ask them to register — they already did
- Help them with whatever they're calling about (logistics, questions, etc.)`,
    confirmed: `CALLER STATE: This person is REGISTERED and CONFIRMED for the workshop.
- Their name: ${caller.name || 'a confirmed attendee'}
- Do NOT pitch the workshop or registration
- They are committed — answer questions enthusiastically`,
    attended: `CALLER STATE: This person ATTENDED a previous workshop.
- Their name: ${caller.name || 'a past attendee'}
- Thank them for attending if it comes up
- Do NOT pitch the free workshop — they already came
- If relevant, mention paid offerings (AI Starter Pack $497, Advanced $997, Corporate Training, Consulting)`,
    'no-show': `CALLER STATE: This person registered but DID NOT ATTEND.
- Their name: ${caller.name || 'someone who missed the workshop'}
- Be kind — don't guilt them
- Let them know another session is being planned
- Offer to keep them on the list`,
    purchased: `CALLER STATE: This person is a PAYING CUSTOMER.
- Their name: ${caller.name || 'a valued customer'}
- VIP treatment
- If they need Brandon directly, offer to have him call them back`,
  };

  return `You are Brandon's AI Assistant answering the phone for Learn and Leverage AI. You handle inbound calls about AI workshops and training services in the Wilmington, Delaware area.

## Your Identity
- You are Brandon's AI assistant (NOT Brandon himself)
- Warm, friendly, helpful, conversational — short sentences, no jargon
- Sound like a knowledgeable friend, not a corporate robot
- NEVER give out Brandon's personal phone or email
- Contact email: info@learnandleverageai.com
- This phone number: (302) 416-6285

${stateInstructions[caller.state]}

## Workshop Details
- Free AI Hands-On Workshop — "See What AI Can Actually Do For Your Job"
- Thursday, April 2, 2026, 6:00 PM to 8:00 PM
- Hilton Christiana, 100 Continental Dr, Newark, DE 19713
- Completely FREE. Limited to 25 people.
- Hands-on, in-person. Bring a laptop. Leave with AI tools set up and working.
- No tech experience needed. No guest speakers — just Brandon teaching.
- We provide: printed workbook, coffee, snacks, Wi-Fi, power outlets. Complimentary water from the venue.

## What They Learn (2 hours)
1. What AI actually is — demystified, live demos
2. How to talk to AI tools so they give useful results for YOUR job
3. AI agents and automation — live demos of real tools handling real work
4. Build your toolkit — set up AI tools on your laptop before you leave

## About Brandon
Brandon Calloway runs 5+ businesses on AI — Call2Calendar (voice agent), Tri-State Aquatic Solutions (automated operations), 302 Photo Booth (AI booking). Practitioner, not professor.

## Paid Offerings (mention only if asked or if caller already attended free workshop)
1. AI Starter Pack ($497) — replay, prompts, 1-on-1 call, 30 days support
2. Advanced Workshop ($997) — 2-day intensive, 10 people max
3. Corporate Training ($5K-$10K/day) — on-site, custom curriculum
4. AI Consulting ($4,997+) — done-for-you implementation

## Registration
- Online: learnandleverageai.com/workshops (15 seconds)
- Or collect over the phone: name, email, phone

## Rules
1. Keep responses SHORT — 2-3 sentences max per turn
2. Be warm and conversational
3. NEVER give out Brandon's personal phone or email
4. If they ask about corporate deals over $10K → have Brandon reach out
5. If they want a human → "I'll have Brandon reach out. What's the best way to contact you?"
6. Be honest about what you don't know`;
}

// ---- Helpers ----

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function encodeHistory(messages: ChatMessage[]): string {
  // Only encode user/assistant messages (not system prompt) to keep URL small
  const conversationOnly = messages.filter(m => m.role !== 'system');
  return Buffer.from(JSON.stringify(conversationOnly)).toString('base64url');
}

function decodeHistory(encoded: string): ChatMessage[] {
  try {
    const decoded = Buffer.from(encoded, 'base64url').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return [];
  }
}

function buildActionUrl(history: ChatMessage[], callerPhone: string): string {
  const encoded = encodeHistory(history);
  // Keep URL under Twilio's ~4KB limit for action URLs
  // If history gets too long, trim older messages
  if (encoded.length > 2500) {
    // Keep only last 6 messages (3 turns)
    const trimmed = history.filter(m => m.role !== 'system').slice(-6);
    const trimmedEncoded = Buffer.from(JSON.stringify(trimmed)).toString('base64url');
    return `/api/voice-inbound?h=${trimmedEncoded}&p=${encodeURIComponent(callerPhone)}`;
  }
  return `/api/voice-inbound?h=${encoded}&p=${encodeURIComponent(callerPhone)}`;
}

function twimlGather(sayText: string, actionUrl: string): string {
  const voice = 'Polly.Joanna-Neural';
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" timeout="5" speechTimeout="auto" action="${escapeXml(actionUrl)}" method="POST">
    <Say voice="${voice}">${escapeXml(sayText)}</Say>
  </Gather>
  <Gather input="speech" timeout="10" speechTimeout="auto" action="${escapeXml(actionUrl)}" method="POST">
    <Say voice="${voice}">Are you still there? Feel free to ask me anything about our AI workshop, or I can help you register.</Say>
  </Gather>
  <Say voice="${voice}">It sounds like you may have stepped away. Feel free to call back anytime, or visit learn and leverage AI dot com to register. Goodbye!</Say>
</Response>`;
}

function twimlFinal(sayText: string): string {
  const voice = 'Polly.Joanna-Neural';
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${voice}">${escapeXml(sayText)}</Say>
  <Pause length="1"/>
  <Say voice="${voice}">Thank you for calling Learn and Leverage AI. Have a great day!</Say>
</Response>`;
}

// ---- LLM (Groq primary, XAI/Grok fallback) ----

interface LLMProvider {
  url: string;
  keyEnvVar: string;
  model: string;
  name: string;
}

const LLM_PROVIDERS: LLMProvider[] = [
  {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    keyEnvVar: 'GROQ_API_KEY',
    model: 'llama-3.3-70b-versatile',
    name: 'Groq',
  },
  {
    url: 'https://api.x.ai/v1/chat/completions',
    keyEnvVar: 'XAI_API_KEY',
    model: 'grok-3-mini-fast',
    name: 'XAI',
  },
];

async function getAIResponse(messages: ChatMessage[]): Promise<string> {
  const fallbackMsg = "I'm having a brief technical issue. You can register at learnandleverageai.com slash workshops, or call back in a moment.";

  for (const provider of LLM_PROVIDERS) {
    const apiKey = process.env[provider.keyEnvVar];
    if (!apiKey) {
      console.warn(`[Voice] ${provider.name}: ${provider.keyEnvVar} not set, skipping`);
      continue;
    }

    try {
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Voice] ${provider.name} error:`, response.status, errText);
        continue; // Try next provider
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        console.log(`[Voice] ${provider.name} responded (${data.usage?.total_tokens || '?'} tokens)`);
        return content;
      }
    } catch (error) {
      console.error(`[Voice] ${provider.name} call failed:`, error);
      continue; // Try next provider
    }
  }

  console.error('[Voice] All LLM providers failed');
  return fallbackMsg;
}

// ---- GHL Contact Creation ----

async function createGHLContact(callerPhone: string, name?: string, email?: string) {
  const ghlApiKey = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY;
  const ghlLocationId = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID;

  if (!ghlApiKey || !ghlLocationId) {
    console.warn('[Voice] GHL credentials not set — skipping contact creation');
    return;
  }

  const nameParts = (name || 'Phone').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Phone';
  const lastName = nameParts.slice(1).join(' ') || 'Caller';

  try {
    const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
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
        email: email || undefined,
        phone: callerPhone || undefined,
        tags: ['workshop-lead', 'phone-inquiry', 'voice-agent'],
        source: 'Voice Agent - Inbound Call',
      }),
    });

    if (!res.ok) {
      console.error('[Voice] GHL error:', res.status, await res.text());
    } else {
      console.log('[Voice] GHL contact created:', firstName, lastName, callerPhone);
    }
  } catch (error) {
    console.error('[Voice] GHL contact creation failed:', error);
  }
}

// ---- Main POST handler ----

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const speechResult = formData.get('SpeechResult') as string | null;
    const callerPhone = formData.get('From') as string || '';
    const callSid = formData.get('CallSid') as string || '';

    // Get history from query params (stateless approach)
    const url = new URL(request.url);
    const encodedHistory = url.searchParams.get('h') || '';
    const phoneFromParam = url.searchParams.get('p') || callerPhone;

    console.log(`[Voice] CallSid=${callSid} Phone=${phoneFromParam} Speech="${speechResult}" HistoryLen=${encodedHistory.length}`);

    // FIRST CALL — no history, no speech → look up caller and greet
    if (!encodedHistory && !speechResult) {
      const caller = await lookupCaller(phoneFromParam);
      console.log(`[Voice] Caller lookup: state=${caller.state} name="${caller.name}" id=${caller.contactId}`);

      let greeting: string;
      if (caller.state === 'registered' || caller.state === 'confirmed') {
        const firstName = caller.name ? caller.name.split(' ')[0] : '';
        greeting = firstName
          ? `Hi ${firstName}! Thanks for calling Learn and Leverage AI. I see you're registered for our upcoming workshop. How can I help you?`
          : `Hi! Thanks for calling Learn and Leverage AI. I see you're registered for our upcoming workshop. How can I help you?`;
      } else if (caller.state === 'attended') {
        const firstName = caller.name ? caller.name.split(' ')[0] : '';
        greeting = firstName
          ? `Hi ${firstName}! Great to hear from you again. Thanks for calling Learn and Leverage AI. How can I help?`
          : `Hi! Great to hear from you again. Thanks for calling Learn and Leverage AI. How can I help?`;
      } else if (caller.state === 'purchased') {
        const firstName = caller.name ? caller.name.split(' ')[0] : '';
        greeting = `Hi ${firstName || 'there'}! Thanks for calling Learn and Leverage AI. Great to hear from you. How can I help?`;
      } else {
        greeting = "Hi, thanks for calling Learn and Leverage AI! How can I help you today?";
      }

      const history: ChatMessage[] = [
        { role: 'assistant', content: greeting },
      ];
      const actionUrl = buildActionUrl(history, phoneFromParam);

      // Create GHL contact for unknown callers only
      if (caller.state === 'unknown') {
        createGHLContact(phoneFromParam).catch(e => console.error('[Voice] Background GHL error:', e));
      }

      return new NextResponse(twimlGather(greeting, actionUrl), {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // SUBSEQUENT TURNS — decode history, process speech
    const history = decodeHistory(encodedHistory);

    if (!speechResult) {
      // No speech detected — reprompt
      const reprompt = "I'm still here! You can ask about our free AI workshop, or I can help you register. What would you like to know?";
      history.push({ role: 'assistant', content: reprompt });
      const actionUrl = buildActionUrl(history, phoneFromParam);
      return new NextResponse(twimlGather(reprompt, actionUrl), {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // Add user message to history
    history.push({ role: 'user', content: speechResult });

    // Check for goodbye intent
    const lower = speechResult.toLowerCase();
    if (/\b(goodbye|bye|hang up|that'?s all|that'?s it|no thanks|nothing else)\b/.test(lower)) {
      return new NextResponse(
        twimlFinal("It was great talking with you! Remember, you can register at learnandleverageai.com slash workshops anytime. Have a wonderful day!"),
        { headers: { 'Content-Type': 'text/xml' } },
      );
    }

    // Look up caller for state-aware system prompt
    const caller = await lookupCaller(phoneFromParam);

    // Build full message array with state-aware system prompt + history
    const messages: ChatMessage[] = [
      { role: 'system', content: buildVoiceSystemPrompt(caller) },
      ...history,
    ];

    // Get AI response
    const aiResponse = await getAIResponse(messages);
    history.push({ role: 'assistant', content: aiResponse });

    const actionUrl = buildActionUrl(history, phoneFromParam);

    return new NextResponse(twimlGather(aiResponse, actionUrl), {
      headers: { 'Content-Type': 'text/xml' },
    });

  } catch (error) {
    console.error('[Voice] Handler error:', error);
    return new NextResponse(
      twimlFinal("I'm sorry, I'm having a technical issue. Please visit learnandleverageai.com or call back in a few minutes."),
      { headers: { 'Content-Type': 'text/xml' } },
    );
  }
}

// Handle GET — Twilio may hit this for webhook validation
export async function GET() {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna-Neural">Hi, thanks for calling Learn and Leverage AI! How can I help you today?</Say>
  <Gather input="speech" timeout="5" speechTimeout="auto" action="/api/voice-inbound" method="POST">
    <Pause length="1"/>
  </Gather>
  <Say voice="Polly.Joanna-Neural">Thank you for calling. Visit learnandleverageai.com for more information. Goodbye!</Say>
</Response>`,
    { headers: { 'Content-Type': 'text/xml' } },
  );
}
