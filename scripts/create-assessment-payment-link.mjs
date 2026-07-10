import Stripe from 'stripe';
import { readFileSync } from 'fs';

const env = Object.fromEntries(
  readFileSync('/Users/brandonbot/projects/workbench/learnandleverageai/.env.local', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(l => {
      const [k, ...rest] = l.split('=');
      return [k.trim(), rest.join('=').replace(/^"|"$/g, '').trim()];
    })
);

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const product = await stripe.products.create({
  name: 'AI Opportunity Assessment',
  description: 'A custom AI plan for your business, delivered within 48 business hours after your completed guided intake. Includes a PDF report identifying your top 3-5 AI opportunities with install steps, a quick-win plan, and a financial-impact estimate, plus a 30-minute walkthrough call with Brandon.',
  metadata: { product_type: 'assessment', wedge: 'true' }
});

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 99700,
  currency: 'usd',
  metadata: { tier: 'assessment' }
});

const paymentLink = await stripe.paymentLinks.create({
  line_items: [{ price: price.id, quantity: 1 }],
  after_completion: {
    type: 'redirect',
    redirect: { url: 'https://learnandleverageai.com/assessment/success' }
  },
  allow_promotion_codes: false,
  phone_number_collection: { enabled: true },
  custom_fields: [
    { key: 'company_name', label: { type: 'custom', custom: 'Company Name' }, type: 'text' },
    { key: 'industry', label: { type: 'custom', custom: 'Industry' }, type: 'text' }
  ],
  metadata: { product_type: 'assessment' }
});

console.log(JSON.stringify({
  product_id: product.id,
  price_id: price.id,
  payment_link_id: paymentLink.id,
  payment_link_url: paymentLink.url
}, null, 2));
