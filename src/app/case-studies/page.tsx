import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies | Learn & Leverage AI",
  description: "Real AI builds in Brandon's own businesses — what worked, what's still in flight, and what the numbers actually were.",
};

interface Case {
  href: string;
  business: string;
  industry: string;
  headline: string;
  metric: string;
  status: string;
}

const cases: Case[] = [
  {
    href: "/case-studies/302-photo-booth",
    business: "302 Photo Booth",
    industry: "Event services · NCC Delaware",
    headline: "Replacing a part-time hire with an AI social-content stack",
    metric: "$680/month direct labor recovered, ~$8,160/year",
    status: "Live · supervised",
  },
  {
    href: "#tsas-coming",
    business: "Tri-State Aquatic Solutions",
    industry: "Pool service · NCC Delaware",
    headline: "Speed-to-lead AI receptionist + dispatch automation",
    metric: "First production data expected June 2026",
    status: "In build",
  },
];

export default function CaseStudiesIndex() {
  return (
    <div className="min-h-screen bg-white text-[#1C1917]">
      <header className="border-b border-stone-200 px-5 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold hover:text-amber-600 transition">
            Learn &amp; Leverage <span className="text-amber-500">AI</span>
          </Link>
          <Link href="/assessment" className="font-body text-sm bg-[#1C1917] text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition">
            Get an Assessment
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-14">
        <p className="text-sm uppercase tracking-wider text-amber-700 font-semibold mb-3">Case studies</p>
        <h1 className="font-display text-3xl sm:text-5xl font-black leading-tight mb-5">
          Real AI builds in Brandon&apos;s own businesses.
        </h1>
        <p className="font-body text-lg text-[#44403C] leading-relaxed mb-12">
          We&apos;d rather show you one honest case study than three polished ones with fabricated numbers. These are the AI systems we&apos;ve actually built, the metrics we can defend, and a clear note on what&apos;s still in flight.
        </p>

        <div className="space-y-6">
          {cases.map((c) => {
            const isLive = c.status.startsWith("Live");
            const cardClass = `block rounded-2xl border border-stone-200 p-7 transition ${isLive ? "hover:border-amber-300 hover:shadow-md" : "opacity-75"}`;
            const cardBody = (
              <>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-display text-sm font-bold text-amber-700">{c.business}</p>
                  <span className={`text-xs uppercase tracking-wider font-semibold px-2 py-1 rounded ${isLive ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"}`}>
                    {c.status}
                  </span>
                </div>
                <p className="font-body text-sm text-[#78716C] mb-3">{c.industry}</p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917] mb-2">{c.headline}</h2>
                <p className="font-body text-[#44403C]">{c.metric}</p>
                {isLive ? (
                  <p className="font-body text-sm text-amber-700 font-semibold mt-3">Read the full case study →</p>
                ) : (
                  <p className="font-body text-sm text-stone-500 italic mt-3">Case study publishes once 30+ days of production data lands.</p>
                )}
              </>
            );
            return isLive ? (
              <Link key={c.href} href={c.href} className={cardClass}>
                {cardBody}
              </Link>
            ) : (
              <div key={c.href} id={c.href.replace(/^#/, "")} className={cardClass}>
                {cardBody}
              </div>
            );
          })}
        </div>

        <div className="mt-14 bg-[#FFFBF5] border border-amber-100 rounded-2xl p-7">
          <h3 className="font-display text-lg font-bold mb-2">Why so few case studies?</h3>
          <p className="font-body text-[#44403C] leading-relaxed">
            We launched the AI Opportunity Assessment offer in April 2026. By the end of Q2 we&apos;ll have the first 3-5 customer deliveries with quantified outcomes — those become the next case studies. Until then, what&apos;s here is honest: one live case in our own business plus one in build. We&apos;d rather underclaim than overclaim.
          </p>
        </div>
      </main>

      <footer className="border-t border-stone-200 px-5 py-8 text-center text-sm text-stone-500">
        <p>
          Questions? Email{" "}
          <a href="mailto:brandon@learnandleverageai.com" className="text-amber-600 hover:text-amber-700">
            brandon@learnandleverageai.com
          </a>
        </p>
      </footer>
    </div>
  );
}
