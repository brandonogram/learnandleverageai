/**
 * Twilio Voice Inbound — AI Opportunity Assessment Intake Agent
 *
 * Separate from /api/voice-inbound (the workshop bot) per codex CRITICAL #3.
 * Same stateless multi-turn pattern — conversation history passed through the
 * Gather action URL as a base64-encoded query parameter, so no in-memory state.
 *
 * Routing (Brandon decides):
 *   Option A: Point a dedicated Twilio number's voice webhook at this route
 *   Option B: Route `/api/voice-inbound` to this handler when the caller has
 *             GHL tag `assessment-purchased`
 *
 * Flow:
 * 1. Twilio POSTs → greeting + <Gather> with empty history
 * 2. User speaks → Twilio transcribes → POSTs back with SpeechResult
 * 3. We decode history, add turn, call Groq, return response + updated history
 * 4. Repeat until caller hangs up or we reach the wrap-up turn
 * 5. Transcript logged for Brandon to generate the manual report
 */

import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const GHL_API_TOKEN = process.env.GHL_LLAI_API_KEY || process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LLAI_LOCATION_ID || process.env.GHL_LOCATION_ID || '';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const AGENTMAIL_API_KEY = process.env.AGENTMAIL_API_KEY || '';

// Max turns before we force a graceful wrap-up — the intake is meant to be ~20 min
const MAX_TURNS = 40;

interface CallerInfo {
  name: string;
  company: string;
  contactId: string | null;
  hasPaidAssessment: boolean;
}

async function lookupCaller(phone: string): Promise<CallerInfo> {
  const empty: CallerInfo = { name: '', company: '', contactId: null, hasPaidAssessment: false };
  if (!GHL_API_TOKEN || !GHL_LOCATION_ID || !phone) return empty;
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&number=${encodeURIComponent(phone)}`,
      { headers: { Authorization: `Bearer ${GHL_API_TOKEN}`, Version: '2021-07-28' } },
    );
    if (!res.ok) return empty;
    const data = await res.json();
    const contact = data.contact;
    if (!contact?.id) return empty;
    const tags: string[] = contact.tags || [];
    return {
      name: contact.contactName || contact.firstName || '',
      company: contact.companyName || '',
      contactId: contact.id,
      hasPaidAssessment: tags.includes('assessment-purchased') || tags.includes('assessment-paid'),
    };
  } catch {
    return empty;
  }
}

function buildSystemPrompt(caller: CallerInfo): string {
  const nameCue = caller.name ? `The caller's name on file is ${caller.name}.` : 'The caller has not introduced themselves yet.';
  const companyCue = caller.company ? `They are with ${caller.company}.` : '';
  const paidCue = caller.hasPaidAssessment
    ? 'They have paid the $997 assessment fee. Be a great interviewer and give them a premium experience.'
    : 'They have not yet paid. Be helpful, take the interview seriously, and at wrap-up let them know Brandon will follow up.';

  return `You are Emma, an AI Opportunity Assessment interviewer for Learn and Leverage AI. You are conducting a 20-minute phone interview with a business owner to gather the information Brandon needs to build their custom AI report.

## Your Identity
- You are Emma, an AI assistant working for Brandon Calloway (not Brandon himself)
- Warm, professional, a little dry — you're a smart interviewer, not a sales rep
- Short, conversational sentences — NO jargon, NO AI-hype language
- ${nameCue} ${companyCue}
- ${paidCue}
- Contact email for follow-up: info@learnandleverageai.com

## Your Mission
Gather enough detail in ~20 minutes that Brandon can produce:
(a) an Effort vs Impact matrix of AI opportunities for their business
(b) 3–5 specific tool recommendations with install steps
(c) a 4-day Quick-Win Plan
(d) a dollar-per-month financial impact estimate

## Interview Structure (stay flexible, don't read from a script)

### Opening (1 min)
- Greet them by name if you have it. "Hi ${caller.name || 'there'}, this is Emma from Learn and Leverage AI. Brandon asked me to hop on a quick call to learn about your business so we can build out your assessment. You have about 20 minutes — sound good?"
- Confirm their name and role if not already on file.
- "In one sentence — what does your business do?"

### Business Context (3 min)
- Revenue range: under $1M / $1-5M / $5-15M / $15-50M / $50M+
- Employee count
- "Do you have a CTO or tech lead — or does all that land on you?"
- "What's the last piece of software your team adopted, and how did that go?"

### Pain Discovery (10 min — the bulk of the call)
- "Walk me through the most annoying part of your week."
- "If you could hire one more person tomorrow, what would they actually do?"
- "What tasks does your team do that feel like they shouldn't need a human?"
- "How do leads come in — and how fast do you follow up?"
- "How does client onboarding work — what happens in the first 7 days after someone says yes?"
- "What reports or spreadsheets do you put together by hand every week?"
- "What's the thing your team complains about most?"
- Probe each answer with "tell me more about that" or "how much time does that take?"

### Tech Stack (3 min)
- "Walk me through your daily tech stack — CRM, email, phone, accounting, anything else you touch every day."
- "Are you using any AI tools today — ChatGPT, Gemini, Claude, anything?"
- "Tell me about the last time you saw AI do something impressive for someone."

### Close (2 min)
- "Anything else I should know before Brandon puts your report together?"
- If they paid: "Perfect. Brandon will have your report in the next 48 business hours and will reach out to schedule a 30-minute walkthrough call."
- If they haven't paid: "Great conversation. Brandon will follow up with next steps within one business day."

## Rules
1. Keep each turn short: 1-3 sentences. You're listening, not lecturing.
2. NEVER promise what the report will specifically recommend — that's Brandon's job.
3. NEVER offer refunds, discounts, or pricing changes — escalate to Brandon.
4. If they ask a technical question about AI, acknowledge it and promise Brandon will address it in the report.
5. If they want Brandon directly, capture their preferred contact method and end the call professionally.
6. If they seem stressed, frustrated, or the call is going sideways — end gracefully. "I have enough to get started. Thanks for your time."
7. If the conversation has gone more than ~15 minutes, start moving toward close — don't over-extract.
`;
}

// Keep the system prompt OUT of the URL — we rebuild it server-side on each turn.
// Use base64url (URL-safe alphabet) so `+` / `/` don't get corrupted as `URLSearchParams` decodes `+` → space.
function encodeHistory(messages: ChatMessage[]): string {
  const conversationOnly = messages.filter((m) => m.role !== 'system');
  return Buffer.from(JSON.stringify(conversationOnly)).toString('base64url');
}

function decodeHistory(encoded: string | null): ChatMessage[] {
  if (!encoded) return [];
  try {
    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
  } catch {
    return [];
  }
}

// Twilio rejects <Gather action="..."> URLs much longer than ~4KB. If the
// encoded conversation nears the limit, trim older turns and keep the last 6.
// We return a relative URL — Twilio resolves it against the public request
// Host, which is what we want when Next runs behind Traefik inside a
// container (req.url reports the internal 0.0.0.0:3000).
function buildNextUrl(history: ChatMessage[]): string {
  let encoded = encodeHistory(history);
  if (encoded.length > 2500) {
    const trimmed = history.filter((m) => m.role !== 'system').slice(-6);
    encoded = Buffer.from(JSON.stringify(trimmed)).toString('base64url');
  }
  return `/api/voice-assessment?h=${encoded}`;
}

async function callGroq(messages: ChatMessage[]): Promise<string> {
  if (!GROQ_API_KEY) {
    return "I'm having a little trouble hearing you — can you say that again?";
  }
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 200,
      }),
    });
    if (!res.ok) return 'Got it. Tell me more about that.';
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || 'Got it. Tell me more about that.';
  } catch {
    return 'Got it. Tell me more about that.';
  }
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildTwiml(say: string, gatherActionUrl: string | null): string {
  const safeSay = xmlEscape(say);
  if (gatherActionUrl) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" action="${xmlEscape(gatherActionUrl)}" method="POST" speechTimeout="auto" language="en-US">
    <Say voice="Polly.Joanna-Neural">${safeSay}</Say>
  </Gather>
  <Say voice="Polly.Joanna-Neural">I didn't catch that. Feel free to call back when you have a quiet moment. Bye for now.</Say>
  <Hangup/>
</Response>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna-Neural">${safeSay}</Say>
  <Hangup/>
</Response>`;
}

async function logTranscript(from: string, caller: CallerInfo, history: ChatMessage[]): Promise<void> {
  if (!AGENTMAIL_API_KEY) return;
  try {
    const transcript = history
      .filter((m) => m.role !== 'system')
      .map((m) => `${m.role === 'user' ? 'CALLER' : 'EMMA'}: ${m.content}`)
      .join('\n\n');
    const subject = `Assessment intake — ${caller.name || from} ${caller.company ? `(${caller.company})` : ''}`;
    await fetch('https://api.agentmail.to/v0/inboxes/brandon@learnandleverageai.com/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AGENTMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: ['brandon@learnandleverageai.com'],
        subject,
        text: `Caller: ${from}\nGHL contact: ${caller.contactId || 'unknown'}\nPaid: ${caller.hasPaidAssessment}\n\n---\n\n${transcript}`,
      }),
    });
  } catch {
    // Fire-and-forget; don't break the call flow on a logging failure.
  }
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const from = String(form.get('From') || '');
  const speechResult = String(form.get('SpeechResult') || '');

  const url = new URL(req.url);
  const encodedHistory = url.searchParams.get('h');

  const caller = await lookupCaller(from);
  const history = decodeHistory(encodedHistory);

  // System prompt is rebuilt server-side every turn (not carried in the URL) so the
  // Gather action URL stays well under Twilio's ~4KB limit.
  const systemPrompt = buildSystemPrompt(caller);

  if (history.length === 0) {
    // First turn — greeting only, no user speech yet.
    const greeting = caller.name
      ? `Hi ${caller.name}, this is Emma from Learn and Leverage AI. Brandon asked me to hop on a quick call to build out your AI opportunity assessment. You have about 20 minutes — sound good?`
      : `Hi, this is Emma from Learn and Leverage AI. Brandon asked me to hop on a quick call to build out your AI opportunity assessment. You have about 20 minutes — sound good? First — what's your name and role?`;
    const newHistory: ChatMessage[] = [{ role: 'assistant', content: greeting }];
    const nextUrl = buildNextUrl(newHistory);
    return new NextResponse(buildTwiml(greeting, nextUrl), {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // Subsequent turn — user has spoken.
  if (!speechResult) {
    const lastAssistant = [...history].reverse().find((m) => m.role === 'assistant')?.content || "I didn't catch that — can you say it again?";
    const nextUrl = buildNextUrl(history);
    return new NextResponse(buildTwiml(lastAssistant, nextUrl), {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  const updatedHistory: ChatMessage[] = [...history, { role: 'user', content: speechResult }];

  // Force wrap-up if we've gone too long
  const turnCount = updatedHistory.length;
  if (turnCount >= MAX_TURNS) {
    const closing = 'Perfect. I have everything Brandon needs. Expect your report within 48 business hours, and Brandon will reach out to book your walkthrough call. Thanks for your time today.';
    updatedHistory.push({ role: 'assistant', content: closing });
    await logTranscript(from, caller, updatedHistory);
    return new NextResponse(buildTwiml(closing, null), {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // Prepend the freshly-built system prompt before calling the LLM.
  const response = await callGroq([{ role: 'system', content: systemPrompt }, ...updatedHistory]);
  updatedHistory.push({ role: 'assistant', content: response });

  // Log every turn so Brandon has a live transcript even if the caller hangs up abruptly
  await logTranscript(from, caller, updatedHistory);

  const nextUrl = buildNextUrl(updatedHistory);
  return new NextResponse(buildTwiml(response, nextUrl), {
    headers: { 'Content-Type': 'text/xml' },
  });
}

export async function GET() {
  return NextResponse.json({
    route: '/api/voice-assessment',
    purpose: 'AI Opportunity Assessment intake agent (separate from /api/voice-inbound workshop bot)',
    configure: 'Point a Twilio Voice webhook at POST https://learnandleverageai.com/api/voice-assessment',
  });
}
