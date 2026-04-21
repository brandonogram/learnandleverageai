import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're in — AI Opportunity Assessment",
  description: "Your AI Opportunity Assessment is being prepared. Next: call our intake number, then get your report within 48 business hours.",
  robots: { index: false, follow: false },
};

const INTAKE_PHONE = "(302) 416-6285";
const INTAKE_PHONE_TEL = "+13024166285";
const BRANDON_EMAIL = "brandon@learnandleverageai.com";

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
          Your AI Opportunity Assessment is reserved. The next step is a quick intake call with Emma, our AI intake agent — she&apos;ll take down the details Brandon needs to build your report.
        </p>

        <ol className="mt-10 space-y-8">
          <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                1
              </span>
              <div>
                <h2 className="text-xl font-semibold">Call the intake line</h2>
                <p className="mt-2 text-slate-600">
                  Any time — day or night. Plan for about 20 minutes. Call from a quiet spot where you can talk.
                </p>
                <a
                  href={`tel:${INTAKE_PHONE_TEL}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-lg font-semibold text-white transition hover:bg-slate-800"
                >
                  Call {INTAKE_PHONE}
                </a>
                <p className="mt-3 text-sm text-slate-500">
                  You can also schedule a time by replying to the confirmation email we just sent you.
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
                  The 48-hour clock starts when your intake call wraps up, not when you pay.
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
            {" "}or call the intake number above and say &quot;I need Brandon.&quot;
          </p>
          <p className="mt-4 text-sm text-slate-400">
            A confirmation email is on its way to the address you used at checkout. Check spam if you don&apos;t see it in 5 minutes.
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
