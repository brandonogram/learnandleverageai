import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata || {};

    // Push to GoHighLevel CRM
    try {
      const ghlRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GHL_API_KEY}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
          body: JSON.stringify({
            locationId: process.env.GHL_LOCATION_ID,
            name: meta.customerName || '',
            email: session.customer_email || '',
            phone: meta.phone || '',
            companyName: meta.businessName || '',
            tags: ['ai-starter-pack', 'paid-customer', 'webinar-buyer'],
            source: 'Webinar AI Starter Pack',
          }),
        }
      );

      if (!ghlRes.ok) {
        console.error('GHL contact creation failed:', await ghlRes.text());
      }
    } catch (err) {
      console.error('GHL push error:', err);
    }

    console.log(
      `Payment received: $${(session.amount_total || 0) / 100} from ${session.customer_email}`
    );
  }

  return NextResponse.json({ received: true });
}
