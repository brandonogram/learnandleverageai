'use client';

import { useState } from 'react';

export default function SmsOptInPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consentNonMarketing: false,
    consentMarketing: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      alert('Please enter your phone number.');
      return;
    }
    alert('Thank you for opting in! (This is a demo form for compliance review.)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SMS Opt-In
          </h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            LearnAndLeverageAI
          </p>
          <p className="text-lg text-gray-700">
            Sign up to receive text messages about webinar reminders, course updates, and registration confirmations.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            
            {/* Name Field (Optional) */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Phone Number Field (Required) */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Consent Checkboxes */}
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Consent (Optional)
              </h3>
              
              {/* Non-Marketing Checkbox */}
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentNonMarketing"
                    name="consentNonMarketing"
                    checked={formData.consentNonMarketing}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="consentNonMarketing" className="ml-3 text-sm text-gray-700 cursor-pointer leading-relaxed">
                    I consent to receive non-marketing text messages from <strong>LearnAndLeverageAI</strong> about webinar reminders, course updates, and registration confirmations. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
                  </label>
                </div>
              </div>

              {/* Marketing Checkbox */}
              <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentMarketing"
                    name="consentMarketing"
                    checked={formData.consentMarketing}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="consentMarketing" className="ml-3 text-sm text-gray-700 cursor-pointer leading-relaxed">
                    I consent to receive marketing text messages, about special offers, discounts, and updates, from <strong>LearnAndLeverageAI</strong> at the phone number provided. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
                  </label>
                </div>
              </div>
            </div>

            {/* Disclosure Section */}
            <div className="mb-8 p-6 bg-purple-50 border-2 border-purple-200 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                Important Information
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-700 leading-relaxed">
                <li>
                  <strong>Business:</strong> LearnAndLeverageAI is an AI training and education platform helping individuals and businesses learn to use artificial intelligence effectively.
                </li>
                <li>
                  <strong>Message Types:</strong> You may receive webinar reminders, course update notifications, registration confirmations, event announcements, and (if you opt in) promotional offers about new courses and special discounts.
                </li>
                <li>
                  <strong>Message Frequency:</strong> Message frequency varies based on your enrollment and event registrations. Typically 3-10 messages per month.
                </li>
                <li>
                  <strong>Message & Data Rates:</strong> Message and data rates may apply depending on your mobile carrier plan.
                </li>
                <li>
                  <strong>Opt-Out Instructions:</strong> Reply <strong>STOP</strong> to any text message to unsubscribe at any time.
                </li>
                <li>
                  <strong>Help:</strong> Reply <strong>HELP</strong> for assistance or contact us at{' '}
                  <a href="mailto:support@learnandleverageai.com" className="text-blue-600 underline hover:text-blue-800">
                    support@learnandleverageai.com
                  </a>.
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Submit
            </button>

            {/* Carrier Notice */}
            <p className="text-center text-sm text-gray-500 italic mt-4">
              Carriers are not liable for delayed or undelivered messages.
            </p>

            {/* Footer Links */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline mx-3"
              >
                Privacy Policy
              </a>
              {' | '}
              <a
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline mx-3"
              >
                Terms of Service
              </a>
            </div>
          </form>
        </div>

        {/* Additional Trust Badge */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>🔒 Your information is secure and will never be shared with third parties.</p>
        </div>
      </div>
    </div>
  );
}
