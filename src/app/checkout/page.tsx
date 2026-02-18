'use client';

import { useState } from 'react';
import Image from 'next/image';

const BUSINESS_TYPES = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Landscaping',
  'Roofing',
  'General Contractor',
  'Pool Service',
  'Cleaning',
  'Painting',
  'Other',
];

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1917]">
      {/* Header */}
      <nav className="bg-[#1C1917] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <a href="/event" className="font-display text-base font-bold text-white hover:text-amber-400 transition-colors">
            ← Back to Event
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: What's Included */}
          <div className="text-white">
            <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              WEBINAR-ONLY PRICE
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-black mb-2">
              AI Starter Pack
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-black text-amber-400">$497</span>
              <span className="font-body text-lg text-gray-500 line-through">$750</span>
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">
                SAVE $253
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-display text-lg font-bold text-amber-400">What&apos;s Included:</h3>

              {[
                {
                  title: 'AI Phone Receptionist Setup',
                  desc: 'We build and configure your AI receptionist. Answers calls 24/7, books jobs, sends follow-ups.',
                  value: '$750 value',
                },
                {
                  title: '30 Days ContentCreationDude Pro',
                  desc: 'AI generates a month of social media posts tailored to your business and brand voice.',
                  value: '$49 value',
                },
                {
                  title: '1-on-1 Strategy Call with Brandon',
                  desc: '30-minute call to map out your AI implementation plan and answer questions.',
                  value: '$200 value',
                },
                {
                  title: '"10 Things AI Can Do" Playbook',
                  desc: 'PDF guide with actionable AI use cases specific to your trade.',
                  value: 'Bonus',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-lg flex-shrink-0">✓</span>
                  <div>
                    <p className="font-body font-bold text-white text-sm">{item.title}</p>
                    <p className="font-body text-xs text-gray-400">{item.desc}</p>
                    <p className="font-body text-xs text-amber-500 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What Happens Next */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
              <h3 className="font-display text-base font-bold text-white mb-3">What Happens After You Pay:</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Instant confirmation email + AI Playbook PDF' },
                  { step: '2', text: 'Within 24hrs: Schedule your strategy call' },
                  { step: '3', text: 'Within 5 business days: AI receptionist is LIVE' },
                  { step: '4', text: 'Same day: ContentCreationDude Pro access' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-amber-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {s.step}
                    </span>
                    <p className="font-body text-sm text-gray-300">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="font-body text-sm text-green-300 font-medium">
                🛡️ 30-Day Money-Back Guarantee — If your AI receptionist isn&apos;t live within 5 business days, full refund. No questions asked.
              </p>
            </div>

            {/* Brandon Card */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/brandon-calloway.jpg"
                  alt="Brandon Calloway"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-body text-sm text-white font-medium">Brandon Calloway</p>
                <p className="font-body text-xs text-gray-400">Pool service owner turned AI consultant</p>
              </div>
            </div>
          </div>

          {/* Right: Checkout Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="font-display text-xl font-black text-[#1C1917] mb-1">
                Complete Your Order
              </h2>
              <p className="font-body text-sm text-[#78716C] mb-6">
                One-time payment. No subscriptions. No hidden fees.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium text-[#1C1917] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-[#1C1917] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-[#1C1917] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-[#1C1917] mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Smith's HVAC LLC"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-[#1C1917] mb-1">
                    Business Type *
                  </label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="">Select your trade...</option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="font-body text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-body font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/30 active:scale-95 mt-2"
                >
                  {loading ? 'Redirecting to payment...' : 'Pay $497 — Get Started →'}
                </button>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <span className="font-body text-xs text-[#A8A29E]">🔒 Secure checkout via Stripe</span>
                </div>

                <p className="font-body text-center text-[10px] text-[#A8A29E]">
                  By purchasing you agree to our terms of service. 30-day money-back guarantee.
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
              <div className="flex justify-between font-body text-sm text-gray-400 mb-2">
                <span>AI Starter Pack</span>
                <span className="line-through">$750.00</span>
              </div>
              <div className="flex justify-between font-body text-sm text-green-400 mb-2">
                <span>Webinar Discount</span>
                <span>-$253.00</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-display text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-amber-400">$497.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
