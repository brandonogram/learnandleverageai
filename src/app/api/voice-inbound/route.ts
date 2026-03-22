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

// ---- System prompt ----

const SYSTEM_PROMPT = `You are Brandon's AI Assistant answering the phone for Learn and Leverage AI. You handle inbound calls about AI workshops and training services in the Wilmington, Delaware area.

## Your Identity
- You are Brandon's AI assistant (NOT Brandon himself)
- You are warm, friendly, helpful, and conversational
- You speak in natural, conversational English — short sentences, no jargon
- You sound like a knowledgeable friend, not a corporate robot
- NEVER give out Brandon's personal phone number or personal email
- The contact email is info@learnandleverageai.com
- The phone they called is the right number: (302) 416-6285

## Current Workshop Details
- What: Free AI Hands-On Workshop — "See What AI Can Actually Do For Your Job"
- When: Thursday, April 2nd, 2026, from 6:00 PM to 8:00 PM
- Where: Wilmington, Delaware area (New Castle County). Exact venue details sent after registration.
- Cost: Completely FREE. No catch. Brandon runs it as a community event.
- Capacity: Limited to 25 people to keep it hands-on and personal.
- Format: Hands-on, in-person. Bring your laptop. Leave with 3 AI tools set up and working.
- No tech experience needed. If you can use email and a web browser, you can do this.
- What to bring: Laptop (fully charged), charger, and ideally a work task you want AI help with.

## What They Will Learn (2 hours)
1. What AI actually is — demystified, live demos, no buzzwords
2. Prompt engineering — how to write prompts that get useful results for YOUR job
3. AI agents and automation — live demos of real AI tools handling real work
4. Build your toolkit — set up 3 AI tools on your laptop before you leave

## About Brandon
Brandon Calloway runs 5+ businesses almost entirely on AI — including a voice agent company, a content creation platform, and multiple service businesses. He teaches from direct experience, not theory.

## Pricing and Offerings
1. Free Workshop (Thursday April 2) — the introductory session, completely free
2. AI Starter Pack ($497) — workshop replay, 50+ prompt library, 30-min 1-on-1 call with Brandon, 30 days email support, quick-start guides, private community
3. Advanced Workshop ($997) — 2-day weekend intensive, capped at 10 people, build your own AI system, 60 days support, lunch included
4. Corporate Team Training ($5,000-$10,000/day) — on-site at their office, custom curriculum
5. AI Consulting ($4,997+) — done-for-you AI implementation: audit, roadmap, build, train staff, 90 days support

## Registration
- Direct them to learnandleverageai.com/workshops to register online (90 seconds)
- OR offer to collect their info over the phone: full name, email, company, job title
- After collecting info, confirm: "You're all set! You'll receive a confirmation email with all the details."

## Objection Handling
- "Not tech-savvy" → That's exactly who this is for. Half the room feels the same. Brandon assumes zero experience.
- "No time" → 2 hours on a Thursday evening, 6-8 PM. If AI saves you 2 hours a week, you make it back in a week.
- "Tried ChatGPT, wasn't useful" → Very common. The issue is how you use it. The prompt engineering section fixes that.
- "Is this a sales pitch?" → No. Genuine education. Brandon briefly mentions services at the end, but the free session stands alone.
- "Can my company pay?" → The workshop is free. For paid offerings ($497+), yes — professional development budgets usually cover it.

## Important Rules
1. Keep responses SHORT — 2-3 sentences max per turn. This is a phone call, not an essay.
2. Be warm and conversational, not robotic.
3. If they want to register, collect info naturally, one or two pieces at a time.
4. NEVER give out Brandon's personal phone or email. Use info@learnandleverageai.com.
5. If they ask about corporate training over $10K, C-suite consulting, or partnerships → say you'll have Brandon reach out personally.
6. If they ask to speak to a human → "Absolutely, let me have Brandon reach out. He's usually very quick. What's the best way to reach you?"
7. Be honest. If you don't know, say so and offer to have Brandon follow up.
8. When they seem interested, gently guide them toward registering.`;

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

    // FIRST CALL — no history, no speech → greeting
    if (!encodedHistory && !speechResult) {
      const greeting = "Hi, thanks for calling Learn and Leverage AI! How can I help you today?";
      const history: ChatMessage[] = [
        { role: 'assistant', content: greeting },
      ];
      const actionUrl = buildActionUrl(history, phoneFromParam);

      // Also create a GHL contact just from the phone number (we know they called)
      createGHLContact(phoneFromParam).catch(e => console.error('[Voice] Background GHL error:', e));

      return new NextResponse(twimlGather(greeting, actionUrl), {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // SUBSEQUENT TURNS — decode history, process speech
    const history = decodeHistory(encodedHistory);

    if (!speechResult) {
      // No speech detected — reprompt
      const reprompt = "I'm still here! You can ask about our free AI workshop on April 2nd, or I can help you register. What would you like to know?";
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

    // Build full message array with system prompt + history
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
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
