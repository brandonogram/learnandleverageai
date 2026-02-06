'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function ConciergePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What does the discovery call look like?",
      a: "A 30-minute conversation where I learn about your workflow, tools, and biggest time drains. No pitch — just questions. If we're a fit, I'll send a custom blueprint of exactly what I'd build and how it maps to your daily life."
    },
    {
      q: "Do you work in-person or virtually?",
      a: "Both. Build days can happen at your office or over Zoom. Virtual clients get the same white-glove experience with screen sharing, recorded walkthroughs, and real-time collaboration. Most clients prefer virtual — it's just as effective and we can start faster."
    },
    {
      q: "How do you handle data security and privacy?",
      a: "Every engagement starts with a mutual NDA. I use enterprise-grade tools, never store your data on personal devices, and build systems that keep your information within platforms you already trust (Gmail, Notion, Slack, etc.). Your data stays yours."
    },
    {
      q: "Will my EA or chief of staff be able to use these systems?",
      a: "Absolutely — that's the goal. Every system I build comes with recorded walkthroughs and plain-English documentation. For Tier 2 and 3 clients, I train your team directly and make sure they're comfortable before I step back."
    },
    {
      q: "How do you measure ROI?",
      a: "During the discovery call, we identify your biggest time drains and put rough hour estimates on each. After the build, I track which workflows are being used and how often. Tier 3 clients get quarterly ROI audits with concrete numbers — hours saved, tasks automated, and estimated dollar value of reclaimed time."
    },
    {
      q: "How is this different from hiring a virtual assistant?",
      a: "A VA handles tasks one at a time, during working hours, and needs constant direction. AI systems handle entire categories of tasks automatically, 24/7, with no supervision. I build the systems — then your VA or EA becomes 10x more effective using them. It's not either/or. It's both."
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <span className="font-display text-lg font-semibold text-[#1C1917]">Learn &amp; Leverage AI</span>
          <a
            href="#apply"
            className="bg-[#1C1917] hover:bg-amber-600 text-white font-body font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-sm"
          >
            Apply Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 bg-[#FFFBF5]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-200/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-200/30 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative text-center">
          <div className="animate-fade-up flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-body text-sm font-medium">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              By Application Only
            </div>
          </div>

          <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#1C1917] leading-[1.1] max-w-4xl mx-auto mb-6">
            Stop Learning About AI.
            <span className="block text-amber-600 relative inline-block line-draw mt-2">
              Start Using It.
            </span>
          </h1>

          <p className="animate-fade-up-delay-2 font-body text-xl sm:text-2xl text-[#57534E] max-w-3xl mx-auto mb-12 leading-relaxed">
            I show up, learn your world, and build custom AI systems that save you 10+ hours a week — so you can focus on the work that actually matters.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="#apply"
              className="group inline-flex items-center gap-3 bg-[#1C1917] text-white px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Apply for a Discovery Call
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Credibility bar */}
          <div className="animate-fade-up-delay-4 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {['Former JPMorgan Chase', 'Former DuPont', 'Business Owner', 'AI Systems Builder'].map((tag, i) => (
              <span key={i} className="bg-white/60 backdrop-blur-sm text-[#57534E] font-body text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">The Problem</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4 mb-6">
              You Keep Hearing About AI.<br />You Know It Matters.<br />You Just Don&apos;t Have 40 Hours to Figure It Out.
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                text: "You've tried ChatGPT. It's impressive for a party trick. But you don't have time to figure out how to actually wire it into your daily workflow.",
                icon: (
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                text: "You know AI could help with email, scheduling, research, meeting prep — but nobody trustworthy is offering to just come build it for you.",
                icon: (
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                text: "You've seen the AI consultants and agencies. Most are selling you their SaaS product, not building systems around YOUR life.",
                icon: (
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )
              },
              {
                text: "You'd happily pay someone $5-10k to make this problem go away — if you could find someone who actually gets it.",
                icon: (
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-body text-[#57534E] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">The Solution</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4 mb-6">
              I Show Up. I Learn Your World.<br />I Build Your AI Systems.
            </h2>
            <p className="font-body text-lg text-[#57534E] max-w-3xl mx-auto">
              Three levels of service, depending on how deep you want to go.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="bg-[#FFFBF5] rounded-2xl p-8 border border-amber-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300">
              <div className="font-body text-amber-600 text-sm font-semibold uppercase tracking-wider mb-3">Tier 1</div>
              <h3 className="font-display text-2xl font-medium text-[#1C1917] mb-2">AI Jumpstart</h3>
              <p className="font-body text-[#57534E] mb-6 leading-relaxed text-sm">
                One full day. 3-5 custom AI workflows built around your actual work.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "60-min discovery call beforehand",
                  "Full-day working session (6-8 hrs)",
                  "Audit of current workflow",
                  "3-5 custom AI workflows built",
                  "Recorded walkthrough of everything",
                  "30 days Slack/text support",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-[#57534E]">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-amber-100">
                <span className="font-display text-3xl font-medium text-[#1C1917]">$5,000</span>
                <span className="font-body text-[#78716C] ml-2 text-sm">one-time</span>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#1C1917] rounded-2xl p-8 border border-[#1C1917] relative shadow-xl">
              <div className="absolute -top-3 left-8">
                <span className="bg-amber-400 text-[#1C1917] font-body text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <div className="font-body text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Tier 2</div>
              <h3 className="font-display text-2xl font-medium text-white mb-2">AI Operating System</h3>
              <p className="font-body text-gray-400 mb-6 leading-relaxed text-sm">
                Complete AI infrastructure, built over 2-4 weeks with ongoing support.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Everything in Tier 1",
                  "Personal CRM / relationship intelligence",
                  "Content creation engine",
                  "Decision support / morning dashboard",
                  "Custom AI agents for recurring tasks",
                  "Full documentation + 60 days support",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-gray-300">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/10">
                <span className="font-display text-3xl font-medium text-white">$15,000</span>
                <span className="font-body text-gray-500 ml-2 text-sm">+ $1,500/mo</span>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#FFFBF5] rounded-2xl p-8 border border-amber-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300">
              <div className="font-body text-amber-600 text-sm font-semibold uppercase tracking-wider mb-3">Tier 3</div>
              <h3 className="font-display text-2xl font-medium text-[#1C1917] mb-2">Fractional AI Chief of Staff</h3>
              <p className="font-body text-[#57534E] mb-6 leading-relaxed text-sm">
                I become part of your team. Proactive, always building, always optimizing.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Full Tier 2 build in months 1-2",
                  "Weekly 30-min check-ins",
                  "Proactive new workflow builds",
                  "On-call for ad-hoc requests",
                  "Team training (EA, chief of staff)",
                  "Quarterly AI audit + ROI measurement",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-[#57534E]">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-amber-100">
                <span className="font-display text-3xl font-medium text-[#1C1917]">$5,000</span>
                <span className="font-body text-[#78716C] ml-2 text-sm">/month (6-mo min)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">What Changes</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4">
              Outcomes, Not Technology
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Never write a routine email again",
                desc: "AI drafts responses in your voice. You review and send — or let it handle the obvious ones automatically.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                )
              },
              {
                title: "Walk into every meeting prepared",
                desc: "Automatic research on every attendee. Briefing docs generated before you even open your calendar.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                )
              },
              {
                title: "Search everything you've ever read or written",
                desc: "A personal knowledge base that actually works. Ask it questions in plain English and get answers from your own notes, docs, and emails.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                )
              },
              {
                title: "Turn voice memos into action",
                desc: "Record a thought on your phone. AI routes it — task to your to-do list, reply to your email, event to your calendar. Automatically.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                )
              },
              {
                title: "Start every morning briefed",
                desc: "A custom daily digest: your priorities, key news in your industry, follow-ups due, and anything that needs your attention today.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )
              },
              {
                title: "Reclaim 10-20 hours a week",
                desc: "Not by working less. By eliminating the repetitive admin that drains your energy and keeps you from high-value work.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-medium text-[#1C1917] mb-2">{item.title}</h3>
                <p className="font-body text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">How It Works</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4">
              Five Steps. Zero Complexity.
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                num: "01",
                title: "Apply",
                desc: "Fill out a short application so I understand your world before we ever speak. Takes 2 minutes."
              },
              {
                num: "02",
                title: "Discovery Call",
                desc: "A 30-minute conversation where I learn your workflow, tools, pain points, and goals. No pitch. Just questions."
              },
              {
                num: "03",
                title: "Blueprint",
                desc: "I send you a custom blueprint: exactly what I'd build, how it works, and what it'll cost. You decide if it makes sense."
              },
              {
                num: "04",
                title: "Build Day",
                desc: "I build your systems — in person or over Zoom. You watch, you learn, you start using them that same day."
              },
              {
                num: "05",
                title: "Ongoing Support (Optional)",
                desc: "Slack access for questions, a follow-up call at Day 14, and the option to continue with a monthly retainer for new automations and optimization."
              },
            ].map((item, i) => (
              <div key={i} className="group flex gap-6 p-6 rounded-2xl hover:bg-[#FFFBF5] transition-colors duration-300 border border-transparent hover:border-amber-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                    <span className="font-display text-lg font-medium text-amber-600">{item.num}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-[#1C1917] mb-2">{item.title}</h3>
                  <p className="font-body text-[#57534E] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
                  "You're a founder, CEO, or executive earning $500k+ and your time is your scarcest resource",
                  "You're technically curious but not technical — and that's fine",
                  "You've tried ChatGPT but haven't figured out how to wire it into your actual workflow",
                  "You'd pay $5-10k tomorrow if someone trustworthy would just handle it",
                  "You want systems that work quietly in the background, not another app to manage",
                  "You value discretion, quality, and someone who understands your world"
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
                  "People looking for a cheap chatbot or off-the-shelf product",
                  "Anyone expecting AI to replace their team — this augments, not replaces",
                  "Tire-kickers who aren't ready to invest in real infrastructure",
                  "Technical users who want to build it themselves (you don't need me)",
                  "Anyone looking for a quick fix — this is about building lasting systems"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-gray-400">
                    <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-body text-gray-400 text-sm">
                  Not quite ready for high-touch AI consulting? Check out our{' '}
                  <a href="/event" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors">
                    $47 AI workshop
                  </a>{' '}
                  — a great starting point for understanding what&apos;s possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Brandon */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">Your AI Architect</span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4">
              Meet Brandon Calloway
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-[#1C1917] to-[#292524] flex items-center justify-center shadow-xl">
                <span className="font-display text-6xl text-amber-400">BC</span>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl font-medium text-[#1C1917] mb-3">Brandon Calloway</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Former JPMorgan Chase', 'Former DuPont', 'Business Owner', 'AI Systems Builder'].map((tag, i) => (
                  <span key={i} className="bg-[#1C1917] text-white font-body text-xs font-semibold px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-4 font-body text-[#57534E] leading-relaxed">
                <p>
                  I&apos;ve sat in boardrooms at Fortune 100 companies and I&apos;ve managed crews in the field. I spent years at JPMorgan Chase and DuPont learning how large organizations think about operations, efficiency, and technology — then I went out and built my own businesses.
                </p>
                <p>
                  That combination is what makes this work. I don&apos;t build flashy demos. I build systems that fit into the way you actually work — your email, your calendar, your tools, your voice. The technology disappears. The time savings don&apos;t.
                </p>
                <p>
                  Every system I build is tailored. I don&apos;t use templates. I learn your workflow, your communication style, your priorities — and I build around them. When we&apos;re done, it feels less like you adopted new technology and more like you hired an impossibly efficient assistant who never sleeps.
                </p>
              </div>
              <blockquote className="mt-6 font-display text-lg text-[#1C1917] italic border-l-4 border-amber-400 pl-4">
                &ldquo;I speak both languages — boardroom strategy and hands-on building. That&apos;s the gap most AI consultants can&apos;t bridge.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Builds — Proof of Work */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">Real Builds</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4 mb-4">
              What a Build Day Actually Looks Like
            </h2>
            <p className="font-body text-lg text-[#57534E] max-w-2xl mx-auto">
              Every engagement is different. Here are three recent examples of what I built in a single working session.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                client: "Startup CEO",
                industry: "SaaS, 40-person team",
                problem: "Spending 3+ hours/day on email. Missing follow-ups. Walking into meetings cold.",
                built: [
                  "AI email drafting trained on 6 months of sent mail",
                  "Auto meeting prep with attendee research + briefing doc",
                  "Morning digest: priorities, follow-ups, calendar preview",
                ],
                result: "Went from 3 hours of email to 40 minutes. Hasn't missed a follow-up since.",
              },
              {
                client: "Managing Partner",
                industry: "Private equity fund",
                problem: "Deal flow notes scattered across Notion, email, and voice memos. No way to search or connect the dots.",
                built: [
                  "Personal knowledge base indexing Notion, Gmail, and Drive",
                  "Voice memo → task/email/calendar routing",
                  "Weekly deal flow digest with AI-generated summaries",
                ],
                result: "Can now ask 'What did I learn about [company] last quarter?' and get an answer in seconds.",
              },
              {
                client: "Founder & Creator",
                industry: "Media company, 500k+ audience",
                problem: "Content creation bottleneck. Great ideas, no time to produce. EA drowning in admin.",
                built: [
                  "Content engine: voice memo → draft tweet/newsletter/LinkedIn post",
                  "EA dashboard with automated triage and scheduling",
                  "Audience research agent pulling trending topics daily",
                ],
                result: "Content output doubled. EA reclaimed 12 hours/week. Zero new hires needed.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1C1917] flex items-center justify-center">
                    <span className="font-display text-sm text-amber-400 font-medium">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-[#1C1917] text-sm">{item.client}</div>
                    <div className="font-body text-xs text-[#78716C]">{item.industry}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-body text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-1">The Problem</div>
                  <p className="font-body text-sm text-[#57534E] leading-relaxed">{item.problem}</p>
                </div>
                <div className="mb-4">
                  <div className="font-body text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-2">What I Built</div>
                  <ul className="space-y-1.5">
                    {item.built.map((b, j) => (
                      <li key={j} className="flex gap-2 font-body text-sm text-[#57534E]">
                        <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-body text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Result</div>
                  <p className="font-body text-sm text-[#1C1917] font-medium leading-relaxed">{item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="font-body text-amber-400 font-semibold uppercase tracking-wider text-sm">Investment</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-6">
              Choose Your Level
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Tier 1 Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-xl font-medium text-white mb-1">AI Jumpstart</h3>
              <p className="font-body text-gray-500 text-sm mb-4">One day. Immediate impact.</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-medium text-white">$5,000</span>
                <span className="font-body text-gray-500 text-sm ml-1">one-time</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Full-day build session",
                  "3-5 custom workflows",
                  "30 days support",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-gray-400">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#apply" className="block text-center font-body font-semibold text-sm text-white border border-white/20 hover:border-amber-400/50 hover:text-amber-400 py-3 rounded-xl transition-colors">
                Apply Now
              </a>
            </div>

            {/* Tier 2 Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-400/30 relative">
              <div className="absolute -top-3 left-8">
                <span className="bg-amber-400 text-[#1C1917] font-body text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h3 className="font-display text-xl font-medium text-white mb-1">AI Operating System</h3>
              <p className="font-body text-gray-500 text-sm mb-4">Full infrastructure. Ongoing support.</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-medium text-white">$15,000</span>
                <span className="font-body text-gray-500 text-sm ml-1">+ $1,500/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Everything in Tier 1",
                  "CRM + content engine",
                  "Custom AI agents",
                  "60 days priority support",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-gray-400">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#apply" className="block text-center font-body font-semibold text-sm text-[#1C1917] bg-amber-400 hover:bg-amber-300 py-3 rounded-xl transition-colors">
                Apply Now
              </a>
            </div>

            {/* Tier 3 Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-xl font-medium text-white mb-1">Fractional AI Chief of Staff</h3>
              <p className="font-body text-gray-500 text-sm mb-4">Embedded AI partner.</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-medium text-white">$5,000</span>
                <span className="font-body text-gray-500 text-sm ml-1">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Full Tier 2 build included",
                  "Weekly check-ins",
                  "Proactive new builds",
                  "Quarterly ROI audit",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-gray-400">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#apply" className="block text-center font-body font-semibold text-sm text-white border border-white/20 hover:border-amber-400/50 hover:text-amber-400 py-3 rounded-xl transition-colors">
                Apply Now
              </a>
            </div>
          </div>

          {/* ROI Math */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 text-center">
            <h3 className="font-display text-2xl font-medium text-white mb-4">The Math</h3>
            <p className="font-body text-gray-400 leading-relaxed max-w-2xl mx-auto mb-6">
              If you earn $500k/year, your time is worth ~$250/hour. A system that saves you 10 hours a week reclaims <span className="text-amber-400 font-semibold">$130,000/year</span> in productive time.
            </p>
            <p className="font-body text-gray-400 leading-relaxed max-w-2xl mx-auto">
              At $1M+, that number doubles. At $5M+, it&apos;s <span className="text-amber-400 font-semibold">$520,000+/year</span>. The AI Jumpstart pays for itself in the first week.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">FAQ</span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4">
              Common Questions
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

      {/* Workshop On-Ramp */}
      <section className="py-12 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-amber-100 shadow-lg shadow-amber-100/20 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="font-display text-xl font-medium text-[#1C1917] mb-2">Not ready for a $5k engagement?</h3>
              <p className="font-body text-[#57534E] text-sm leading-relaxed">
                Start with our <strong>$47 live workshop</strong> — a 60-minute session where you&apos;ll learn what AI actually is, how it applies to your work, and whether a deeper engagement makes sense. No commitment, no pressure.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="/event"
                className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-body font-semibold text-sm px-5 py-3 rounded-xl border border-amber-200 transition-colors whitespace-nowrap"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Discovery Call - GHL Calendar */}
      <section id="apply" className="py-20 bg-gradient-to-b from-[#1C1917] to-[#292524] text-white relative overflow-hidden scroll-mt-14">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="font-body text-amber-400 font-semibold uppercase tracking-wider text-sm">Get Started</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-4">
              Book a Discovery Call
            </h2>
            <p className="font-body text-gray-400 text-lg">
              30 minutes. No pitch. Just a conversation to see if we&apos;re a fit.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <iframe
              src="https://link.boothlaunchpad.com/widget/booking/6KYJXNGIRfCN1WhvYZff"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '650px' }}
              scrolling="no"
              id="concierge_booking_calendar"
              title="Book a Discovery Call"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="font-body text-gray-500 text-sm mb-3">Prefer to reach out directly?</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="tel:+13024209576" className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors font-body font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (302) 420-9576
              </a>
              <a href="mailto:brandon@learnandleverageai.com" className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors font-body font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brandon@learnandleverageai.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GHL Calendar Embed Script */}
      <Script
        src="https://link.boothlaunchpad.com/js/form_embed.js"
        strategy="lazyOnload"
      />

      {/* Footer */}
      <section className="py-12 bg-[#1C1917] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-white mb-1">Questions before applying?</h3>
              <p className="font-body text-gray-500">I respond personally within 24 hours.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 font-body">
              <a href="tel:+13024209576" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (302) 420-9576
              </a>
              <a href="mailto:brandon@learnandleverageai.com" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brandon@learnandleverageai.com
              </a>
              <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                learnandleverageai.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="font-body text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Learn &amp; Leverage AI. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
