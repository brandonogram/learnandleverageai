import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fractional AI Officer — Done-for-you AI for Delaware service businesses",
  description: "Two ways to work with Brandon after your AI Opportunity Assessment: a $4,997 one-time build or $4,997/month advisory. Owner-led service businesses, NCC/Delco/Chesco, 10-50 employees.",
};

interface OptionCard {
  badge: string;
  title: string;
  price: string;
  cadence: string;
  best: string;
  scope: string[];
  outcome: string;
  cta: string;
}

const ONE_TIME: OptionCard = {
  badge: "Pick this if you want one specific system installed and handed to you",
  title: "AI Build (One-Time)",
  price: "$4,997",
  cadence: "one-time, paid up front",
  best: "Owner who knows the one specific bottleneck (slow lead response, manual reporting, dispatch chaos) and wants a focused build done in 30 days, then we hand it over.",
  scope: [
    "Up to 30 days of build time on one specific AI system identified in your assessment",
    "Discovery call (60 min) to lock the spec",
    "Build, test, and document the system end-to-end",
    "One install session with you or your team (90 min)",
    "30-day post-launch support email window for fixes and small tweaks",
    "All docs, prompts, and account ownership transferred to you at handoff",
  ],
  outcome: "You own a working system and the documentation to maintain it. We're done. No retainer creep, no vendor lock-in.",
  cta: "Talk to Brandon about a build",
};

const MONTHLY: OptionCard = {
  badge: "Pick this if you want ongoing AI work, not a one-and-done",
  title: "Monthly Advisory",
  price: "$4,997",
  cadence: "per month, quarterly minimum",
  best: "Owner who wants a recurring AI partner — install one new system per month, train the team to use it, and have a calm voice on the other end of the line when something breaks or a new use case shows up.",
  scope: [
    "One new AI system installed per month, scoped against the priority list from your assessment",
    "Weekly 30-minute working session — async if you prefer",
    "Slack or shared inbox for between-session questions",
    "Team training session each month (45 min) so your people use what we build",
    "Quarterly review with revised priority list as your business changes",
    "All systems, prompts, and accounts owned by your business — month-to-month after the 90-day minimum",
  ],
  outcome: "After 90 days you have 3 production AI systems, a trained team, and a clear roadmap for the next 90.",
  cta: "Talk to Brandon about advisory",
};

function OptionBlock({ option }: { option: OptionCard }) {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-7 sm:p-9">
      <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-3">
        {option.badge}
      </p>
      <h2 className="font-display text-2xl sm:text-3xl font-black text-[#1C1917] mb-2">
        {option.title}
      </h2>
      <p className="font-body">
        <span className="font-display text-3xl font-black text-[#1C1917]">{option.price}</span>
        <span className="text-[#78716C] ml-2">{option.cadence}</span>
      </p>

      <p className="font-body text-[#44403C] leading-relaxed mt-6">
        <span className="font-semibold text-[#1C1917]">Best for:</span> {option.best}
      </p>

      <h3 className="font-display text-base font-bold text-[#1C1917] mt-6 mb-3">What&apos;s included</h3>
      <ul className="space-y-2.5 mb-6">
        {option.scope.map((item, i) => (
          <li key={i} className="flex items-start gap-3 font-body text-[#44403C]">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="font-body text-[#57534E] italic border-l-4 border-amber-200 pl-4 py-1 mb-6">
        {option.outcome}
      </p>

      <a
        href="mailto:brandon@learnandleverageai.com?subject=Engagement%20interest"
        className="block w-full text-center bg-[#1C1917] hover:bg-stone-700 text-white font-bold text-base px-6 py-4 rounded-xl transition"
      >
        {option.cta}
      </a>
    </div>
  );
}

export default function FcaioPage() {
  return (
    <div className="min-h-screen bg-white text-[#1C1917]">
      <header className="border-b border-stone-200 px-5 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold hover:text-amber-600 transition">
            Learn &amp; Leverage <span className="text-amber-500">AI</span>
          </Link>
          <Link href="/assessment" className="font-body text-sm bg-[#1C1917] text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition">
            Get an Assessment first
          </Link>
        </div>
      </header>

      <section className="bg-[#FFFBF5] px-5 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
            For owner-led NCC service businesses
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black mb-5 leading-tight">
            Two ways to work together — after your assessment.
          </h1>
          <p className="font-body text-lg text-[#44403C] leading-relaxed">
            Most owners book the AI Opportunity Assessment first ($997, one-time). The assessment gives you a prioritized list of 3-5 specific AI builds for your business, with the dollar-impact math. After the walkthrough call, if you want us to actually do the work, you choose one of two engagement models below. Both are designed for owner-led service businesses with 10-50 employees and no full-time CTO.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-14">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          <OptionBlock option={ONE_TIME} />
          <OptionBlock option={MONTHLY} />
        </div>
        <p className="font-body text-sm text-center text-[#78716C] mt-8">
          Both engagements assume you&apos;ve completed the AI Opportunity Assessment. Without the assessment we don&apos;t know what to build, and you&apos;d be paying us to do discovery work the assessment already covered.
        </p>
      </section>

      <section className="bg-[#FFFBF5] px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-center mb-8">
            How to choose
          </h2>
          <div className="space-y-5 font-body text-[#44403C] leading-relaxed">
            <p>
              <strong className="text-[#1C1917]">Pick the one-time build</strong> if you already know exactly which system would unlock the next phase of your business — the one that, if it just worked, would make a measurable difference in 60 days. We build it, hand it over, you own it. No ongoing relationship.
            </p>
            <p>
              <strong className="text-[#1C1917]">Pick the monthly advisory</strong> if you don&apos;t want to be in the AI-vendor-management business. You want one new system per month, your team trained on each one, and a calm voice on the other end when something breaks. After 90 days you can keep going or stop — month-to-month after the initial quarter.
            </p>
            <p>
              <strong className="text-[#1C1917]">Not sure which?</strong> The walkthrough call after your assessment is the right place to decide. Brandon won&apos;t push you toward the larger engagement — the assessment includes a recommendation based on what we found.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-center mb-10">
            What we won&apos;t do
          </h2>
          <ul className="space-y-4 font-body text-[#44403C] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-stone-400 flex-shrink-0 mt-1">—</span>
              <span><strong className="text-[#1C1917]">Custom-built models or fine-tuning.</strong> You don&apos;t need them. We use off-the-shelf foundation models with prompt engineering and integration work. If your business genuinely needs a custom model, we&apos;ll tell you and recommend someone who does that work.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-stone-400 flex-shrink-0 mt-1">—</span>
              <span><strong className="text-[#1C1917]">Hold your data hostage.</strong> Every account, prompt, doc, and credential is yours. If you fire us tomorrow, you can run the systems we built without us. That&apos;s the point.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-stone-400 flex-shrink-0 mt-1">—</span>
              <span><strong className="text-[#1C1917]">Pretend AI is always the answer.</strong> Some bottlenecks are process problems, hiring problems, or pricing problems. We&apos;ll tell you when AI isn&apos;t the right fix.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-stone-400 flex-shrink-0 mt-1">—</span>
              <span><strong className="text-[#1C1917]">Take more clients than we can serve.</strong> Brandon caps active retainers at a number that lets him deliver weekly without burning out. If we&apos;re full, you go on a waitlist. We&apos;d rather lose your money than lose your trust.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#FFFBF5] to-amber-50 px-5 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-4xl font-black text-[#1C1917] mb-4 leading-tight">
            Start with the assessment.
          </h2>
          <p className="font-body text-[#44403C] mb-8 text-lg">
            Both engagements are downstream of the $997 AI Opportunity Assessment. Get the report, do the walkthrough, then decide what comes next.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-xl font-body font-black text-xl transition shadow-lg shadow-amber-500/30"
          >
            Get My Assessment — $997
          </Link>
          <p className="font-body text-sm text-[#78716C] mt-4">
            Already done the assessment? Email{" "}
            <a href="mailto:brandon@learnandleverageai.com" className="text-amber-700 underline">
              brandon@learnandleverageai.com
            </a>
            {" "}and tell us which engagement fits.
          </p>
        </div>
      </section>

      <footer className="border-t border-stone-200 px-5 py-8 text-center text-sm text-stone-500">
        <p>
          Learn &amp; Leverage AI is operated by Dude Ventures Services LLC, Delaware. See{" "}
          <Link href="/terms" className="text-amber-600 hover:text-amber-700">Terms</Link> and{" "}
          <Link href="/privacy" className="text-amber-600 hover:text-amber-700">Privacy</Link>.
        </p>
      </footer>
    </div>
  );
}
