import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, businessType } = body;

    const origin = request.headers.get('origin') || 'https://learnandleverageai.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: {
        customerName: name,
        phone: phone || '',
        businessName: businessName || '',
        businessType: businessType || '',
        source: 'webinar-starter-pack',
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI Starter Pack — Webinar Special',
              description:
                'AI Phone Receptionist Setup + 30 Days ContentCreationDude Pro + 1-on-1 Strategy Call + AI Playbook PDF',
            },
            unit_amount: 49700, // $497.00
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
