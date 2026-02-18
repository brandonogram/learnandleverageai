'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-[#1C1917] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
          You&apos;re All Set!
        </h1>

        <p className="font-body text-lg text-amber-400 font-medium mb-6">
          Welcome to the AI Starter Pack
        </p>

        <div className="bg-white rounded-2xl p-6 sm:p-8 text-left mb-8">
          <h2 className="font-display text-lg font-bold text-[#1C1917] mb-4">
            Here&apos;s What Happens Next:
          </h2>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Check Your Email',
                desc: 'Confirmation + your "10 Things AI Can Do" playbook are on the way.',
                time: 'Right now',
              },
              {
                step: '2',
                title: 'Schedule Your Strategy Call',
                desc: "You'll get a booking link within 24 hours. Pick a time that works.",
                time: 'Within 24 hrs',
              },
              {
                step: '3',
                title: 'AI Receptionist Goes Live',
                desc: "We'll build and configure your AI phone receptionist for your business.",
                time: 'Within 5 days',
              },
              {
                step: '4',
                title: 'ContentCreationDude Pro Access',
                desc: "Login credentials for 30 days of AI-generated social content.",
                time: 'Same day',
              },
            ].map((s, i) => (
              <div key={i} className="flex gap-3">
                <span className="bg-amber-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {s.step}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-body font-bold text-[#1C1917] text-sm">{s.title}</p>
                    <span className="font-body text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      {s.time}
                    </span>
                  </div>
                  <p className="font-body text-xs text-[#78716C] mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brandon Contact */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/images/brandon-calloway.jpg"
                alt="Brandon Calloway"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-left">
              <p className="font-body text-sm text-white font-medium">Brandon Calloway</p>
              <p className="font-body text-xs text-gray-400">Your AI implementation partner</p>
            </div>
          </div>
          <p className="font-body text-sm text-gray-300">
            Questions? Email me directly at{' '}
            <a href="mailto:brandon@learnandleverageai.com" className="text-amber-400 hover:underline">
              brandon@learnandleverageai.com
            </a>
          </p>
        </div>

        <a
          href="/event"
          className="inline-block font-body text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Back to event page
        </a>

        {sessionId && (
          <p className="font-body text-[10px] text-gray-600 mt-4">
            Order ref: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1C1917] flex items-center justify-center">
        <div className="text-white font-body">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
