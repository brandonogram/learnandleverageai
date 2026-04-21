'use client';

import { useState, useEffect, useRef } from 'react';
import {
  captureUTMParams,
  setPostHogUTMProperties,
  trackCtaClicked,
  trackFaqExpanded,
  trackScrollDepth,
} from '@/lib/analytics';

const STRIPE_LINK = 'https://buy.stripe.com/bJebIUgAoaribNIgML87K0c';

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function AssessmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const utm = captureUTMParams();
    setPostHogUTMProperties(utm);

    const onScroll = () => {
      const scrollPct = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPct >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stripeUrl = (source: string) => {
    const params = new URLSearchParams();
    params.set('utm_source', 'lnl_assessment_page');
    params.set('utm_medium', source);
    return `${STRIPE_LINK}?${params.toString()}`;
  };

  const handleCta = (label: string, location: string) => {
    trackCtaClicked(label, location);
  };

  const faqs = [
    {
      q: 'Is this a fit for my business?',
      a: 'This is built specifically for owner-led service businesses in New Castle, Delaware and Chester counties — pool service, HVAC, landscaping, construction, event venues, multi-provider medical/dental/vet, niche manufacturing — with 10 to 50 employees and no full-time tech lead. If that sounds like you, the patterns we look for (slow lead response, manual reports, repetitive customer communication, dispatch chaos) almost always show up. If you\'re outside that lane, send a note before paying — we\'ll tell you straight whether it fits.',
    },
    {
      q: 'How is this different from a $20/month ChatGPT subscription?',
      a: 'ChatGPT is a tool. This is a plan — for YOUR business, YOUR pain points, in YOUR specific words. A tool without a plan is why most owners have tried AI, gotten confused, and given up. You\'ll walk out of this with a 4-day Quick-Win Plan that tells you exactly what to install and in what order.',
    },
    {
      q: 'What if I need help implementing what\'s in the report?',
      a: 'The report includes prioritized recommendations and rollout steps for each one. After your walkthrough call, you have a defined next step — DIY (you and your team execute), a one-time build engagement ($4,997 — we install and hand off), or a monthly advisory engagement ($4,997/month — we install, train your team, and stay for ongoing improvements). You pick what fits.',
    },
    {
      q: 'Why is Brandon qualified to do this?',
      a: 'Brandon runs three businesses where AI is part of daily operations: Tri-State Aquatic Solutions (pool service — AI voice receptionist), 302 Photo Booth (AI-powered booking automation), and Call2Calendar (voice agent SaaS). He doesn\'t teach theory — he runs companies that use these systems every week.',
    },
    {
      q: 'What exactly happens after I pay?',
      a: 'You\'re routed to a confirmation page with a phone number to call our AI intake agent (Emma). You can call any time — the call takes about 20 minutes and there\'s no prep. Your report lands within 48 business hours of completing the intake call. After delivery you receive a calendar link to book the 30-minute walkthrough with Brandon at your convenience.',
    },
    {
      q: 'What\'s the refund policy?',
      a: 'If your assessment report doesn\'t identify at least 5 hours per week of recoverable time for your business, request a refund within 30 days of delivery and we\'ll refund the full $997 within 5 business days. You\'ll be asked to share which recommendations you reviewed and why they didn\'t apply (so we can improve). Full assessment-specific terms are linked in the footer.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section className="bg-[#FFFBF5] px-5 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
            For Delaware business owners
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-[#1C1917] mb-5 leading-tight">
            Get a custom AI plan for your business — in 48 hours.
          </h1>
          <p className="font-body text-lg text-[#44403C] mb-8 max-w-2xl mx-auto leading-relaxed">
            One 20-minute phone call. A PDF report showing exactly where AI reclaims hours, cuts costs, or brings in more revenue — with specific tools, install steps, and dollar impact. Built by someone who&apos;s run the systems in his own businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={stripeUrl('hero')}
              onClick={() => handleCta('Get My Assessment', 'hero')}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Get My Assessment — $997
            </a>
          </div>
          <p className="font-body text-sm text-[#78716C] mt-4">
            Delivered within 48 business hours of your intake call · 30-min walkthrough · 5-hour-a-week refund guarantee
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST STRIP */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-amber-100 py-6 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-sm text-center text-[#57534E]">
            Brandon runs three operating businesses where AI is part of daily operations:{' '}
            <span className="font-semibold text-[#1C1917]">Tri-State Aquatic Solutions</span> (pool service),{' '}
            <span className="font-semibold text-[#1C1917]">302 Photo Booth</span>, and{' '}
            <span className="font-semibold text-[#1C1917]">Call2Calendar</span> (voice agent SaaS).
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHAT YOU GET */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-3">
            What you get
          </h2>
          <p className="font-body text-[#78716C] text-center mb-10 max-w-xl mx-auto">
            A 20-minute call. A report built for your business. A walkthrough to answer questions.
          </p>

          <div className="bg-white rounded-xl p-8 border border-amber-100 shadow-sm max-w-2xl mx-auto">
            <ul className="space-y-4">
              {[
                'A 20–30 minute phone call with our AI intake agent — any time of day, no calendar dance',
                'An executive-ready PDF report within 48 business hours of your intake call',
                'The top 3–5 AI opportunities prioritized for your business',
                'Specific tools, install steps, and the rollout order',
                'A 4-day Quick-Win Plan you can run with your team',
                'The financial impact — in real dollars per month',
                'A 30-minute walkthrough call with Brandon to answer your team\'s questions',
                'A defined next-step choice — DIY, one-time build ($4,997), or monthly advisory ($4,997/mo)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="font-body text-[#44403C] text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-10">
            How it works
          </h2>

          <div className="space-y-6">
            {[
              {
                n: '1',
                title: 'Pay $997',
                body: 'Secure checkout via Stripe. You\'re routed straight to a confirmation page with the intake phone number and what happens next. A confirmation email is also sent to the address you used at checkout.',
              },
              {
                n: '2',
                title: 'Call the intake line — whenever it\'s convenient',
                body: 'Our AI intake agent (Emma) walks you through about 20 minutes of questions about your business, team, tools, and biggest headaches. No prep required. Call at 9 AM or 11 PM — whatever works.',
              },
              {
                n: '3',
                title: 'Report delivered within 48 business hours',
                body: 'An executive-ready PDF: effort-vs-impact matrix, specific tools, prioritized rollout steps, and the dollar-per-month financial impact. No fluff. The 48-hour clock starts when your intake call wraps up — not when you pay.',
              },
              {
                n: '4',
                title: 'Walkthrough call with Brandon (30 min)',
                body: 'Brandon walks you through the report and answers questions from you or anyone on your team you invite. You leave with a clear next step.',
              },
              {
                n: '5',
                title: 'You pick the next step',
                body: 'DIY — you and your team execute the Quick-Win Plan with the install guides in the report. One-time build ($4,997) — we install and hand off the system you pick. Monthly advisory ($4,997/month) — we install, train your team, and stay on for ongoing improvements. Three options, zero high-pressure pitch.',
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-display font-black text-xl">
                  {step.n}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mb-1">{step.title}</h3>
                  <p className="font-body text-[#57534E] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHO IT'S FOR */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-10">
            Is this for you?
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
              <h3 className="font-display text-base font-bold text-green-700 mb-4 flex items-center gap-2">
                <span className="inline-block w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm">✓</span>
                Yes, if you…
              </h3>
              <ul className="space-y-3">
                {[
                  'Run an owner-led service business in New Castle, Delaware, or Chester County',
                  'Have 10–50 employees',
                  'Don\'t have a full-time CTO or tech lead — that work lands on you',
                  'Live with obvious operational pain — slow lead response, manual reports, dispatch chaos, repetitive customer comms',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="font-body text-sm text-[#44403C]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
              <h3 className="font-display text-base font-bold text-[#78716C] mb-4 flex items-center gap-2">
                <span className="inline-block w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-sm">✗</span>
                Probably not, if you…
              </h3>
              <ul className="space-y-3">
                {[
                  'Are a one-person shop — the ROI math doesn\'t work yet',
                  'Already have a CTO or in-house data science team',
                  'Are already deep into AI and have your stack figured out',
                  'Want abstract theory instead of a concrete plan',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-stone-400 mt-0.5 flex-shrink-0">—</span>
                    <span className="font-body text-sm text-[#78716C]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GUARANTEE */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-amber-50 border border-amber-200 rounded-2xl p-8 sm:p-10">
            <h2 className="font-display text-2xl font-black text-[#1C1917] mb-3">
              5-hour-a-week refund guarantee
            </h2>
            <p className="font-body text-[#44403C] leading-relaxed">
              If your assessment report doesn&apos;t identify at least 5 hours per week of recoverable time for your business, request a refund within 30 days of delivery — we refund the full $997 to your original payment method within 5 business days. You&apos;ll be asked to share which recommendations you reviewed and why they didn&apos;t apply, so we can improve.
            </p>
            <p className="font-body text-sm text-[#78716C] mt-3">
              See the full <a href="/terms#assessment-refund" className="underline hover:text-[#1C1917]">assessment refund terms</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-10">
            Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-amber-100 overflow-hidden">
                <button
                  onClick={() => {
                    const next = openFaq === i ? null : i;
                    setOpenFaq(next);
                    if (next !== null) trackFaqExpanded(faq.q, i);
                  }}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-amber-50/50 transition-colors"
                >
                  <span className="font-body font-semibold text-[#1C1917] pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#78716C] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 font-body text-[#57534E] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA */}
      {/* ============================================================ */}
      <section className="py-20 px-5 bg-gradient-to-b from-[#FFFBF5] to-amber-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-4xl font-black text-[#1C1917] mb-4 leading-tight">
            Your quickest path from &ldquo;I should do something with AI&rdquo; to &ldquo;I have a specific plan&rdquo; is 48 hours away.
          </h2>
          <p className="font-body text-[#44403C] mb-8 text-lg">
            One call. One report. One walkthrough. Then you decide what&apos;s next.
          </p>
          <a
            href={stripeUrl('final_cta')}
            onClick={() => handleCta('Get My Assessment', 'final_cta')}
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-xl font-body font-black text-xl transition-all shadow-lg shadow-amber-500/30 active:scale-95"
          >
            Get My Assessment — $997
          </a>
          <p className="font-body text-sm text-[#78716C] mt-4">
            Secure checkout via Stripe · 5-hour-a-week refund guarantee · Within 48 business hours of your intake call
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="bg-[#1C1917] text-stone-400 py-10 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-white text-lg font-bold mb-2">Learn & Leverage AI</p>
          <p className="font-body text-sm">
            Hands-on AI consulting for Delaware business owners.
          </p>
          <p className="font-body text-xs mt-4">
            Questions? Text (302) 416-6285 or email{' '}
            <a href="mailto:brandon@learnandleverageai.com" className="text-amber-400 hover:text-amber-300">
              brandon@learnandleverageai.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
