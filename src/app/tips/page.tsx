import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3 AI Tips You Can Use at Work Today",
  description: "Quick, practical AI tips for corporate professionals. No tech experience needed. Try these in ChatGPT or Claude right now.",
  openGraph: {
    title: "3 AI Tips You Can Use at Work Today",
    description: "Quick, practical AI tips for corporate professionals. No tech experience needed.",
  },
};

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="bg-[#1C1917] py-4">
        <div className="max-w-3xl mx-auto px-5 flex items-center justify-between">
          <Link href="/" className="font-bold text-white text-lg">
            Learn &amp; Leverage <span className="text-amber-400">AI</span>
          </Link>
          <Link
            href="/workshops"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Free Workshop
          </Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-5 py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-[#1C1917] mb-4 leading-tight">
          3 AI Tips You Can Use at Work Today
        </h1>
        <p className="text-[#78716C] text-sm mb-8">
          By Brandon Calloway · March 27, 2026 · 3 min read
        </p>

        <div className="prose prose-lg text-[#44403C] space-y-8">
          <p>
            Most people try AI once, get a mediocre response, and give up. The problem isn&apos;t AI — it&apos;s how you&apos;re asking. Here are three tips you can try right now in ChatGPT or Claude.
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            1. The Email Shortcut
          </h2>
          <p>
            Instead of telling AI &ldquo;write me an email,&rdquo; tell it who you are, what you need, and how it should sound:
          </p>
          <div className="bg-[#FFFBF5] border border-amber-100 rounded-xl p-5 my-4">
            <p className="text-sm font-mono text-[#57534E] italic">
              &ldquo;You are a senior project manager at a pharma company. Write an email to my team about moving the Q3 deadline from June 15 to May 30 due to FDA feedback. Under 200 words, professional but warm, include 3 action items.&rdquo;
            </p>
          </div>
          <p>
            The difference between a garbage response and one you can actually send? Context. AI doesn&apos;t read minds — it reads instructions.
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            2. The Meeting Notes Trick
          </h2>
          <p>
            After your next meeting, paste your messy notes into AI and type:
          </p>
          <div className="bg-[#FFFBF5] border border-amber-100 rounded-xl p-5 my-4">
            <p className="text-sm font-mono text-[#57534E] italic">
              &ldquo;Turn these into: 1) A 3-bullet summary, 2) Action items with owners, 3) A follow-up email to the team.&rdquo;
            </p>
          </div>
          <p>
            You just turned 20 minutes of post-meeting cleanup into 30 seconds. I do this across all my businesses — it saves me over an hour a day.
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            3. The &ldquo;Before You Google It&rdquo; Test
          </h2>
          <p>
            Next time you&apos;re about to search for something at work, try asking AI instead. But give it context:
          </p>
          <div className="bg-[#FFFBF5] border border-amber-100 rounded-xl p-5 my-4">
            <p className="text-sm font-mono text-[#57534E] italic">
              &ldquo;I&apos;m an HR manager preparing for open enrollment. Summarize the top 3 things employees always ask about and draft FAQ answers I can send to my team.&rdquo;
            </p>
          </div>
          <p>
            Google gives you 10 links to read. AI gives you the answer. Try it once. You&apos;ll stop going back.
          </p>

          {/* CTA */}
          <div className="bg-[#1C1917] text-white rounded-2xl p-8 mt-12">
            <h3 className="text-xl font-bold mb-3">Want to go deeper?</h3>
            <p className="text-gray-400 mb-4 text-sm">
              These 3 tips are just the beginning. At the free workshop, we cover the full framework — the 4-step approach that makes AI consistently useful for your specific job. You&apos;ll leave with tools set up and working on your laptop.
            </p>
            <p className="text-gray-400 mb-6 text-sm">
              <strong className="text-white">Thursday, April 2 · 6-8 PM · Hilton Christiana, Newark DE · 10 seats · Free</strong>
            </p>
            <Link
              href="/workshops"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Register for the Free Workshop
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 bg-[#1C1917] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-base font-bold text-white mb-2">
            Learn &amp; Leverage <span className="text-amber-400">AI</span>
          </p>
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Learn &amp; Leverage AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
