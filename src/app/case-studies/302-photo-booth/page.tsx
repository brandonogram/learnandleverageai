import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "302 Photo Booth — Replacing a Part-Time Hire with an AI Stack | Learn & Leverage AI",
  description: "How Brandon's photo booth business replaced a $680/mo part-time hire with an AI social-content stack and synced 140 paying customers from CheckCherry into a working CRM in under a month.",
};

export default function Case302PBPage() {
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

      <main className="max-w-3xl mx-auto px-5 py-14 font-body">
        <p className="text-sm uppercase tracking-wider text-amber-700 font-semibold mb-3">Case study · 302 Photo Booth</p>
        <h1 className="font-display text-3xl sm:text-5xl font-black leading-tight mb-5">
          Replacing a part-time hire with an AI social-content stack — $680/mo recovered, immediately
        </h1>
        <p className="text-lg text-[#44403C] leading-relaxed mb-8">
          302 Photo Booth is one of Brandon&apos;s operating businesses — a Delaware-based photo-booth-rental service for weddings and events. In Q1 2026, the business was paying a part-time social-media coordinator $170/week to write captions, schedule posts, and engage on Instagram. We replaced that role with a stack of off-the-shelf AI tools.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <h2 className="font-display text-lg font-bold text-amber-900 mb-3">At a glance</h2>
          <ul className="space-y-2 text-[#44403C]">
            <li><strong>Direct labor recovered:</strong> $170/week → <strong>$680/month</strong> (gross), or about $8,160/year</li>
            <li><strong>Tools used:</strong> CapCut (video editing), OpusClip (clipping/captioning), Claude (caption + hashtag generation), a custom Python social agent for posting/engagement</li>
            <li><strong>Build time:</strong> ~2 weeks to assemble + train, then weekly ~30 min of supervision</li>
            <li><strong>Net savings after tooling:</strong> ~$580/month after subscription costs</li>
          </ul>
        </div>

        <h2 className="font-display text-2xl font-bold mb-3">The before</h2>
        <p className="text-[#44403C] leading-relaxed mb-6">
          The part-time coordinator (we&apos;ll call her Julia) was doing the right work for the right reasons — keeping the brand consistent on Instagram and Facebook, posting 3-5 times per week, replying to DMs, sourcing event photos for highlight reels. The problem wasn&apos;t Julia. The problem was that the work itself was 80% pattern-matching: edit a 30-second clip, write three caption options, pick a hashtag set, schedule for 6pm. That&apos;s a job AI does at par for one-tenth the cost.
        </p>

        <h2 className="font-display text-2xl font-bold mb-3">The build</h2>
        <ol className="list-decimal list-inside space-y-3 text-[#44403C] leading-relaxed mb-6">
          <li><strong>Source clips:</strong> CapCut + OpusClip take raw event video and produce 3-7 vertical clips per event with auto-captions and the right aspect ratio for IG Reels and TikTok.</li>
          <li><strong>Write captions:</strong> A Claude prompt template generates three caption variants per clip — one playful, one polished, one CTA-driven — with on-brand hashtag sets pulled from a curated bank.</li>
          <li><strong>Schedule and post:</strong> A custom Python agent (~8,000 lines) runs the queue, posts on schedule, and handles basic DM follow-ups and engagement (likes, replies on relevant hashtag streams).</li>
          <li><strong>Brandon&apos;s role:</strong> 30 minutes per week reviewing the queue and approving the next 5-7 posts. That&apos;s it.</li>
        </ol>

        <h2 className="font-display text-2xl font-bold mb-3">The result</h2>
        <p className="text-[#44403C] leading-relaxed mb-6">
          The direct cost recovered is the easy number — $170/week on the payroll line stopped going out. The harder-to-measure wins: post cadence got more consistent (no &ldquo;Julia is on vacation&rdquo; weeks), captions are A/B-able from day one, and Brandon&apos;s thinking time goes back into the business instead of into managing creative output.
        </p>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-12">
          <h3 className="font-display text-lg font-bold mb-3">What we&apos;re honest about</h3>
          <ul className="space-y-2 text-[#57534E] text-sm">
            <li>The same quarter, 302PB also rebuilt its website and refreshed its branding. We&apos;ve seen a 38% lift in bookings (29 → 40) since then. Some of that is the AI stack; some of it is the website + branding. We don&apos;t claim the AI stack alone caused the booking lift — that would be misleading.</li>
            <li>The AI social agent is &quot;deployed but lightly active&quot; today — Brandon supervises it more than full-autopilot would imply. The next 60 days are about reducing his supervision time toward zero.</li>
            <li>This is a one-person business. The same playbook in a 10-50 person service business should recover more — typically a fractional FTE&apos;s worth of admin time, plus a measurable lift on lead-response speed, which is where most service-business revenue actually leaks.</li>
          </ul>
        </div>

        <h2 className="font-display text-2xl font-bold mb-3">Why this matters for your business</h2>
        <p className="text-[#44403C] leading-relaxed mb-3">
          Most service-business owners assume AI is a moonshot — a custom-built system, a six-month integration, a six-figure budget. The 302PB stack is the opposite: every tool is off-the-shelf, every subscription is under $50/month, and the heaviest custom code is one Python script that any reasonably technical operator could maintain.
        </p>
        <p className="text-[#44403C] leading-relaxed mb-10">
          The AI Opportunity Assessment looks for these kinds of replacements in your business — a recurring task being done by a human that an off-the-shelf tool can do at par or better. We don&apos;t care about the moonshot. We care about the $680 you&apos;re bleeding every month that you didn&apos;t notice.
        </p>

        <div className="bg-[#1C1917] text-white rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-black mb-3">Want this kind of audit for your business?</h3>
          <p className="text-stone-300 mb-6">
            The AI Opportunity Assessment finds 3-5 of these recoverable patterns in 48 business hours after your intake call.
          </p>
          <Link href="/assessment" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition">
            Get My Assessment — $997
          </Link>
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
