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
  description: 'A custom AI plan for your business, delivered in 48 hours. One 20-minute voice-agent call + PDF report identifying your top 3-5 AI opportunities with install steps, quick-win plan, and financial impact. Includes a 30-min walkthrough call with Brandon.',
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
  allow_promotion_codes: true,
  custom_fields: [
    { key: 'company_name', label: { type: 'custom', custom: 'Company Name' }, type: 'text' },
    { key: 'phone', label: { type: 'custom', custom: 'Best Phone Number' }, type: 'text' },
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
