'use client';

import { useState } from 'react';

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    age: '',
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setFormState('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      setFormState('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#1C1917] flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 text-center border-b border-white/10">
        <span className="font-display text-lg font-bold text-white">
          Learn & Leverage <span className="text-amber-400">AI</span>
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-md">
          {formState === 'success' ? (
            <div className="text-center py-12 animate-fade-up">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-black text-white mb-3">
                You're in.
              </h2>
              <p className="font-body text-gray-400 text-base">
                We'll be in touch soon. Keep an eye on your inbox.
              </p>
            </div>
          ) : (
            <>
              {/* Headline */}
              <div className="text-center mb-8">
                <h1 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                  Let's Connect
                </h1>
                <p className="font-body text-gray-400 text-base">
                  Drop your info below and we'll reach out.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 font-body text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 font-body text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 font-body text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleChange('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                    inputMode="numeric"
                    maxLength={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 font-body text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Zip Code"
                  />
                  <input
                    type="text"
                    required
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value.replace(/\D/g, '').slice(0, 3))}
                    inputMode="numeric"
                    maxLength={3}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 font-body text-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Age"
                  />
                </div>

                {formState === 'error' && (
                  <p className="font-body text-red-400 text-sm text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-white font-body font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] mt-2"
                >
                  {formState === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Let's Go"
                  )}
                </button>

                <p className="font-body text-center text-xs text-gray-600 mt-2">
                  Your info stays private. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-4 text-center border-t border-white/10">
        <div className="flex items-center justify-center gap-4 mb-2">
          <a href="/terms" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
          <span className="text-gray-600">|</span>
          <a href="/privacy" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
        </div>
        <p className="font-body text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Learn & Leverage AI
        </p>
      </footer>
    </div>
  );
}
