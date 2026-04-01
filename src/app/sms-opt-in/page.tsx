'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SmsOptInPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consentNonMarketing: false,
    consentMarketing: false,
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      alert('Please enter your phone number.');
      return;
    }
    if (!formData.consentNonMarketing) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setFormState('loading');
    try {
      const res = await fetch('/api/workshop-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          email: '',
          phone: formData.phone,
          source: 'sms-opt-in-page',
          registered_at: new Date().toISOString(),
          sms_consent: true,
          sms_marketing_consent: formData.consentMarketing,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'consentNonMarketing' && checked) setConsentError(false);
  };

  if (formState === 'success') {
    return (
      <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">You&apos;re signed up for SMS updates!</h2>
          <p className="font-body text-gray-400 mb-6">
            You&apos;ll receive text messages about upcoming workshops and events. Reply STOP at any time to unsubscribe.
          </p>
          <Link href="/workshops" className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-body font-bold transition-all">
            View Upcoming Workshops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display text-xl font-bold text-white">Learn &amp; Leverage AI</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            SMS Text Message Opt-In
          </h1>
          <p className="font-body text-gray-400 max-w-lg mx-auto">
            Sign up to receive text messages from Learn &amp; Leverage AI about workshop reminders, event updates, and registration confirmations.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1C1917] border border-[#292524] rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-body text-sm font-semibold text-gray-300 mb-2">
                Name <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-[#0C0A09] border border-[#292524] rounded-xl font-body text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone" className="block font-body text-sm font-semibold text-gray-300 mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(302) 555-0100"
                required
                className="w-full px-4 py-3 bg-[#0C0A09] border border-[#292524] rounded-xl font-body text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Consent Checkboxes */}
            <div className={`p-5 rounded-xl border ${consentError ? 'border-red-500 bg-red-500/5' : 'border-[#292524] bg-[#0C0A09]'}`}>
              <h3 className="font-body text-sm font-semibold text-white mb-4">
                SMS Consent <span className="text-red-400">*</span>
              </h3>

              {/* Non-Marketing Checkbox (Required) */}
              <div className="mb-4 p-4 rounded-lg border border-[#292524] bg-[#1C1917]">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consentNonMarketing"
                    name="consentNonMarketing"
                    checked={formData.consentNonMarketing}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded cursor-pointer"
                  />
                  <label htmlFor="consentNonMarketing" className="font-body text-sm text-gray-300 cursor-pointer leading-relaxed">
                    I consent to receive non-marketing text messages from <strong className="text-white">Learn &amp; Leverage AI</strong> (Dude Ventures Services LLC, d/b/a Learn and Leverage AI) at the phone number provided. Messages include workshop reminders, event updates, and registration confirmations. <strong className="text-gray-200">Message frequency: up to 5 messages per event.</strong> Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance.
                  </label>
                </div>
              </div>

              {/* Marketing Checkbox (Optional) */}
              <div className="p-4 rounded-lg border border-[#292524] bg-[#1C1917]">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consentMarketing"
                    name="consentMarketing"
                    checked={formData.consentMarketing}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded cursor-pointer"
                  />
                  <label htmlFor="consentMarketing" className="font-body text-sm text-gray-300 cursor-pointer leading-relaxed">
                    I also consent to receive marketing text messages from <strong className="text-white">Learn &amp; Leverage AI</strong> about special offers, new workshop announcements, and AI tips. <span className="text-gray-500">(Optional)</span>
                  </label>
                </div>
              </div>

              {consentError && (
                <p className="font-body text-red-400 text-sm mt-3">Please check the required SMS consent box above to continue.</p>
              )}
            </div>

            {/* Disclosure Section */}
            <div className="p-5 rounded-xl border border-[#292524] bg-[#0C0A09]">
              <h3 className="font-body text-sm font-semibold text-white mb-3">
                Important Disclosures
              </h3>
              <ul className="space-y-2 font-body text-xs text-gray-400 leading-relaxed">
                <li>
                  <strong className="text-gray-300">Program:</strong> Learn &amp; Leverage AI SMS alerts, operated by Dude Ventures Services LLC.
                </li>
                <li>
                  <strong className="text-gray-300">Message Types:</strong> Workshop reminders, event updates, registration confirmations, and (if opted in) promotional messages about new workshops and AI training.
                </li>
                <li>
                  <strong className="text-gray-300">Message Frequency:</strong> Up to 5 messages per event you register for. Marketing messages (if opted in) up to 4 per month.
                </li>
                <li>
                  <strong className="text-gray-300">Message &amp; Data Rates:</strong> Message and data rates may apply depending on your mobile carrier plan.
                </li>
                <li>
                  <strong className="text-gray-300">Opt-Out:</strong> Reply <strong className="text-amber-400">STOP</strong> to any text message to unsubscribe at any time.
                </li>
                <li>
                  <strong className="text-gray-300">Help:</strong> Reply <strong className="text-amber-400">HELP</strong> for assistance or contact us at{' '}
                  <a href="mailto:info@learnandleverageai.com" className="text-amber-400 underline hover:text-amber-300">
                    info@learnandleverageai.com
                  </a>.
                </li>
                <li>
                  <strong className="text-gray-300">Consent Not Required for Purchase:</strong> Your consent to receive SMS messages is not a condition of purchasing any service or attending any workshop.
                </li>
                <li>
                  <strong className="text-gray-300">No Third-Party Sharing:</strong> We will never sell, rent, or share your phone number or SMS opt-in consent with any third parties for their marketing purposes. Your opt-in information is used solely by Learn &amp; Leverage AI.
                </li>
                <li>
                  <strong className="text-gray-300">Carriers:</strong> Carriers are not liable for delayed or undelivered messages.
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-body font-black text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              {formState === 'loading' ? 'Submitting...' : 'Sign Up for SMS Updates'}
            </button>

            {formState === 'error' && (
              <p className="font-body text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}

            {/* Footer Links */}
            <div className="text-center pt-4 border-t border-[#292524]">
              <Link
                href="/privacy"
                className="font-body text-sm text-amber-400 hover:text-amber-300 underline mx-3"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/terms"
                className="font-body text-sm text-amber-400 hover:text-amber-300 underline mx-3"
              >
                Terms of Service
              </Link>
            </div>
          </form>
        </div>

        {/* Trust text */}
        <p className="text-center font-body text-xs text-gray-500 mt-6">
          Your information is secure and will never be shared with third parties for marketing.
        </p>
      </div>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto mt-16 pt-8 border-t border-[#292524] text-center">
        <p className="font-body text-xs text-gray-500 mb-4">
          &copy; {new Date().getFullYear()} Dude Ventures Services LLC, d/b/a Learn &amp; Leverage AI. All rights reserved.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/terms" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
