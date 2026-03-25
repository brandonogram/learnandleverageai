import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Learn & Leverage AI. Read our terms governing the use of our website, workshops, and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#1C1917] text-white">
      {/* Header */}
      <header className="py-6 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-5">
          <Link href="/" className="font-display text-xl font-bold text-white hover:text-amber-400 transition-colors">
            Learn &amp; Leverage <span className="text-amber-400">AI</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 py-12 font-body">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Effective Date: March 24, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              Learn &amp; Leverage AI is operated by <strong className="text-white">Dude Ventures Services LLC</strong>, a Delaware limited liability company. When we say &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our,&rdquo; we mean Dude Ventures Services LLC doing business as Learn &amp; Leverage AI.
            </p>
            <p className="mt-2">
              Our website is located at{" "}
              <a href="https://learnandleverageai.com" className="text-amber-400 hover:underline">learnandleverageai.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. Agreement to Terms</h2>
            <p>
              By accessing our website, registering for a workshop, or using any of our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. Services We Offer</h2>
            <p>Learn &amp; Leverage AI provides:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>In-person and virtual AI training workshops</li>
              <li>AI consulting and implementation services</li>
              <li>Educational content and resources about AI for professionals</li>
              <li>The AI Starter Pack and other digital products</li>
            </ul>
            <p className="mt-3">
              We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. Workshop Registration &amp; Attendance</h2>
            <p>
              When you register for a workshop, you agree to provide accurate and complete information including your name, email address, and phone number. Registration confirms your spot but does not guarantee attendance if capacity is reached.
            </p>
            <p className="mt-2">
              Free workshops are offered at no cost, but registered attendees who do not show up without notice may be deprioritized for future events. Paid workshops and services are subject to the payment and refund terms described below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. Payments &amp; Refunds</h2>
            <p>
              Payments for paid workshops, the AI Starter Pack, consulting services, and other offerings are processed securely through <strong className="text-white">Stripe</strong>. All prices are listed in US dollars.
            </p>
            <p className="mt-2">
              Refund requests for paid workshops must be made at least 48 hours before the scheduled event. Refunds for consulting engagements are handled on a case-by-case basis. Digital products (such as the AI Starter Pack) are non-refundable once delivered, except where required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. SMS &amp; Email Communications</h2>
            <p>
              By providing your phone number during registration, you consent to receive text messages (SMS) from Learn &amp; Leverage AI related to the workshop, including confirmations, reminders, and follow-up communications. Message and data rates may apply. Message frequency varies.
            </p>
            <p className="mt-2">
              <strong className="text-white">To opt out of SMS:</strong> Reply <strong className="text-amber-400">STOP</strong> to any message. For help, reply <strong className="text-amber-400">HELP</strong> or contact us at{" "}
              <a href="mailto:info@learnandleverageai.com" className="text-amber-400 hover:underline">info@learnandleverageai.com</a>.
            </p>
            <p className="mt-2">
              By providing your email address, you consent to receive email communications including workshop details, educational content, and occasional marketing messages. You can unsubscribe from marketing emails at any time using the unsubscribe link in any email.
            </p>
            <p className="mt-2">
              We use Twilio for SMS delivery and AgentMail for email delivery. Carriers are not liable for delayed or undelivered messages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
            <p>
              All content on this website and in our workshops -- including text, graphics, logos, presentations, workbooks, handouts, and other materials -- is the property of Dude Ventures Services LLC and is protected by copyright and intellectual property laws.
            </p>
            <p className="mt-2">
              Workshop attendees may use materials provided during workshops for their own personal or professional use. You may not reproduce, distribute, sell, or publicly display our materials without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. Use of the Website</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Submit false or misleading information through registration forms</li>
              <li>Interfere with or disrupt the website or its servers</li>
              <li>Scrape, crawl, or use automated tools to extract content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Third-Party Services</h2>
            <p>
              Our website and services integrate with third-party platforms including Google Analytics (GA4), PostHog, Meta Pixel, Stripe, GoHighLevel, Twilio, AgentMail, and Groq. Your use of our services may be subject to the terms and privacy policies of these third parties. We are not responsible for the practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">10. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not guarantee that AI tools, techniques, or strategies discussed in our workshops will produce specific results for your business. Results depend on many factors including your industry, implementation, and effort.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Dude Ventures Services LLC and its owners, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services, even if we have been advised of the possibility of such damages.
            </p>
            <p className="mt-2">
              Our total liability for any claim related to our services shall not exceed the amount you paid us for the specific service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Dude Ventures Services LLC from any claims, damages, losses, or expenses (including reasonable attorney&rsquo;s fees) arising from your use of our website or services, your violation of these terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">13. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the courts located in New Castle County, Delaware.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">14. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. When we do, we will update the effective date at the top of this page. Continued use of our website or services after changes are posted constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">15. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, contact us:</p>
            <ul className="mt-3 space-y-2">
              <li>
                <strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@learnandleverageai.com" className="text-amber-400 hover:underline">info@learnandleverageai.com</a>
              </li>
              <li>
                <strong className="text-white">Phone:</strong>{" "}
                <a href="tel:+13024166285" className="text-amber-400 hover:underline">(302) 416-6285</a>
              </li>
              <li>
                <strong className="text-white">Business:</strong> Dude Ventures Services LLC, Delaware, USA
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-[#1C1917] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-display text-base font-bold text-white mb-2">
            Learn &amp; Leverage <span className="text-amber-400">AI</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <Link href="/terms" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</Link>
            <span className="text-gray-600">|</span>
            <Link href="/privacy" className="font-body text-xs text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</Link>
          </div>
          <p className="font-body text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Learn &amp; Leverage AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
