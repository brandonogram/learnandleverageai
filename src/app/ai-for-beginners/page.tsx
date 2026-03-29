import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI for Beginners — What You Actually Need to Know in 2026",
  description: "A no-nonsense guide for professionals who keep hearing about AI but haven't started yet. What AI is, what it isn't, and how to use it at work — explained for non-technical people.",
  openGraph: {
    title: "AI for Beginners — What You Actually Need to Know",
    description: "A no-nonsense guide for professionals who keep hearing about AI but haven't started yet.",
  },
};

export default function AIForBeginnersPage() {
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
          AI for Beginners: What You Actually Need to Know in 2026
        </h1>
        <p className="text-[#78716C] text-sm mb-8">
          By Brandon Calloway · March 29, 2026 · 5 min read
        </p>

        <div className="prose prose-lg text-[#44403C] space-y-6">
          <p>
            If you work in corporate America and you haven&apos;t started using AI yet, you&apos;re not alone. According to recent surveys, over 60% of professionals say they&apos;ve heard about AI tools at work but haven&apos;t used them consistently.
          </p>

          <p>
            The problem isn&apos;t that you&apos;re behind. It&apos;s that nobody has explained this stuff in a way that makes sense for what you actually do every day.
          </p>

          <p>
            This guide fixes that. No jargon, no hype, no &ldquo;AI will take your job&rdquo; fear-mongering. Just the practical basics.
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            What AI Actually Is (In Plain English)
          </h2>
          <p>
            AI tools like ChatGPT and Claude are prediction machines. You give them text, and they predict what text should come next. That&apos;s it.
          </p>
          <p>
            They&apos;re very good at predicting text because they&apos;ve been trained on billions of documents. So when you type &ldquo;write me a professional email declining a meeting,&rdquo; the AI has seen thousands of examples of professional emails and can generate something that sounds right.
          </p>
          <p>
            Think of it like a very experienced assistant who has read everything ever written, but has no common sense and needs extremely specific instructions.
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            What AI Is Good At (Right Now)
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Writing first drafts</strong> — emails, reports, presentations, memos</li>
            <li><strong>Summarizing long documents</strong> — paste in a 50-page PDF, get a 5-bullet summary</li>
            <li><strong>Organizing information</strong> — meeting notes into action items, raw data into tables</li>
            <li><strong>Answering questions</strong> — &ldquo;What does this contract clause mean?&rdquo; (better than Google for specific questions)</li>
            <li><strong>Brainstorming</strong> — generate 20 ideas for a team offsite in 10 seconds</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            What AI Is Bad At
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Making decisions</strong> — it can analyze options, but judgment is still yours</li>
            <li><strong>Knowing your company</strong> — it doesn&apos;t know your internal politics, culture, or history</li>
            <li><strong>Being 100% accurate</strong> — it sometimes makes things up (called &ldquo;hallucinations&rdquo;). Always verify important facts.</li>
            <li><strong>Handling confidential data</strong> — don&apos;t paste proprietary code, financial data, or customer info into free AI tools</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            The #1 Mistake Beginners Make
          </h2>
          <p>
            They type one vague question, get a mediocre answer, and conclude &ldquo;AI isn&apos;t useful.&rdquo;
          </p>
          <p>
            That&apos;s like sending a blank text message and being surprised you don&apos;t get a helpful response.
          </p>
          <p>
            The difference between a useless AI response and one you can actually use at work comes down to how you ask. Specifically:
          </p>
          <div className="bg-[#FFFBF5] border border-amber-100 rounded-xl p-5 my-4">
            <p className="text-sm font-mono text-[#57534E]">
              <strong>Bad:</strong> &ldquo;Write me an email.&rdquo;
            </p>
            <p className="text-sm font-mono text-[#57534E] mt-3">
              <strong>Good:</strong> &ldquo;You are a senior finance manager at a Fortune 500 company. Write an email to your team about the Q3 budget review moving from June 15 to May 30 due to board feedback. Keep it under 200 words. Professional but warm. Include 3 action items.&rdquo;
            </p>
          </div>
          <p>
            The good version tells AI who you are, what you need, how long it should be, what tone to use, and what to include. That&apos;s the difference between &ldquo;this is useless&rdquo; and &ldquo;wow, I can actually send this.&rdquo;
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            Which AI Tool Should You Use?
          </h2>
          <p>
            If you&apos;re just starting, pick one and stick with it:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>ChatGPT</strong> (by OpenAI) — the most popular, has a solid free tier, good for writing and analysis</li>
            <li><strong>Claude</strong> (by Anthropic) — better at long documents and nuanced writing, also has a free tier</li>
            <li><strong>Microsoft Copilot</strong> — if your company uses Microsoft 365, it&apos;s built into Word, Excel, Outlook, and Teams</li>
          </ul>
          <p>
            Don&apos;t worry about picking the &ldquo;right&rdquo; one. They all do similar things. The skill is in how you use them, not which one you choose.
          </p>

          <h2 className="text-2xl font-bold text-[#1C1917] mt-10">
            What You Can Try Right Now (2 Minutes)
          </h2>
          <p>
            Open <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">ChatGPT</a> or <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">Claude</a> (both free) and paste this:
          </p>
          <div className="bg-[#FFFBF5] border border-amber-100 rounded-xl p-5 my-4">
            <p className="text-sm font-mono text-[#57534E] italic">
              &ldquo;I&apos;m a [your job title] at a [your industry] company. Give me 5 ways I could use AI to save time this week. Be specific to my role — not generic advice.&rdquo;
            </p>
          </div>
          <p>
            Replace the brackets with your real info. The response will surprise you.
          </p>

          {/* CTA */}
          <div className="bg-[#1C1917] text-white rounded-2xl p-8 mt-12">
            <h3 className="text-xl font-bold mb-3">Want hands-on help getting started?</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Reading about AI is one thing. Setting it up for your specific job is another. At the free workshop, we skip the theory and go straight to doing — you open your laptop, and we walk you through everything step by step.
            </p>
            <p className="text-gray-400 mb-6 text-sm">
              <strong className="text-white">Thursday, April 2 · 6-8 PM · Hilton Christiana, Newark DE · 8 seats left · Free</strong>
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
