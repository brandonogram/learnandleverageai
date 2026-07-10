'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  captureUTMParams,
  setPostHogUTMProperties,
  trackFormStarted,
  trackFormFieldCompleted,
  trackCtaClicked,
  trackFaqExpanded,
  trackScrollDepth,
  UTMParams,
} from '@/lib/analytics';


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

export default function WorkshopsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const formStartedRef = useRef(false);
  const completedFieldsRef = useRef<Set<string>>(new Set());
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  // ── UTM capture & scroll tracking ──────────────────────────────────
  useEffect(() => {
    const utm = captureUTMParams();
    setUtmParams(utm);
    setPostHogUTMProperties(utm);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of [25, 50, 75, 100]) {
        if (percent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Hide GHL chat widget on this page (it overlaps CTAs on mobile) ─
  useEffect(() => {
    const hideWidget = () => {
      const widget = document.querySelector('[data-widget-id="69c2f2eedf59cd6cb0175896"]') as HTMLElement;
      if (widget) widget.style.display = 'none';
    };
    hideWidget();
    const observer = new MutationObserver(hideWidget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // ── Form field tracking ────────────────────────────────────────────
  const handleFormFocus = useCallback(() => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormStarted();
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormStarted();
    }

    if (value.trim() && !completedFieldsRef.current.has(field)) {
      completedFieldsRef.current.add(field);
      trackFormFieldCompleted(field);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          location_preference: formData.location,
          utm_source: utmParams.utm_source || '',
          utm_medium: utmParams.utm_medium || '',
          utm_campaign: utmParams.utm_campaign || '',
        }),
      });
      if (!res.ok) throw new Error('Waitlist signup failed');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const faqs = [
    {
      q: "Do I need any tech experience?",
      a: "None at all. If you can use email and a web browser, you're ready. We start from the basics and work up. Most attendees rate themselves a 2-3 out of 10 on AI skills when they walk in.",
    },
    {
      q: "Is this really free? What's the catch?",
      a: "The workshop is 100% free — no credit card, no hidden fees. We offer optional paid follow-up services (like an AI starter pack and advanced workshops) for people who want to go deeper, but the workshop delivers real value on its own. No pressure.",
    },
    {
      q: "What should I bring?",
      a: "A laptop (fully charged) and a curious mind. We'll provide a printed workbook, coffee, snacks, and all the resources you need. If you have a ChatGPT or Claude account already, great — if not, we'll help you set one up during the workshop.",
    },
    {
      q: "Can my company pay for follow-up training?",
      a: "Absolutely. We offer corporate team training packages. Many attendees use their company's professional development budget to cover follow-up services. The free workshop itself needs no approval.",
    },
    {
      q: "I've tried ChatGPT and couldn't make it useful. Will this be different?",
      a: "That's exactly who this workshop is built for. Most people type one question into ChatGPT, get a mediocre answer, and give up. We'll show you the specific techniques that make AI actually useful for your daily work — not generic tips you can find on YouTube.",
    },
    {
      q: "Is this a sales pitch disguised as a workshop?",
      a: "No. You'll get focused hands-on training and a brief mention of what's available next for people who want to continue. That's it. The workshop stands on its own.",
    },
    {
      q: "Where are the workshops held?",
      a: "We run small in-person sessions in the Delaware and Greater Philadelphia area. When you join the waitlist, you can tell us which location works best — we use that to plan where to host next.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C1917] shadow-lg">
        <div className="flex items-center justify-between px-4 h-14 max-w-5xl mx-auto">
          <span className="font-display text-base font-bold text-white">
            Learn & Leverage <span className="text-amber-400">AI</span>
          </span>
          <a
            href="#waitlist"
            onClick={() => trackCtaClicked('Join Waitlist', 'sticky_nav')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-body font-bold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Join the Waitlist
          </a>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section className="relative pt-14 min-h-[90vh] flex flex-col justify-center bg-[#1C1917]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917]" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-5 py-12 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/30 text-amber-400 px-4 py-2 rounded-full font-body text-sm font-medium mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Next Workshop Coming Soon — Join the Waitlist
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 animate-fade-up-delay-1">
            Most AI Workshops<br />
            Teach You Theory.<br />
            <span className="text-amber-400 relative inline-block line-draw">This One Gives You Tools.</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-gray-400 mb-4 max-w-xl mx-auto animate-fade-up-delay-2">
            Free. Hands-on. 2 hours. You bring your laptop — you leave with AI tools set up and working for your actual job.
          </p>

          <p className="font-body text-base text-gray-500 mb-8 max-w-lg mx-auto animate-fade-up-delay-3">
            Small groups only (10-15 people). Waitlist gets first access when we announce the next date.
          </p>

          {/* Hero inline form */}
          <div className="animate-fade-up-delay-4">
            {formState === 'success' ? (
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 max-w-md mx-auto">
                <p className="font-body text-green-400 font-bold text-center">You&apos;re on the list! We&apos;ll email you when the next session is announced.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-3"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onFocus={handleFormFocus}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-0 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-0 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Work email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  {formState === 'loading' ? 'Joining...' : 'Join the Waitlist — Get First Access'}
                </button>
                {formState === 'error' && (
                  <p className="font-body text-red-400 text-sm text-center">Something went wrong. Try again.</p>
                )}
                <p className="font-body text-amber-400/80 text-xs text-center font-medium">
                  Free workshop. Waitlist gets priority seats.
                </p>
                <p className="font-body text-center text-[10px] text-gray-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  We&apos;ll only email you about upcoming workshops. No spam.{' '}
                  <a href="/privacy" className="underline text-gray-500">Privacy</a> |{' '}
                  <a href="/terms" className="underline text-gray-500">Terms</a>
                </p>
              </form>
            )}
          </div>

          {/* Location + format quick details */}
          <div className="grid grid-cols-3 gap-3 mt-8 max-w-md mx-auto">
            {[
              { label: "Format", value: "In-Person" },
              { label: "Duration", value: "2 Hours" },
              { label: "Cost", value: "FREE", highlight: true },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="font-body text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</div>
                <div className={`font-display text-sm font-bold mt-0.5 ${item.highlight ? 'text-green-400' : 'text-white'}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROBLEM — Who This Is For */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-3">
            Sound Familiar?
          </h2>
          <p className="font-body text-[#78716C] text-center mb-4 max-w-lg mx-auto">
            If any of these describe you, this workshop was built for you.
          </p>
          <p className="font-body text-[#A8A29E] text-center text-sm mb-10 max-w-lg mx-auto">
            Built for professionals at JPMorgan, Capital One, DuPont, AstraZeneca, and companies across Delaware and the Greater Philadelphia area.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              {
                text: "Your company told you to \"learn AI\" but gave you zero training",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              },
              {
                text: "You've tried ChatGPT once or twice and thought \"I don't get it\"",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
              {
                text: "You're watching younger colleagues use AI and feeling left behind",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                text: "You want practical skills you can use Monday morning, not another webinar",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <p className="font-body text-[#44403C] text-sm font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="font-display text-lg sm:text-xl font-bold text-[#1C1917] text-center mt-10 max-w-lg mx-auto">
            You&apos;re not behind because you&apos;re not smart enough.
            You&apos;re behind because no one showed you how.
          </p>
          <p className="font-body text-[#78716C] text-center mt-2">
            That changes in one evening.
          </p>
          <div className="text-center mt-8">
            <a
              href="#waitlist"
              onClick={() => trackCtaClicked('Get on the Waitlist', 'sound_familiar')}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Get on the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHAT YOU'LL LEARN — Outcomes, Not Features */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#1C1917] text-white">
        <div className="px-5 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-center mb-3">
            What You&apos;ll Walk Out With
          </h2>
          <p className="font-body text-gray-400 text-center mb-10 max-w-lg mx-auto">
            This isn&apos;t a lecture. You&apos;ll open your laptop and do the work, with guidance.
          </p>

          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              {
                time: "Hour 1",
                title: "What AI Actually Is & How to Use It",
                desc: "A clear-eyed look at what AI can and can't do today. Live demos of ChatGPT and Claude, then hands-on exercises where you ask AI to do YOUR actual work tasks. Learn the techniques that turn mediocre AI responses into genuinely useful ones.",
              },
              {
                time: "Hour 2",
                title: "AI Agents, Automation & Your Toolkit",
                desc: "See how AI can handle repetitive work without you. Live demo of a voice agent that answers phone calls and books appointments. Then set up AI tools on your laptop before you leave. You leave with tools working, not just notes.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-amber-500/20 text-amber-400 text-xs font-bold font-body px-3 py-1 rounded-full">
                    {item.time}
                  </span>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                </div>
                <p className="font-body text-gray-400 text-sm leading-relaxed pl-0 sm:pl-[70px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#waitlist"
              onClick={() => trackCtaClicked('Join the Waitlist', 'what_youll_learn')}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT BRANDON */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-10">
            Who&apos;s Teaching This
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 max-w-2xl mx-auto">
            <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-amber-200">
              <Image
                src="/images/brandon-headshot.jpg"
                alt="Brandon Calloway"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-display text-xl font-black text-[#1C1917] mb-1">Brandon Calloway</h3>
              <p className="font-body text-amber-700 text-sm font-medium mb-4">
                AI Practitioner. Business Owner. Not a Hype Guy.
              </p>
              <div className="font-body text-[#57534E] text-sm space-y-3 leading-relaxed">
                <p>
                  I run 5+ businesses using AI every single day. Not in theory — in practice, with real revenue on the line.
                </p>
                <p>
                  <strong className="text-[#1C1917]">Call2Calendar</strong> — an AI voice agent that answers phones for businesses 24/7 and books appointments automatically.{' '}
                  <strong className="text-[#1C1917]">Tri-State Aquatic</strong> — a service company where AI handles scheduling, customer communication, and operations.{' '}
                  <strong className="text-[#1C1917]">302 Photo Booth</strong> — an event company with AI-automated booking and marketing.
                </p>
                <p>
                  I&apos;m not an AI researcher or a tech influencer. I&apos;m a business operator who figured out how to make AI do real work. Now I teach other professionals to do the same — in plain language, with practical exercises, no jargon.
                </p>
              </div>
            </div>
          </div>

          {/* Credibility stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg mx-auto">
            {[
              { stat: "5+", label: "Businesses run on AI" },
              { stat: "24/7", label: "AI systems running live" },
              { stat: "1000s", label: "Hours saved with AI" },
            ].map((s, i) => (
              <div key={i} className="text-center bg-[#FFFBF5] rounded-xl p-4 border border-amber-100">
                <p className="font-display text-2xl font-black text-amber-600">{s.stat}</p>
                <p className="font-body text-[10px] text-[#78716C] uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WORKSHOP DETAILS */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-10">
            Workshop Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-sm">
              <h3 className="font-display text-base font-bold text-[#1C1917] mb-4">The Basics</h3>
              <ul className="space-y-3">
                {[
                  { label: "Date", value: "Next date announced soon" },
                  { label: "Time", value: "Weeknight evening, 2 hours" },
                  { label: "Where", value: "Delaware & Greater Philadelphia area" },
                  { label: "Cost", value: "FREE", highlight: true },
                  { label: "Seats", value: "Limited to 10-15" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-body text-[#78716C] text-sm w-16 flex-shrink-0">{item.label}</span>
                    <span className={`font-body text-sm font-medium ${item.highlight ? 'text-green-600' : 'text-[#1C1917]'}`}>
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-sm">
              <h3 className="font-display text-base font-bold text-[#1C1917] mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {[
                  "2 hours of hands-on AI training",
                  "Printed workbook with exercises",
                  "AI tool comparison guide",
                  "Prompt library for your job function",
                  "Coffee and snacks",
                  "Resource list with setup guides",
                  "Action plan template for Monday morning",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="font-body text-sm text-[#57534E]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="#waitlist"
              onClick={() => trackCtaClicked('Join the Waitlist', 'workshop_details')}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SOCIAL PROOF */}
      {/* ============================================================ */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="font-body text-sm text-[#78716C] mb-3">Built for professionals at companies like:</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['JPMorgan Chase', 'Capital One', 'DuPont', 'AstraZeneca', 'Barclays', 'Bank of America'].map((company) => (
                <span key={company} className="font-body text-sm font-semibold text-[#A8A29E]">{company}</span>
              ))}
            </div>
            <p className="font-body text-xs text-[#D6D3D1] mt-3">
              No corporate sponsorship — these are the companies where our target attendees work.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VALUE STACK — What You Get (for free) */}
      {/* ============================================================ */}
      <section className="py-12 px-5 bg-[#FFFBF5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-2">
            Everything You Get (for Free)
          </h2>
          <p className="font-body text-[#78716C] text-center mb-8">
            All of this. In one evening. No strings attached.
          </p>
          <div className="space-y-3 max-w-lg mx-auto">
            {[
              '3 AI tools set up and working on YOUR laptop',
              'Prompt templates you can use at work the next morning',
              'Live demo: watch an AI agent answer a real phone call',
              'Printed workbook with exercises and reference guides',
              'A clear plan for which AI tools fit your specific role',
              'Coffee, snacks, and Wi-Fi included',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="font-body text-[#44403C] text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-center text-[#78716C] text-sm mt-6">
            Total value: <span className="font-bold text-[#1C1917]">$297+</span> — yours for <span className="font-bold text-green-600">$0</span>
          </p>
          <div className="text-center mt-6">
            <a
              href="#waitlist"
              onClick={() => trackCtaClicked('Get First Access', 'value_stack')}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Get First Access
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-amber-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => {
                    const isOpening = openFaq !== i;
                    setOpenFaq(isOpening ? i : null);
                    if (isOpening) trackFaqExpanded(faq.q, i);
                  }}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <span className="font-body font-semibold text-[#1C1917] text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 font-body text-sm text-[#57534E] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WAITLIST FORM */}
      {/* ============================================================ */}
      <section id="waitlist" className="py-16 bg-[#1C1917] text-white scroll-mt-14">
        <div className="px-5 max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-black mb-3">
              Join the Waitlist
            </h2>
            <p className="font-body text-gray-400 text-sm max-w-md mx-auto">
              Small groups, free, in-person. We&apos;ll email you when the next session is announced.
              Waitlist gets priority seats.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-8">
            {formState === 'success' ? (
              <div className="py-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-[#1C1917] font-black mb-2">You&apos;re on the List!</h3>
                  <p className="font-body text-sm text-[#57534E] max-w-sm mx-auto">
                    Check your email for a confirmation. We&apos;ll reach out as soon as the next session date is set.
                  </p>
                </div>

                {/* Share with a colleague */}
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <h4 className="font-body text-sm font-bold text-[#1C1917] mb-2">Know someone who should come?</h4>
                  <p className="font-body text-xs text-[#57534E] mb-3">Copy this and send it to a colleague:</p>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="font-body text-xs text-[#44403C] leading-relaxed italic">
                      &ldquo;A local business owner runs free hands-on AI workshops for professionals who haven&apos;t used AI at work yet. Small group, you bring your laptop, he shows you how to set it up for your actual job. Next one is coming soon — get on the waitlist: learnandleverageai.com/workshops&rdquo;
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("A local business owner runs free hands-on AI workshops for professionals who haven't used AI at work yet. Small group, you bring your laptop, he shows you how to set it up for your actual job. Next one is coming soon — get on the waitlist: learnandleverageai.com/workshops");
                      const btn = document.getElementById('copy-share');
                      if (btn) { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy to clipboard', 2000); }
                    }}
                    id="copy-share"
                    className="mt-2 font-body text-xs font-medium text-blue-600 hover:text-blue-800 underline"
                  >
                    Copy to clipboard
                  </button>
                </div>

                {/* What to expect */}
                <div className="bg-amber-50 rounded-xl p-4">
                  <h4 className="font-body text-sm font-bold text-[#1C1917] mb-2">What to expect:</h4>
                  <ul className="space-y-1.5">
                    {[
                      "We'll email you when the next date is set",
                      "Waitlist gets first access before public announcement",
                      "Bring a laptop — you'll build something real before you leave",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckIcon />
                        <span className="font-body text-sm text-[#57534E]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="reg-name" className="block font-body text-sm font-medium text-[#1C1917] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={formData.name}
                    onFocus={handleFormFocus}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Jane Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reg-email" className="block font-body text-sm font-medium text-[#1C1917] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="jane@company.com"
                  />
                </div>

                {/* Location Preference */}
                <div>
                  <label htmlFor="reg-location" className="block font-body text-sm font-medium text-[#1C1917] mb-1.5">
                    Preferred Location
                    <span className="text-[#A8A29E] font-normal ml-1">(helps us plan)</span>
                  </label>
                  <select
                    id="reg-location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Select a location...</option>
                    <option value="newark-de">Newark / Wilmington, DE area</option>
                    <option value="villanova-pa">Villanova / Main Line, PA area</option>
                    <option value="either">Either works for me</option>
                  </select>
                </div>

                {formState === 'error' && (
                  <p className="font-body text-red-600 text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-body font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/30 active:scale-95 mt-2"
                >
                  {formState === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join the Waitlist — It\'s Free'
                  )}
                </button>

                <p className="font-body text-center text-xs text-[#A8A29E] mt-1">
                  We&apos;ll only email you about upcoming workshops. No spam.
                </p>
                <p className="font-body text-center text-[10px] text-[#78716C] mt-2 max-w-sm mx-auto leading-relaxed">
                  By joining, you agree to receive workshop announcements from Learn &amp; Leverage AI.{' '}
                  <a href="/privacy" className="underline">Privacy Policy</a> &amp;{' '}
                  <a href="/terms" className="underline">Terms of Service</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA */}
      {/* ============================================================ */}
      <section className="py-16 px-5 bg-[#FFFBF5] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] mb-4">
            One Evening.<br />
            <span className="text-amber-600">A Career&apos;s Worth of AI Skills.</span>
          </h2>
          <p className="font-body text-[#78716C] mb-8 max-w-lg mx-auto">
            Your colleagues are already learning this. The companies hiring in 2026 expect AI skills.
            Don&apos;t wait until it&apos;s mandatory — get ahead now, for free.
          </p>
          <a
            href="#waitlist"
            onClick={() => trackCtaClicked('Join the Waitlist', 'final_cta')}
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-body font-black text-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            Join the Waitlist
          </a>
          <p className="font-body text-[#A8A29E] text-sm mt-4">
            Free in-person workshop &middot; Small groups only &middot; Delaware &amp; Greater Philadelphia area
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="py-8 bg-[#1C1917] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-display text-base font-bold text-white mb-2">
            Learn & Leverage <span className="text-amber-400">AI</span>
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <a href="mailto:info@learnandleverageai.com" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">info@learnandleverageai.com</a>
          </div>
          <div className="flex items-center justify-center gap-4 mb-3">
            <a href="/terms" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
            <span className="text-gray-600">|</span>
            <a href="/privacy" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
          </div>
          <p className="font-body text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Learn & Leverage AI. All rights reserved.
          </p>
          <p className="font-body text-[10px] text-gray-700 mt-2">
            Learn &amp; Leverage AI is a service of Dude Ventures Services LLC &middot; Dover, DE
          </p>
        </div>
      </footer>
    </div>
  );
}
