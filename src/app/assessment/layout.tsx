import type { Metadata } from "next";
import Script from "next/script";
import { PostHogProvider } from "@/lib/posthog";

export const metadata: Metadata = {
  title: "AI Opportunity Assessment — $997 | Learn & Leverage AI",
  description:
    "A custom AI plan for your business, delivered in 48 hours. One 20-minute call, a PDF report with specific tools and dollar impact. Built by Brandon — who's run AI in three of his own businesses.",
  openGraph: {
    title: "AI Opportunity Assessment — $997 | Learn & Leverage AI",
    description:
      "Get a custom AI plan for your Delaware business in 48 hours. One call, one report, one walkthrough — with a 5-hour-a-week time-savings guarantee.",
    url: "https://learnandleverageai.com/assessment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Opportunity Assessment — $997",
    description:
      "A custom AI plan for your business in 48 hours. Specific tools, install steps, and dollar impact — not theory.",
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="meta-pixel-assessment" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1494764092013977');
          fbq('track', 'PageView');
        `}
      </Script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Opportunity Assessment",
            provider: {
              "@type": "Organization",
              name: "Learn & Leverage AI",
              url: "https://learnandleverageai.com",
            },
            description:
              "A custom AI plan for your business delivered in 48 hours. One 20-minute voice-agent call, a PDF report with specific tool recommendations and financial impact, and a 30-minute walkthrough call.",
            areaServed: {
              "@type": "State",
              name: "Delaware",
            },
            offers: {
              "@type": "Offer",
              price: "997",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: "https://learnandleverageai.com/assessment",
            },
          }),
        }}
      />
      <PostHogProvider>{children}</PostHogProvider>
    </>
  );
}
