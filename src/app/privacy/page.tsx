import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Learn & Leverage AI. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Effective Date: March 24, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              Learn &amp; Leverage AI is operated by <strong className="text-white">Dude Ventures Services LLC</strong>, a Delaware limited liability company. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit{" "}
              <a href="https://learnandleverageai.com" className="text-amber-400 hover:underline">learnandleverageai.com</a>{" "}
              or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Information You Provide</h3>
            <p>When you register for a workshop, contact us, or use our services, we may collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-white">Name</strong> -- provided during workshop registration</li>
              <li><strong className="text-white">Email address</strong> -- for confirmations, reminders, and communications</li>
              <li><strong className="text-white">Phone number</strong> -- for SMS confirmations and reminders</li>
              <li><strong className="text-white">Payment information</strong> -- processed securely through Stripe (we do not store credit card numbers)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Information Collected Automatically</h3>
            <p>When you visit our website, we automatically collect certain information through cookies and similar technologies:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-white">Usage data</strong> -- pages visited, time spent, clicks, scroll depth</li>
              <li><strong className="text-white">Device information</strong> -- browser type, operating system, screen size</li>
              <li><strong className="text-white">Location data</strong> -- general geographic location based on IP address</li>
              <li><strong className="text-white">Referral data</strong> -- how you found our website (UTM parameters, referring sites)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Process and confirm your workshop registration</li>
              <li>Send you SMS confirmations and reminders about upcoming workshops</li>
              <li>Send you email confirmations, workshop details, and follow-up information</li>
              <li>Process payments for paid services</li>
              <li>Send occasional marketing emails about future workshops and services (with opt-out)</li>
              <li>Analyze website usage to improve our content and user experience</li>
              <li>Run targeted advertising campaigns to reach people who may benefit from our workshops</li>
              <li>Respond to your questions and provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. SMS Communications &amp; Consent</h2>
            <p>
              By providing your phone number during workshop registration, you consent to receive text messages (SMS) from Learn &amp; Leverage AI. These messages include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Registration confirmations</li>
              <li>Workshop reminders</li>
              <li>Event updates and logistics</li>
              <li>Follow-up messages after the workshop</li>
            </ul>
            <p className="mt-3">
              Message and data rates may apply. Message frequency varies but is typically 3-5 messages per event.
            </p>
            <p className="mt-2">
              <strong className="text-white">To stop receiving texts:</strong> Reply <strong className="text-amber-400">STOP</strong> to any message at any time.
            </p>
            <p className="mt-2">
              <strong className="text-white">For help:</strong> Reply <strong className="text-amber-400">HELP</strong> or email us at{" "}
              <a href="mailto:info@learnandleverageai.com" className="text-amber-400 hover:underline">info@learnandleverageai.com</a>.
            </p>
            <p className="mt-2">
              SMS messages are delivered through <strong className="text-white">Twilio</strong>. Carriers are not liable for delayed or undelivered messages. Your consent to receive SMS is not a condition of purchasing any service.
            </p>
            <p className="mt-3">
              <strong className="text-white">No sharing:</strong> We will never sell, rent, or share your phone number or SMS opt-in consent with any third parties for their marketing purposes. Your SMS opt-in information is used solely by Learn &amp; Leverage AI for the purposes described above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. Email Communications</h2>
            <p>
              By providing your email address, you consent to receive email communications from Learn &amp; Leverage AI. These include transactional emails (registration confirmations, workshop details) and marketing emails (future workshop announcements, AI tips).
            </p>
            <p className="mt-2">
              You can unsubscribe from marketing emails at any time by clicking the unsubscribe link at the bottom of any email. Transactional emails related to services you have registered for will continue until the service is complete.
            </p>
            <p className="mt-2">
              Emails are delivered through <strong className="text-white">AgentMail</strong> and <strong className="text-white">GoHighLevel</strong>.
            </p>
          </section>

          <section id="assessment">
            <h2 className="font-display text-xl font-semibold text-white mb-3">5a. AI Opportunity Assessment — Voice Intake &amp; Data Handling</h2>
            <p>
              Customers who purchase the AI Opportunity Assessment ($997 one-time) complete a 20-minute intake interview with our AI agent (currently named &ldquo;Emma&rdquo;) by phone. This section explains how that data is collected, processed, and stored.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">What we record</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Audio of the call is processed in real time by Twilio (telephony) and Groq (large language model) to produce a text transcript.</li>
              <li>The text transcript and conversation history are emailed to brandon@learnandleverageai.com so Brandon can produce your assessment report.</li>
              <li>We do not retain the raw audio of the call beyond what Twilio retains for its own billing and quality purposes (see the Twilio privacy policy at twilio.com/legal/privacy).</li>
              <li>The agent identifies itself as an AI at the start of the call, and you may end the call at any time.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">How we use the transcript</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>To prepare your custom assessment report (the deliverable you paid for).</li>
              <li>To improve our AI intake agent and our assessment process. We may quote anonymized excerpts internally for QA. We do not publish identifying excerpts publicly without your written permission.</li>
              <li>To follow up with you about the assessment (delivery, walkthrough booking, refund eligibility).</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Who can see your transcript</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Brandon Calloway and any contractor or employee under written confidentiality with Dude Ventures Services LLC.</li>
              <li>Twilio and Groq, as the processors that handle telephony and language-model inference for the call. They process the data as service providers and do not use it for their own marketing purposes.</li>
              <li>AgentMail, as the email delivery service that transports the transcript to brandon@learnandleverageai.com.</li>
              <li>We do not sell your transcript or share it with advertisers.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Manual (non-AI) intake option</h3>
            <p>
              If you would prefer to do your intake call with Brandon directly instead of with the AI agent, email{" "}
              <a href="mailto:brandon@learnandleverageai.com" className="text-amber-400 hover:underline">brandon@learnandleverageai.com</a>{" "}
              within 7 days of purchase. There is no additional charge.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Deletion</h3>
            <p>
              You may request deletion of your intake transcript and any derived report at any time by emailing the address above. Deletion will be completed within 5 business days, except where retention is required by law or for our legitimate accounting records (such as the Stripe transaction record for your purchase).
            </p>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Refund and consumer rights</h3>
            <p>
              See the <Link href="/terms#assessment-refund" className="text-amber-400 hover:underline">Assessment Refund Terms</Link> in our Terms of Service for the 5-hour-a-week refund guarantee, the 30-day request window, and the no-fit-no-charge policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. Cookies &amp; Tracking Technologies</h2>
            <p>We use the following cookies and tracking technologies on our website:</p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 pr-4 text-white font-semibold">Service</th>
                    <th className="text-left py-2 pr-4 text-white font-semibold">Purpose</th>
                    <th className="text-left py-2 text-white font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4">Google Analytics (GA4)</td>
                    <td className="py-2 pr-4">Website traffic analysis, user behavior</td>
                    <td className="py-2">Analytics</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4">PostHog</td>
                    <td className="py-2 pr-4">Product analytics, session recordings, feature flags</td>
                    <td className="py-2">Analytics</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4">Meta Pixel</td>
                    <td className="py-2 pr-4">Advertising measurement, retargeting</td>
                    <td className="py-2">Advertising</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 pr-4">Vercel Analytics</td>
                    <td className="py-2 pr-4">Performance monitoring</td>
                    <td className="py-2">Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or alert you when cookies are being sent. Note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. Third-Party Services</h2>
            <p>We share your information with the following third-party services to operate our business:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-white">Stripe</strong> -- Payment processing (handles your credit card data directly; we never see or store card numbers)</li>
              <li><strong className="text-white">GoHighLevel</strong> -- Customer relationship management (CRM), email/SMS automation</li>
              <li><strong className="text-white">Twilio</strong> -- SMS message delivery</li>
              <li><strong className="text-white">AgentMail</strong> -- Email delivery</li>
              <li><strong className="text-white">Google Analytics (GA4)</strong> -- Website analytics</li>
              <li><strong className="text-white">PostHog</strong> -- Product analytics</li>
              <li><strong className="text-white">Meta (Facebook/Instagram)</strong> -- Advertising and conversion tracking</li>
              <li><strong className="text-white">Groq</strong> -- AI-powered responses for chat and automation features</li>
              <li><strong className="text-white">Vercel</strong> -- Website hosting and performance analytics</li>
            </ul>
            <p className="mt-3">
              Each of these services has its own privacy policy governing how they handle your data. We only share the minimum information necessary for each service to function.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. Specifically:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-white">Registration data</strong> -- Retained for the duration of our business relationship and up to 3 years after your last interaction</li>
              <li><strong className="text-white">Payment records</strong> -- Retained as required by tax and accounting laws (typically 7 years)</li>
              <li><strong className="text-white">Analytics data</strong> -- Retained according to each analytics platform&rsquo;s default retention settings</li>
            </ul>
            <p className="mt-2">You can request deletion of your data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data transmission. Payment data is handled entirely by Stripe&rsquo;s PCI-compliant infrastructure.
            </p>
            <p className="mt-2">
              However, no method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">10. Your Rights</h2>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">All Users</h3>
            <p>Regardless of where you are located, you have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing emails (via unsubscribe link)</li>
              <li>Opt out of SMS messages (reply STOP)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">California Residents (CCPA)</h3>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-white">Right to know</strong> -- You can request details about the categories and specific pieces of personal information we have collected about you</li>
              <li><strong className="text-white">Right to delete</strong> -- You can request that we delete the personal information we have collected from you</li>
              <li><strong className="text-white">Right to opt out of sale</strong> -- We do not sell your personal information. If this changes, we will provide a &ldquo;Do Not Sell My Personal Information&rdquo; link</li>
              <li><strong className="text-white">Right to non-discrimination</strong> -- We will not discriminate against you for exercising your CCPA rights</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">European Residents (GDPR)</h3>
            <p>If you are located in the European Economic Area (EEA) or United Kingdom, you have additional rights under the GDPR:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li><strong className="text-white">Right to portability</strong> -- You can request your data in a portable format</li>
              <li><strong className="text-white">Right to restrict processing</strong> -- You can ask us to limit how we use your data</li>
              <li><strong className="text-white">Right to object</strong> -- You can object to our processing of your data for certain purposes</li>
              <li><strong className="text-white">Right to withdraw consent</strong> -- You can withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="mt-2">
              Our legal basis for processing your data is: consent (for marketing and SMS), contract performance (for services you register for), and legitimate interest (for analytics and website improvement).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">11. Children&rsquo;s Privacy</h2>
            <p>
              Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child under 18, we will delete it promptly. If you believe a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">12. Do Not Track Signals</h2>
            <p>
              Our website does not currently respond to &ldquo;Do Not Track&rdquo; (DNT) browser signals. However, you can use browser settings and extensions to manage tracking technologies as described in the Cookies section above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">14. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or want to exercise your data rights, contact us:</p>
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
