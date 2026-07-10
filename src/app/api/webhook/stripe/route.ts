import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  ASSESSMENT_GHL_TAGS,
  assessmentCheckoutFieldText,
  isPaidAssessmentCheckoutSession,
} from '@/lib/assessment-contract';

export const dynamic = 'force-dynamic';

const ASSESSMENT_SOURCE = 'Learn & Leverage AI $997 Assessment';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key, { apiVersion: '2026-01-28.clover' });
}

function ghlConfig() {
  const token = process.env.GHL_LLAI_API_KEY;
  const locationId = process.env.GHL_LLAI_LOCATION_ID;
  if (!token || !locationId) throw new Error('LLAI GHL credentials are not configured');
  return { token, locationId };
}

async function existingTags(email: string, token: string, locationId: string): Promise<string[]> {
  const url = new URL('https://services.leadconnectorhq.com/contacts/search/duplicate');
  url.searchParams.set('locationId', locationId);
  url.searchParams.set('email', email);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Version: '2021-07-28' },
  });
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`GHL duplicate lookup returned HTTP ${response.status}`);
  const data = await response.json();
  return Array.isArray(data.contact?.tags) ? data.contact.tags : [];
}

async function upsertAssessmentCustomer(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) throw new Error('paid assessment session has no customer email');
  const phone = session.customer_details?.phone
    || assessmentCheckoutFieldText(session.custom_fields, 'phone');
  if (!phone) throw new Error('paid assessment session has no customer phone');
  const companyName = assessmentCheckoutFieldText(session.custom_fields, 'company_name')
    || session.metadata?.businessName;
  const { token, locationId } = ghlConfig();
  const tags = [...new Set([...await existingTags(email, token, locationId), ...ASSESSMENT_GHL_TAGS])];
  const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId,
      name: session.customer_details?.name || undefined,
      email,
      phone,
      companyName: companyName || undefined,
      tags,
      source: ASSESSMENT_SOURCE,
      createNewIfDuplicateAllowed: false,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || typeof data.contact?.id !== 'string') {
    throw new Error(`GHL assessment-customer upsert returned HTTP ${response.status}`);
  }
  return { contactId: data.contact.id, created: data.new === true };
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret || !signature) throw new Error('Stripe webhook verification is not configured');
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    console.error('Stripe webhook signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) {
    return NextResponse.json({ received: true, handled: false });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (!isPaidAssessmentCheckoutSession(session)) {
    return NextResponse.json({ received: true, handled: false });
  }

  try {
    const result = await upsertAssessmentCustomer(session);
    console.log(`Paid assessment recorded in LLAI GHL session=${session.id} contact=${result.contactId}`);
    return NextResponse.json({ received: true, handled: true, contactCreated: result.created });
  } catch (error) {
    console.error('Paid assessment handling failed:', error);
    return NextResponse.json({ error: 'Paid assessment handling failed' }, { status: 503 });
  }
}
