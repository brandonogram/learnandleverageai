import type { Metadata } from "next";
import Script from "next/script";
import { PostHogProvider } from "@/lib/posthog";

export const metadata: Metadata = {
  title: "Free AI Workshop for Professionals — Wilmington, DE | Learn & Leverage AI",
  description:
    "Free half-day, hands-on AI workshop for corporate professionals in New Castle County, DE. Walk out with 3 AI tools working for your job. No tech experience needed. Saturday, 9 AM - 1 PM.",
  openGraph: {
    title: "Free AI Workshop — Your Boss Said Learn AI. We'll Show You How.",
    description:
      "Free half-day workshop for professionals in Wilmington, DE. Hands-on AI training — walk out with tools you can use Monday morning. No tech experience required.",
    url: "https://learnandleverageai.com/workshops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Workshop for Professionals — Wilmington, DE",
    description:
      "Your boss said learn AI. We'll show you how. Free hands-on workshop — walk out with 3 AI tools working for your job.",
  },
};

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Meta Pixel - Replace PIXEL_ID with your actual pixel ID */}
      <Script id="meta-pixel" strategy="afterInteractive">
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
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1494764092013977&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "AI Hands-On: Walk Out With 3 Tools Working For Your Job",
            description:
              "Free half-day, in-person AI workshop for corporate professionals. Hands-on training with ChatGPT, Claude, and automation tools. No tech experience needed.",
            startDate: "2026-04-05T09:00:00-04:00",
            endDate: "2026-04-05T13:00:00-04:00",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "Wilmington, DE Area (Venue TBA)",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wilmington",
                addressRegion: "DE",
                addressCountry: "US",
              },
            },
            organizer: {
              "@type": "Organization",
              name: "Learn & Leverage AI",
              url: "https://learnandleverageai.com",
            },
            performer: {
              "@type": "Person",
              name: "Brandon Calloway",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: "https://learnandleverageai.com/workshops",
            },
            isAccessibleForFree: true,
          }),
        }}
      />
      <PostHogProvider>
        {children}
      </PostHogProvider>
    </>
  );
}
