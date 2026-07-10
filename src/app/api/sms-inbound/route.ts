import { NextResponse } from 'next/server';
import { validateTwilioFormRequest } from '@/lib/twilio-webhook';

export const dynamic = 'force-dynamic';

const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const validation = validateTwilioFormRequest(request, rawBody);
  if (!validation.valid) {
    return new NextResponse(validation.status === 503 ? 'Twilio verification is not configured' : 'Invalid Twilio signature', {
      status: validation.status,
    });
  }
  const messageSid = String(validation.params.MessageSid || 'unknown');
  console.log(`[SMS] Inbound queued for provider-console review message=${messageSid}; no automatic response or CRM mutation`);

  return new NextResponse(EMPTY_TWIML, {
    headers: {
      'Content-Type': 'text/xml',
      'X-LLAI-Mode': 'review-only',
    },
  });
}

export async function GET() {
  return NextResponse.json({
    route: '/api/sms-inbound',
    mode: 'review-only',
    autoReply: false,
    crmMutation: false,
  });
}
