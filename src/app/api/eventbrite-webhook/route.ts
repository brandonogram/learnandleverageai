import { NextRequest, NextResponse } from 'next/server';

const EVENTBRITE_PRIVATE_TOKEN = process.env.EVENTBRITE_PRIVATE_TOKEN || 'EX5L5MOFFJRZYN5ZWPB3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body?.config?.action;
    const apiUrl = body?.api_url;

    console.log('Eventbrite webhook:', action, apiUrl);

    // Only process order.placed (new registration)
    if (action !== 'order.placed' || !apiUrl) {
      return NextResponse.json({ status: 'ignored', action });
    }

    // Fetch the order details from Eventbrite API
    const orderRes = await fetch(`${apiUrl}?expand=attendees`, {
      headers: { Authorization: `Bearer ${EVENTBRITE_PRIVATE_TOKEN}` },
    });

    if (!orderRes.ok) {
      console.error('Eventbrite API error:', orderRes.status);
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }

    const order = await orderRes.json();
    const attendees = order.attendees || [];

    const results = [];
    for (const attendee of attendees) {
      const profile = attendee.profile || {};
      const name = profile.name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      const email = profile.email || '';

      if (!name || !email) continue;

      // Forward to our existing registration endpoint
      const regRes = await fetch(new URL('/api/workshop-register', request.url).toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          email: email,
          phone: '',
          source: 'eventbrite',
          registered_at: new Date().toISOString(),
        }),
      });

      const regResult = await regRes.json();
      results.push({ name, email, ghl: regResult });
    }

    return NextResponse.json({ status: 'processed', attendees: results.length, results });
  } catch (error) {
    console.error('Eventbrite webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Eventbrite verifies webhook endpoint with GET
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
