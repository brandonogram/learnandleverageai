import { NextRequest, NextResponse } from 'next/server';
import { Webhook, WebhookVerificationError } from 'svix';

export const dynamic = 'force-dynamic';

const BRAND_INBOX = 'brandon@learnandleverageai.com';

type AgentMailEvent = {
  event_type?: string;
  type?: string;
  inbox_id?: string;
  data?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  message?: Record<string, unknown>;
};

function strings(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  return value ? [String(value)] : [];
}

function containsAddress(values: string[], address: string): boolean {
  return values.some((value) => value.toLowerCase().includes(address.toLowerCase()));
}

export async function POST(request: NextRequest) {
  const secret = process.env.AGENTMAIL_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Email] AGENTMAIL_WEBHOOK_SECRET is not configured; rejecting webhook');
    return NextResponse.json({ error: 'Webhook verification unavailable' }, { status: 503 });
  }

  const rawBody = await request.text();
  let event: AgentMailEvent;

  try {
    event = new Webhook(secret).verify(rawBody, {
      'svix-id': request.headers.get('svix-id') || '',
      'svix-timestamp': request.headers.get('svix-timestamp') || '',
      'svix-signature': request.headers.get('svix-signature') || '',
    }) as AgentMailEvent;
  } catch (error) {
    if (!(error instanceof WebhookVerificationError)) console.error('[Email] Webhook verification error');
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const eventType = event.event_type || event.type;
  if (eventType !== 'message.received') {
    return NextResponse.json({ status: 'ignored', reason: 'unsupported event type' }, { status: 202 });
  }

  const message = event.data || event.payload || event.message || {};
  const inboxId = String(message.inbox_id || event.inbox_id || '');
  const recipients = [
    ...strings(message.to),
    ...strings(message.cc),
    ...strings(message.bcc),
  ];
  if (inboxId !== BRAND_INBOX && !containsAddress(recipients, BRAND_INBOX)) {
    return NextResponse.json({ status: 'ignored', reason: 'different inbox' }, { status: 202 });
  }

  const sender = String(message.from || '');
  if (sender.toLowerCase().includes('@learnandleverageai.com')) {
    return NextResponse.json({ status: 'ignored', reason: 'own message' }, { status: 202 });
  }

  const messageId = String(message.message_id || '');
  const threadId = String(message.thread_id || '');
  console.log(`[Email] Verified inbound queued for human review message=${messageId || 'unknown'} thread=${threadId || 'unknown'}`);

  return NextResponse.json({
    status: 'queued_for_review',
    messageId: messageId || null,
    threadId: threadId || null,
    autoReply: false,
    outboundPerformed: false,
  });
}

export async function GET() {
  return NextResponse.json({
    route: '/api/email-inbound',
    mode: 'verified-review-only',
    webhookVerification: 'svix',
    autoReply: false,
    outboundPerformed: false,
  });
}
