'use client';

import { useState } from 'react';

export default function EventPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    question: ''
  });

  const faqs = [
    {
      q: "Do I need any technical background?",
      a: "Absolutely not. This presentation is specifically designed for business leaders who don't consider themselves technical. If you can use email and a smartphone, you have all the tech skills required."
    },
    {
      q: "Is this just a sales pitch for AI software?",
      a: "No. We're not affiliated with any AI vendor, and we don't sell software. This is educational content designed to help you make informed decisions—including the decision to wait or do nothing if that's right for your business."
    },
    {
      q: "Will this still be relevant to my specific industry?",
      a: "Yes. The principles we cover apply across industries. We use diverse examples (professional services, retail, manufacturing, healthcare administration, etc.), and the Q&A portion allows you to ask industry-specific questions."
    },
    {
      q: "What if I can't attend live?",
      a: "While live attendance is strongly encouraged (for the Q&A), registered attendees will receive a recording within 24 hours. However, space is limited for live attendance due to Q&A capacity."
    },
    {
      q: "I've been burned by 'tech solutions' before. How is this different?",
      a: "This isn't a solution—it's an education. We have no product to sell. Our only goal is to give you the understanding you need to evaluate AI opportunities (and spot AI hype) on your own. Skepticism is welcome and encouraged."
    },
    {
      q: "Is AI really relevant for smaller businesses?",
      a: "Some of the most powerful AI applications today are specifically designed for small and mid-size businesses—and many are surprisingly affordable or even free. The playing field is more level than you might think."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for registering! Check your email for confirmation.');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
              Free Live Event — Limited Seats
            </div>
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center text-[#1C1917] leading-[1.1] max-w-5xl mx-auto mb-6">
            Your Competitors Are Using AI.
            <span className="block text-amber-600 relative inline-block line-draw mt-2">
              Are You?
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 font-body text-xl sm:text-2xl text-[#57534E] text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            In 60 minutes, discover exactly how AI can help your business—explained in plain English, not tech jargon.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#register"
              className="group inline-flex items-center gap-3 bg-[#1C1917] text-white px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Reserve Your Free Seat
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <span className="font-body text-[#78716C] text-sm">No credit card required</span>
          </div>

          {/* Social proof stats */}
          <div className="animate-fade-up-delay-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { stat: '68%', label: 'of businesses now use AI' },
              { stat: '5-20hrs', label: 'saved per week' },
              { stat: '40%', label: 'efficiency improvement' },
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
              Let&apos;s Be Honest: The AI Conversation Has Left You Behind
            </h2>
          </div>

          <div className="space-y-6 font-body text-lg text-[#57534E] leading-relaxed">
            <p>
              Every day, there&apos;s another headline. Another &ldquo;revolutionary&rdquo; tool. Another 25-year-old telling you that AI will transform everything.
            </p>
            <p>And every day, you have the same questions:</p>
          </div>

          <div className="mt-10 space-y-4">
            {[
              { q: "What does AI actually do for a business like mine?", note: "Not a tech startup. A real business." },
              { q: "Is this another fad like NFTs and the metaverse?", note: "Remember when everyone said you had to be on Clubhouse?" },
              { q: "Am I already too late?", note: "Your competitors seem to know something you don't." },
              { q: "Where do I even start?", note: "Without hiring engineers or going back to school." },
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
              You&apos;ve built a successful business through hard work, relationships, and good judgment—not by chasing every shiny new technology.
            </p>
            <p className="font-display text-xl text-[#1C1917] font-medium">
              But this time feels different.
            </p>
            <div className="mt-6 flex items-center gap-3 text-amber-700 font-body font-semibold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              68% of businesses are now using AI in some form.
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="font-body text-amber-400 font-semibold uppercase tracking-wider text-sm">The Solution</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-6">
              AI Explained for Decision-Makers,<br />Not Developers
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <p className="font-display text-2xl md:text-3xl text-amber-300 mb-6 leading-relaxed">
              &ldquo;AI for Business: A Practical Guide&rdquo;
            </p>
            <p className="font-body text-lg text-gray-300 mb-8 leading-relaxed">
              A 60-minute live presentation designed specifically for experienced business leaders who need clarity, not complexity.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "No jargon",
                "No hype",
                "No pressure to buy",
                "No tech background needed"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-body text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <p className="font-body text-gray-400 mt-8 text-center italic">
              This is the briefing you wish someone had given you six months ago.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">What You&apos;ll Learn</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] mt-4">
              Walk Away With Answers,<br />Not More Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "The 3 Types of AI That Actually Matter for Business",
                desc: "Forget the 47 categories the tech world invented. There are only three you need to understand. We'll break each one down with real examples."
              },
              {
                num: "02",
                title: "The \"15-Minute Test\" to Know If AI Can Help",
                desc: "A simple framework to evaluate any AI opportunity without needing a computer science degree."
              },
              {
                num: "03",
                title: "5 Ways Businesses Your Size Are Using AI Right Now",
                desc: "Not theoretical. Not \"someday.\" Actual use cases from companies with 10-500 employees, saving 5-20 hours per week."
              },
              {
                num: "04",
                title: "The Hidden Risks Nobody Talks About",
                desc: "Including the legal landmines, the security gaps, and the \"AI washing\" vendors hoping you won't ask about."
              },
              {
                num: "05",
                title: "Your 30-Day Starter Roadmap",
                desc: "A clear, low-risk plan to test AI in your business without betting the farm or hiring specialists."
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
              Plus: Live Q&A where you can ask YOUR specific questions
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
                  "You own or lead a business (small to mid-size) and want to understand AI strategically",
                  "You're skeptical but open-minded—you want proof, not promises",
                  "You consider yourself \"not a tech person\"",
                  "You're concerned about falling behind competitors",
                  "You value your time and want essential info, not a 4-hour seminar",
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
                  "Tech enthusiasts who already understand AI—you'll be bored",
                  "People looking for a sales pitch—we don't sell software",
                  "Anyone wanting a \"get rich quick\" scheme",
                  "Tire-kickers with no intention of applying what they learn",
                  "Developers or engineers—this is business strategy, not coding"
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
                Seats are limited. Please only register if you&apos;re serious.
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
              About Your Presenter
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
              <p className="font-body text-[#57534E] leading-relaxed mb-4">
                Brandon helps business owners understand and implement AI—without the complexity. After watching too many smart business owners get overwhelmed, overcharged, or simply ignored by the tech industry, he created this presentation to bridge the gap.
              </p>
              <blockquote className="font-display text-lg text-amber-700 italic border-l-4 border-amber-300 pl-4">
                &ldquo;My job isn&apos;t to convince you AI is the answer. My job is to help you understand what questions to ask.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-amber-600 font-semibold uppercase tracking-wider text-sm">What People Are Saying</span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4">
              Business Leaders Who&apos;ve Attended
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I came in skeptical and left with three specific ideas I implemented that same week. This is the first tech presentation I've attended that actually respected my time and intelligence.",
                name: "Michael R.",
                title: "Owner, Regional HVAC Company"
              },
              {
                quote: "Finally, someone who speaks my language. No buzzwords, no pressure, just clarity. I wish I'd found this six months ago.",
                name: "Patricia S.",
                title: "CEO, Professional Services Firm"
              },
              {
                quote: "I've been in business for 30 years and always considered myself behind on technology. After this session, I finally feel like I understand what AI is and isn't.",
                name: "Robert T.",
                title: "Owner, Manufacturing Business"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg shadow-amber-100/30 border border-amber-50">
                <svg className="w-8 h-8 text-amber-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
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

          {/* Stats bar */}
          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border border-amber-100">
            {[
              { stat: "68%", label: "of businesses now use AI", source: "McKinsey, 2024" },
              { stat: "77%", label: "of executives struggle with AI decisions", source: "Accenture" },
              { stat: "40%", label: "average efficiency improvement", source: "" },
              { stat: "23%", label: "have a clear AI strategy", source: "Opportunity gap" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-semibold text-amber-600">{item.stat}</div>
                <div className="font-body text-sm text-[#57534E] mt-1">{item.label}</div>
                {item.source && <div className="font-body text-xs text-[#A8A29E] mt-1">{item.source}</div>}
              </div>
            ))}
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
      <section id="register" className="py-20 bg-gradient-to-b from-[#1C1917] to-[#292524] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="font-body text-amber-400 font-semibold uppercase tracking-wider text-sm">Register Now</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-4">
              Secure Your Seat
            </h2>
            <p className="font-body text-gray-400 text-lg">
              Limited to 50 attendees to ensure quality Q&A interaction
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Event details */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-100">
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Duration</div>
                <div className="font-display text-xl text-[#1C1917] font-medium">60 Minutes</div>
              </div>
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Format</div>
                <div className="font-display text-xl text-[#1C1917] font-medium">Live Online</div>
              </div>
              <div className="text-center p-4 bg-[#FFFBF5] rounded-xl">
                <div className="font-body text-sm text-[#78716C] mb-1">Cost</div>
                <div className="font-display text-xl text-amber-600 font-medium">FREE</div>
              </div>
            </div>

            {/* Registration form */}
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
                  <label htmlFor="role" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow"
                    placeholder="Owner, CEO, VP..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="question" className="block font-body text-sm font-medium text-[#57534E] mb-2">
                  What&apos;s your biggest question about AI? (optional)
                </label>
                <textarea
                  id="question"
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow resize-none"
                  placeholder="We'll try to address it during the session..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-body font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
              >
                Reserve My Free Seat
              </button>

              <p className="font-body text-center text-sm text-[#A8A29E]">
                By registering, you&apos;ll receive event details and a reminder email. No spam, ever.
              </p>
            </form>
          </div>

          {/* Why free */}
          <div className="mt-12 text-center">
            <h3 className="font-display text-xl text-white mb-3">Why Free?</h3>
            <p className="font-body text-gray-400 max-w-2xl mx-auto">
              Because everyone deserves access to clear, practical information about AI—not just businesses that can afford expensive consultants. Informed business leaders make better decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1C1917] mb-4">
            Still Uncertain?
          </h2>
          <p className="font-body text-lg text-[#57534E] mb-8">
            In the next 60 minutes, you could scroll through another confusing article about AI, or you could get the clarity you need to make confident decisions.
          </p>
          <p className="font-display text-xl text-amber-600 mb-8">
            Your competitors aren&apos;t waiting.
          </p>
          <a
            href="#register"
            className="inline-flex items-center gap-3 bg-[#1C1917] text-white px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-black/10"
          >
            Register Now — It&apos;s Free
          </a>
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
              <a href="mailto:brandonbot67@gmail.com" className="flex items-center gap-2 text-[#57534E] hover:text-amber-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                brandonbot67@gmail.com
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
              © {new Date().getFullYear()} Learn & Leverage AI. All rights reserved. This event is for educational purposes only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
