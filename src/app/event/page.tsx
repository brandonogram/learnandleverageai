'use client';

import { useState } from 'react';

// ── Configure event details here ──────────────────────────────────
const EVENT_DATE = 'February 20, 2026';
const EVENT_TIME = '2:00 PM';
const EVENT_TIMEZONE = 'EST';
const TOTAL_SEATS = 50;
const SEATS_REMAINING = 17;
const EVENT_PRICE = 47;

export default function EventPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    question: ''
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactState, setContactState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const faqs = [
    {
      q: "Do I need any technical background?",
      a: "Absolutely not. This presentation is specifically designed for home service business owners who don't consider themselves technical. If you can use email and a smartphone, you have all the tech skills required."
    },
    {
      q: "Is this just a sales pitch for AI software?",
      a: "No. This is educational content designed to help you make informed decisions—including the decision to wait or do nothing if that's right for your business. We'll show you what's working for other home service companies and let you decide what makes sense."
    },
    {
      q: "Will this apply to MY type of business?",
      a: "Yes. We cover real examples from HVAC, plumbing, electrical, pool service, landscaping, roofing, and other home service businesses. The Q&A portion lets you ask questions specific to your trade."
    },
    {
      q: "What if I can't attend live?",
      a: "While live attendance is strongly encouraged (for the Q&A), registered attendees will receive a recording within 24 hours. However, space is limited for live attendance due to Q&A capacity."
    },
    {
      q: "I've been burned by 'tech solutions' before. How is this different?",
      a: "This isn't a product demo or a vendor pitch. It's education. Brandon has owned businesses himself—he's been in your shoes. The goal is to help you understand AI well enough to make your own decisions, including the decision to wait if that's what makes sense."
    },
    {
      q: "Is AI really relevant for a small or mid-size business?",
      a: "Yes—and in many ways it's even more impactful for smaller businesses. Many of the most powerful AI tools are affordable or even free. The playing field is more level than you might think, and the businesses that learn to leverage AI now will have a significant advantage."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Registration failed');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!res.ok) throw new Error('Contact request failed');
      setContactState('success');
    } catch {
      setContactState('error');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span className="font-display text-lg font-semibold text-[#1C1917]">Learn &amp; Leverage AI</span>
          <a
            href="#register"
            className="bg-amber-500 hover:bg-amber-600 text-white font-body font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-sm"
          >
            Save My Spot
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-200/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-200/30 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative">
          {/* Event badge */}
          <div className="animate-fade-up flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-body text-sm font-medium">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Live Event — {EVENT_DATE} at {EVENT_TIME} {EVENT_TIMEZONE} &middot; ${EVENT_PRICE}
            </div>
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center text-[#1C1917] leading-[1.1] max-w-5xl mx-auto mb-6">
            Learn AI. Then Use It to
            <span className="block text-amber-600 relative inline-block line-draw mt-2">
              Grow Your Business.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 font-body text-xl sm:text-2xl text-[#57534E] text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            In 60 minutes, learn what AI actually is, how it applies to your business, and how to start using it—explained in plain English, not tech jargon.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="#register"
              className="group inline-flex items-center gap-3 bg-[#1C1917] text-white px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Reserve My Spot — ${EVENT_PRICE}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <p className="animate-fade-up-delay-3 text-center font-body text-amber-700 font-medium text-sm mb-16">
            Only {SEATS_REMAINING} of {TOTAL_SEATS} spots remaining
          </p>

          {/* Social proof stats */}
          <div className="animate-fade-up-delay-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { stat: '68%', label: 'of businesses now use AI' },
              { stat: '10-20hrs', label: 'saved per week with AI' },
              { stat: '40%', label: 'average efficiency gain' },
              { stat: '60min', label: 'is all you need' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-100">
                <div className="font-display text-3xl sm:text-4xl font-semibold text-amber-600 mb-1">{item.stat}</div>
                <div className="font-body text-sm text-[#78716C]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">The Challenge</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4 mb-6">
              Everyone&apos;s Talking About AI. Nobody&apos;s Explaining It.
            </h2>
          </div>

          <div className="space-y-6 font-body text-lg text-[#57534E] leading-relaxed">
            <p>
              Every day there&apos;s a new headline about AI changing everything. Your competitors mention it. Your employees ask about it. But nobody has actually sat you down and explained what it is, what it does, and whether it matters for YOUR business.
            </p>
            <p>You keep running into the same questions:</p>
          </div>

          <div className="mt-10 space-y-4">
            {[
              { q: "What does AI actually do for a business like mine?", note: "Not a tech startup. A real business with real employees and real customers." },
              { q: "Is this another fad like NFTs and the metaverse?", note: "Or is this one actually different?" },
              { q: "Am I already too late to figure this out?", note: "Your competitors seem to know something you don't." },
              { q: "Where do I even start—without going back to school?", note: "That's exactly what this event will show you." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#FFFBF5] rounded-xl border-l-4 border-amber-400">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-display text-amber-600 font-semibold">?</span>
                </div>
                <div>
                  <p className="font-body text-[#1C1917] font-medium">&ldquo;{item.q}&rdquo;</p>
                  <p className="font-body text-sm text-[#78716C] mt-1 italic">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
            <p className="font-body text-lg text-[#57534E] mb-4">
              You&apos;ve built your business through hard work, good relationships, and smart decisions. You don&apos;t need to become a tech expert.
            </p>
            <p className="font-display text-xl text-[#1C1917] font-medium">
              You just need someone to explain AI in a way that actually makes sense—so you can decide what to do about it.
            </p>
            <div className="mt-6 flex items-center gap-3 text-amber-700 font-body font-semibold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              68% of businesses are already using AI in some form. The gap is growing every month.
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="font-body text-amber-400 font-semibold uppercase tracking-wider text-sm">The Solution</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-6">
              AI Explained for Business Owners,<br />Not IT Departments
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <p className="font-display text-2xl md:text-3xl text-amber-300 mb-6 leading-relaxed">
              &ldquo;Learn &amp; Leverage AI: A Practical Guide for Business Owners&rdquo;
            </p>
            <p className="font-body text-lg text-gray-300 mb-8 leading-relaxed">
              A 60-minute live session where you&apos;ll actually understand what AI is, see how businesses like yours are using it, and leave with a clear plan to start leveraging it yourself.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "No jargon — plain English only",
                "No pressure — education, not a sales pitch",
                "No tech skills needed",
                "Real examples from your industry"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-body text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-body text-gray-400 italic">
                This is the briefing you wish someone had given you six months ago.
              </p>
              <div className="font-body text-amber-400 font-semibold text-sm whitespace-nowrap">
                {EVENT_DATE} &middot; {EVENT_TIME} {EVENT_TIMEZONE}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">What You&apos;ll Learn</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4">
              Walk Away With a Plan,<br />Not More Confusion
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "What AI Actually Is (And Isn't) — In Plain English",
                desc: "Forget the hype. We'll break down what AI really means for business owners—the types that matter, how they work, and why this isn't just another tech fad like NFTs or the metaverse."
              },
              {
                num: "02",
                title: "5 Ways Real Businesses Are Using AI Right Now",
                desc: "Not theoretical. Not \"someday.\" Actual examples from companies like yours—automating admin work, improving customer communication, making smarter decisions, and freeing up 10-20 hours per week."
              },
              {
                num: "03",
                title: "The \"15-Minute Test\" to Know If AI Can Help Your Business",
                desc: "A simple framework you can use to evaluate any AI opportunity—so you can separate what's worth exploring from what's just noise. No computer science degree required."
              },
              {
                num: "04",
                title: "The Risks and Pitfalls Nobody Talks About",
                desc: "Including the legal exposure, data privacy concerns, and \"AI washing\" vendors hoping you won't ask tough questions. Know what to watch out for before you spend a dime."
              },
              {
                num: "05",
                title: "Your Personal 30-Day AI Starter Roadmap",
                desc: "Walk out with a clear, low-risk plan to start exploring AI in your business this month—without betting the farm, disrupting your team, or hiring a tech person."
              }
            ].map((item, i) => (
              <div key={i} className="group flex gap-6 p-6 rounded-2xl hover:bg-[#FFFBF5] transition-colors duration-300 border border-transparent hover:border-amber-100">
                <div className="flex-shrink-0">
                  <span className="font-display text-4xl font-light text-amber-300 group-hover:text-amber-500 transition-colors">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-[#1C1917] mb-2">{item.title}</h3>
                  <p className="font-body text-[#57534E] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-6 py-3 rounded-full font-body font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Plus: Live Q&amp;A to ask about YOUR specific business
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* For */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-amber-100/50 border border-amber-100">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-body font-medium text-sm mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                This Is For You If...
              </div>
              <ul className="space-y-4">
                {[
                  "You own or run a business and keep hearing about AI but don't really get it yet",
                  "You're curious but skeptical—you want proof, not promises",
                  "You consider yourself \"not a tech person\" and that's always been fine",
                  "You're concerned about falling behind competitors who seem to \"get it\"",
                  "You want practical answers in 60 minutes, not a 4-hour tech seminar",
                  "You make decisions and can actually implement what you learn"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-[#57534E]">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div className="bg-[#1C1917] rounded-3xl p-8 md:p-10 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 text-gray-300 px-4 py-2 rounded-full font-body font-medium text-sm mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                This Is NOT For...
              </div>
              <ul className="space-y-4">
                {[
                  "Tech enthusiasts who already use AI daily—you'll be bored",
                  "People looking for a sales pitch—we don't push products",
                  "Anyone expecting a \"get rich quick\" scheme",
                  "Developers or engineers—this is business strategy, not coding",
                  "Tire-kickers with no intention of applying what they learn"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-gray-400">
                    <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-gray-500 text-sm mt-6 italic">
                Only {SEATS_REMAINING} spots left. Please only register if you&apos;re serious.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Presenter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">Your Guide</span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4">
              Meet Brandon Calloway
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <span className="font-display text-6xl text-amber-400">BC</span>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl font-medium text-[#1C1917] mb-3">Brandon Calloway</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Former JPMorgan Chase', 'Former DuPont', 'Home Service Business Owner'].map((tag, i) => (
                  <span key={i} className="bg-amber-50 text-amber-700 font-body text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-body text-[#57534E] leading-relaxed mb-4">
                Brandon isn&apos;t a tech consultant who&apos;s never run a business. He&apos;s owned and operated pool service and landscaping companies—he knows what it&apos;s like to juggle operations, manage crews, and try to grow while putting out daily fires.
              </p>
              <p className="font-body text-[#57534E] leading-relaxed mb-4">
                With a background at JPMorgan Chase and DuPont, he brings Fortune 500 strategic thinking to small and mid-size businesses. Now he teaches business owners how to understand AI and helps them put it to work—practically, affordably, and without the jargon.
              </p>
              <blockquote className="font-display text-lg text-amber-700 italic border-l-4 border-amber-300 pl-4">
                &ldquo;My job isn&apos;t to convince you AI is the answer. My job is to help you understand it well enough to make your own informed decisions.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">Results</span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4">
              What Business Owners Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I came in thinking AI was just for big tech companies. Brandon showed me three things I could start using that week. I've already saved 10 hours a week on admin work alone.",
                name: "Michael R.",
                title: "Owner, Regional HVAC Company"
              },
              {
                quote: "I was skeptical—I'm not a tech person at all. But Brandon made it so simple to understand. For the first time, I actually feel like I know what AI is and how it could help my business.",
                name: "Patricia S.",
                title: "Owner, Plumbing & Electrical"
              },
              {
                quote: "I've been in business for 20 years and always felt behind on technology. After this session, I finally understand what AI is, what it isn't, and exactly where to start. Worth every minute.",
                name: "Robert T.",
                title: "Owner, Pool Service Company"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg shadow-amber-100/30 border border-amber-50">
                <svg className="w-8 h-8 text-amber-300 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-body text-[#57534E] mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <p className="font-body font-semibold text-[#1C1917]">{item.name}</p>
                  <p className="font-body text-sm text-[#78716C]">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Industries served */}
          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-amber-100">
            <p className="font-body text-sm text-[#78716C] text-center mb-4 uppercase tracking-wider font-semibold">Built for Home Service Businesses</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { icon: "🔧", label: "HVAC" },
                { icon: "🔩", label: "Plumbing" },
                { icon: "⚡", label: "Electrical" },
                { icon: "🏊", label: "Pool Service" },
                { icon: "🌿", label: "Landscaping" },
                { icon: "🏠", label: "Roofing" },
              ].map((item, i) => (
                <div key={i} className="text-center p-3">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-body text-sm text-[#57534E] font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">FAQ</span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4">
              Common Questions<br />(And Honest Answers)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-body font-medium text-[#1C1917] pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="p-5 pt-0 font-body text-[#57534E] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-gradient-to-b from-[#1C1917] to-[#292524] text-white relative overflow-hidden scroll-mt-14">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="font-body text-amber-400 font-semibold uppercase tracking-wider text-sm">Register Now</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-4">
              Secure Your Spot
            </h2>
            <p className="font-body text-gray-400 text-lg">
              Only {SEATS_REMAINING} of {TOTAL_SEATS} seats remaining for live Q&amp;A
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Event details */}
            <div className="grid sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-100">
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Date</div>
                <div className="font-display text-lg text-[#1C1917] font-medium">{EVENT_DATE.replace(', 2026', '')}</div>
              </div>
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Time</div>
                <div className="font-display text-lg text-[#1C1917] font-medium">{EVENT_TIME} {EVENT_TIMEZONE}</div>
              </div>
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Format</div>
                <div className="font-display text-lg text-[#1C1917] font-medium">Live Online</div>
              </div>
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Investment</div>
                <div className="font-display text-lg text-amber-600 font-medium">${EVENT_PRICE}</div>
              </div>
            </div>

            {formState === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-[#1C1917] font-medium mb-2">You&apos;re In!</h3>
                <p className="font-body text-[#57534E] mb-6">
                  Check your email for confirmation and calendar invite. See you on {EVENT_DATE}!
                </p>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 max-w-md mx-auto">
                  <p className="font-body text-sm text-amber-800 font-medium mb-3">
                    Want personalized guidance for your business?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 bg-[#1C1917] text-white px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-amber-600 transition-colors"
                    >
                      Request a Callback
                    </a>
                    <a
                      href="tel:+13024209576"
                      className="inline-flex items-center justify-center gap-2 border border-amber-300 text-amber-800 px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-amber-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (302) 420-9576
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="industry" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                      Industry
                    </label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow bg-white"
                    >
                      <option value="">Select your trade...</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Pool Service">Pool Service</option>
                      <option value="Landscaping">Landscaping</option>
                      <option value="Roofing">Roofing</option>
                      <option value="General Contractor">General Contractor</option>
                      <option value="Other Home Service">Other Home Service</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="question" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                    What&apos;s your biggest challenge right now? (optional)
                  </label>
                  <textarea
                    id="question"
                    rows={3}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="Understanding AI, saving time, staying competitive..."
                  />
                </div>

                {formState === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="font-body text-red-700 text-sm">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-body font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {formState === 'loading' ? 'Processing...' : `Reserve My Spot — $${EVENT_PRICE}`}
                </button>

                <p className="font-body text-center text-sm text-[#A8A29E]">
                  Secure checkout. You&apos;ll receive event details and a calendar invite immediately.
                </p>
              </form>
            )}
          </div>

          {/* Why this price */}
          <div className="mt-12 text-center">
            <h3 className="font-display text-xl text-white mb-3">Why ${EVENT_PRICE}?</h3>
            <p className="font-body text-gray-400 max-w-2xl mx-auto">
              We keep the price low so it&apos;s accessible to any business owner. But we do charge because it keeps the room full of people who are serious about learning—not just browsing. The result: a better experience, better Q&amp;A, and real conversations with real business owners.
            </p>
          </div>
        </div>
      </section>

      {/* Request a Callback */}
      <section id="contact" className="py-16 bg-[#FFFBF5] scroll-mt-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">Free Strategy Call</span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1C1917] mt-4 mb-4">
              Want Expert Help With AI?
            </h2>
            <p className="font-body text-[#57534E]">
              Request a free callback and we&apos;ll map out exactly how AI applies to your specific business—no obligation, no pressure.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-amber-100/30 border border-amber-100">
            {contactState === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-[#1C1917] font-medium mb-2">Request Received!</h3>
                <p className="font-body text-[#57534E]">
                  We&apos;ll be in touch within 24 hours to schedule your free strategy call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    required
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                    Tell us about your business (optional)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="What industry are you in? What are you hoping AI can help with?"
                  />
                </div>

                {contactState === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="font-body text-red-700 text-sm">Something went wrong. Please try again or call us at (302) 420-9576.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactState === 'loading'}
                  className="w-full bg-[#1C1917] hover:bg-amber-600 disabled:bg-gray-400 text-white font-body font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-amber-500/25 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {contactState === 'loading' ? 'Sending...' : 'Request a Free Callback'}
                </button>
                <p className="font-body text-center text-sm text-[#A8A29E]">
                  We&apos;ll reach out within 24 hours. No spam, no pressure.
                </p>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="font-body text-[#78716C] text-sm mb-3">Prefer to reach out directly?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+13024209576" className="inline-flex items-center gap-2 text-[#57534E] hover:text-amber-600 transition-colors font-body font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (302) 420-9576
              </a>
              <a href="mailto:brandon@learnandleverageai.com" className="inline-flex items-center gap-2 text-[#57534E] hover:text-amber-600 transition-colors font-body font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brandon@learnandleverageai.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-[#1C1917] mb-1">Questions before registering?</h3>
              <p className="font-body text-[#78716C]">We respond within 24 hours.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 font-body">
              <a href="tel:+13024209576" className="flex items-center gap-2 text-[#57534E] hover:text-amber-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (302) 420-9576
              </a>
              <a href="mailto:brandon@learnandleverageai.com" className="flex items-center gap-2 text-[#57534E] hover:text-amber-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brandon@learnandleverageai.com
              </a>
              <a href="https://learnandleverageai.com" className="flex items-center gap-2 text-[#57534E] hover:text-amber-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                learnandleverageai.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="font-body text-sm text-[#A8A29E]">
              &copy; {new Date().getFullYear()} Learn &amp; Leverage AI. All rights reserved. This event is for educational purposes only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
