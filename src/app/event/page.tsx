'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

function CountdownTimer() {
  const target = new Date('2026-02-27T19:00:00Z').getTime(); // 2 PM EST = 7 PM UTC
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex justify-center gap-3">
      {[
        { val: timeLeft.days, label: 'Days' },
        { val: timeLeft.hours, label: 'Hrs' },
        { val: timeLeft.minutes, label: 'Min' },
        { val: timeLeft.seconds, label: 'Sec' },
      ].map((t, i) => (
        <div key={i} className="bg-white/10 backdrop-blur rounded-xl px-3 py-2 min-w-[60px] text-center">
          <div className="text-2xl sm:text-3xl font-bold text-white font-display">{String(t.val).padStart(2, '0')}</div>
          <div className="text-[10px] uppercase tracking-wider text-white/60 font-body">{t.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.phone,
          industry: '',
          question: '',
        }),
      });
      if (!res.ok) throw new Error('Registration failed');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const faqs = [
    { q: "Is this really free?", a: "100% free. No credit card needed. No hidden fees." },
    { q: "Do I need to be tech-savvy?", a: "If you can use a smartphone, you're good." },
    { q: "Can I watch the replay?", a: "Yes — register and we'll email you the recording." },
    { q: "What trade is this for?", a: "All of them. HVAC, plumbing, electrical, landscaping, roofing, painting, cleaning — any service business." },
    { q: "Is this a sales pitch?", a: "45 min of real demos. 5 min optional offer at the end. That's it." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky CTA Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C1917] shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          <span className="font-display text-base font-bold text-white">Learn & Leverage AI</span>
          <a
            href="#register"
            className="bg-amber-500 hover:bg-amber-600 text-white font-body font-bold text-sm px-4 py-2 rounded-lg transition-colors animate-pulse"
          >
            Reserve My Spot 🔥
          </a>
        </div>
      </nav>

      {/* HERO — Full-bleed image with overlay */}
      <section className="relative pt-14 min-h-[85vh] flex flex-col justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-contractor.png"
            alt="Contractor using AI on phone"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 px-5 py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 px-4 py-2 rounded-full font-body text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            FREE Live Training — Feb 27
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white leading-[1.1] mb-4">
            Stop Losing Jobs<br />
            to Missed Calls.<br />
            <span className="text-amber-400">AI Can Fix That.</span>
          </h1>

          <p className="font-body text-lg text-white/80 mb-6 max-w-md mx-auto">
            45 min. Live demos. Built for contractors.
          </p>

          <a
            href="#register"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/30 active:scale-95"
          >
            Reserve My Spot — It&apos;s FREE →
          </a>

          <div className="mt-8">
            <p className="text-white/50 text-xs uppercase tracking-widest font-body mb-3">Starts in</p>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Pain Points — Quick & Visual */}
      <section className="py-10 px-5 bg-[#FFFBF5]">
        <h2 className="font-display text-2xl font-black text-[#1C1917] text-center mb-6">
          Sound Familiar? 👇
        </h2>

        <div className="space-y-3 max-w-md mx-auto">
          {[
            { emoji: "📱", text: "Missed calls = missed jobs ($2K+ lost)" },
            { emoji: "📝", text: "Sunday nights doing paperwork instead of living" },
            { emoji: "📸", text: "No time for social media marketing" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
              <span className="text-2xl">{item.emoji}</span>
              <p className="font-body text-[#57534E] font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="font-display text-lg font-bold text-[#1C1917] text-center mt-6 px-4">
          You didn&apos;t start your business to be a secretary.
        </p>
      </section>

      {/* What You'll See — With Dashboard Image */}
      <section className="py-10 bg-[#1C1917] text-white">
        <div className="px-5">
          <h2 className="font-display text-2xl font-black text-center mb-2">
            What You&apos;ll See Live 🎥
          </h2>
          <p className="font-body text-gray-400 text-center text-sm mb-6">
            Two demos that&apos;ll blow your mind:
          </p>

          <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
            <Image
              src="/images/ai-dashboard.png"
              alt="AI Dashboard for contractors"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
                <h3 className="font-display text-base font-bold">AI Answers Your Phone</h3>
              </div>
              <p className="font-body text-gray-400 text-sm">
                Real call. AI picks up. Books the job. No voicemail. No missed revenue.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
                <h3 className="font-display text-base font-bold">7 Days of Posts in 60 Seconds</h3>
              </div>
              <p className="font-body text-gray-400 text-sm">
                Pick your trade. AI generates a week of social content. Done.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 max-w-md mx-auto">
            {[
              { emoji: "📊", text: "ROI Calculator" },
              { emoji: "❓", text: "Live Q&A" },
              { emoji: "🎁", text: "Free AI Checklist" },
            ].map((item, i) => (
              <div key={i} className="text-center bg-white/5 rounded-xl p-3">
                <span className="text-xl block mb-1">{item.emoji}</span>
                <p className="font-body text-[11px] text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Visual */}
      <section className="py-10 px-5 bg-white">
        <h2 className="font-display text-2xl font-black text-[#1C1917] text-center mb-6">
          Same Business. Different Results.
        </h2>
        <div className="relative rounded-2xl overflow-hidden aspect-video max-w-md mx-auto shadow-xl">
          <Image
            src="/images/before-after.png"
            alt="Contractor transformation with AI"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 max-w-md mx-auto">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="font-body text-sm font-bold text-red-700 mb-1">😩 The Old Way</p>
            <p className="font-body text-xs text-red-600/70">Voicemail graveyard. Paperwork at midnight. Customers ghosting.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="font-body text-sm font-bold text-green-700 mb-1">🚀 With AI</p>
            <p className="font-body text-xs text-green-600/70">Every call answered. Jobs booked while you work. Weekends back.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 px-5 bg-[#FFFBF5]">
        <h2 className="font-display text-xl font-black text-[#1C1917] text-center mb-6">
          Built by a Contractor, for Contractors 🔧
        </h2>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] max-w-sm mx-auto mb-6">
          <Image
            src="/images/happy-contractors.png"
            alt="Happy contractors using AI"
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-100 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/images/brandon-calloway.jpg" alt="Brandon Calloway" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="font-display font-bold text-[#1C1917]">Brandon Calloway</p>
              <p className="font-body text-xs text-amber-700">Pool service owner → AI consultant</p>
            </div>
          </div>
          <p className="font-body text-sm text-[#57534E] leading-relaxed">
            &quot;I quit corporate, started a pool service company, and used AI to handle what I couldn&apos;t. Other contractors kept asking how. So I built tools for us.&quot;
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6 max-w-md mx-auto">
          {[
            { stat: "500+", label: "Contractors helped" },
            { stat: "24/7", label: "AI never sleeps" },
            { stat: "$0", label: "Cost to attend" },
          ].map((s, i) => (
            <div key={i} className="text-center bg-white rounded-xl p-3 border border-amber-100">
              <p className="font-display text-xl font-black text-amber-600">{s.stat}</p>
              <p className="font-body text-[10px] text-[#78716C] uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details Bar */}
      <section className="py-6 px-5 bg-white">
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {[
            { label: "When", value: "Feb 27" },
            { label: "Time", value: "2 PM EST" },
            { label: "Where", value: "Zoom" },
            { label: "Cost", value: "FREE", highlight: true },
          ].map((item, i) => (
            <div key={i} className="text-center bg-[#FFFBF5] rounded-xl p-3 border border-amber-100">
              <div className="font-body text-[10px] text-[#78716C] uppercase tracking-wider">{item.label}</div>
              <div className={`font-display text-sm font-bold mt-0.5 ${item.highlight ? 'text-green-600' : 'text-[#1C1917]'}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus: AI Starter Pack */}
      <section className="py-8 px-5 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-5 border-2 border-amber-300 shadow-lg">
          <div className="text-center mb-3">
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">ATTENDEE BONUS</span>
          </div>
          <h3 className="font-display text-lg font-black text-[#1C1917] text-center mb-2">
            AI Starter Pack — $497
          </h3>
          <p className="font-body text-sm text-[#57534E] text-center mb-3">
            Exclusive webinar-only price (normally $750)
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "AI Receptionist setup for your business",
              "30 days of social media content",
              "Custom AI workflow automation",
              "1-on-1 setup call with Brandon",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-[#57534E]">
                <span className="text-amber-500 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="font-body text-xs text-center text-[#A8A29E]">
            Mentioned at end of webinar. No pressure. The free training stands on its own.
          </p>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="register" className="py-12 bg-[#1C1917] text-white scroll-mt-14">
        <div className="px-5 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-black mb-2">
              Reserve Your Spot 🎯
            </h2>
            <p className="font-body text-gray-400 text-sm">
              Feb 27 at 2 PM EST · 100% Free · Replay included
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6">
            {formState === 'success' ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-display text-xl text-[#1C1917] font-black mb-2">You&apos;re In!</h3>
                <p className="font-body text-sm text-[#57534E]">
                  Check your email for the Zoom link. See you Feb 27!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Phone (optional)"
                />

                {formState === 'error' && (
                  <p className="font-body text-red-600 text-sm text-center">Something went wrong. Try again.</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-body font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/30 active:scale-95"
                >
                  {formState === 'loading' ? 'Registering...' : 'Reserve My Spot — FREE 🔥'}
                </button>

                <p className="font-body text-center text-[10px] text-[#A8A29E]">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ — Compact */}
      <section className="py-10 px-5 bg-[#FFFBF5]">
        <h2 className="font-display text-xl font-black text-[#1C1917] text-center mb-5">
          Quick Questions
        </h2>
        <div className="space-y-2 max-w-md mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-amber-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 text-left"
              >
                <span className="font-body font-medium text-[#1C1917] text-sm pr-3">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-amber-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all ${openFaq === i ? 'max-h-32' : 'max-h-0'}`}>
                <p className="px-3.5 pb-3.5 font-body text-sm text-[#57534E]">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-5 bg-[#1C1917] text-white text-center">
        <h2 className="font-display text-2xl font-black mb-3">
          45 Minutes. Zero Cost.<br />
          <span className="text-amber-400">See AI Work for Your Business.</span>
        </h2>
        <a
          href="#register"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg mt-4 transition-all shadow-lg shadow-amber-500/30 active:scale-95"
        >
          Reserve My Spot — FREE →
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white border-t border-gray-100">
        <p className="font-body text-xs text-[#A8A29E] text-center px-5">
          © {new Date().getFullYear()} Learn & Leverage AI. Built by a contractor, for contractors.
        </p>
      </footer>
    </div>
  );
}
