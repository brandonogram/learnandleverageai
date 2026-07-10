import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're in — AI Opportunity Assessment",
  description: "Your AI Opportunity Assessment is reserved. Next: schedule your guided intake, then get your report within 48 business hours.",
  robots: { index: false, follow: false },
};

const BRANDON_EMAIL = "brandon@learnandleverageai.com";
const INTAKE_EMAIL = `mailto:${BRANDON_EMAIL}?subject=${encodeURIComponent("Paid AI Opportunity Assessment intake")}&body=${encodeURIComponent("I just purchased the AI Opportunity Assessment. Please send me the next available intake times.\n\nName:\nBusiness:\nBest phone (optional):")}`;

export default function AssessmentSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
          Payment confirmed
        </span>

        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          You&apos;re in. Here&apos;s what happens next.
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Your AI Opportunity Assessment is reserved. The next step is a quick guided intake so Brandon can capture the details needed to build your report.
        </p>

        <ol className="mt-10 space-y-8">
          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                1
              </span>
              <div>
                <h2 className="text-xl font-semibold">Schedule your guided intake</h2>
                <p className="mt-2 text-slate-600">
                  Plan for about 20 minutes. Email Brandon now and he&apos;ll send the next available times.
                </p>
                <a
                  href={INTAKE_EMAIL}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-lg font-semibold text-white transition hover:bg-slate-800"
                >
                  Email Brandon to schedule
                </a>
                <p className="mt-3 text-sm text-slate-500">
                  Include your name and business so Brandon can match the intake to your payment.
                </p>
              </div>
            </div>
          </li>

          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                2
              </span>
              <div>
                <h2 className="text-xl font-semibold">Your report lands in 48 business hours</h2>
                <p className="mt-2 text-slate-600">
                  Delivered as a PDF + web-viewable link. It covers your pain points, 3–5 specific tools to install, a 4-day quick-win plan, and the dollar-per-month impact math.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  The 48-hour clock starts when your intake wraps up, not when you pay.
                </p>
              </div>
            </div>
          </li>

          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                3
              </span>
              <div>
                <h2 className="text-xl font-semibold">30-minute walkthrough with Brandon</h2>
                <p className="mt-2 text-slate-600">
                  Once your report is ready, you&apos;ll get a calendar link to book the walkthrough. Brandon goes through the recommendations live, answers your questions, and — if it makes sense — talks about what a deeper engagement would look like. Zero pressure.
                </p>
              </div>
            </div>
          </li>
        </ol>

        <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white">
          <h3 className="text-xl font-semibold">Need to reach Brandon directly?</h3>
          <p className="mt-2 text-slate-300">
            Email{" "}
            <a href={`mailto:${BRANDON_EMAIL}`} className="font-medium text-white underline underline-offset-4">
              {BRANDON_EMAIL}
            </a>
            {" "}and put &quot;assessment&quot; in the subject.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Keep your Stripe receipt for your records. Brandon will reply directly to your intake-scheduling email.
          </p>
        </div>

        <div className="mt-10 text-center text-sm text-slate-500">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Back to learnandleverageai.com
          </Link>
        </div>
      </div>
    </main>
  );
}
