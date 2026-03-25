import type { Metadata } from "next";
import Script from "next/script";
import { PostHogProvider } from "@/lib/posthog";

export const metadata: Metadata = {
  title: "Free AI Workshop — Thursday, April 2 | Hilton Wilmington/Christiana | Learn & Leverage AI",
  description:
    "Free 2-hour hands-on AI workshop for corporate professionals in Newark, DE. Thursday, April 2, 6-8 PM at Hilton Wilmington/Christiana. Walk out with 3 AI tools working for your job. No tech experience needed.",
  openGraph: {
    title: "Free AI Workshop — Thursday, April 2 at Hilton Wilmington/Christiana",
    description:
      "Free 2-hour workshop for professionals in Newark, DE. Thursday, April 2, 6-8 PM. Hands-on AI training — walk out with tools you can use Monday morning. No tech experience required.",
    url: "https://learnandleverageai.com/workshops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Workshop — Thursday, April 2 | Newark, DE",
    description:
      "Your boss said learn AI. We'll show you how. Free hands-on workshop April 2 at Hilton Wilmington/Christiana — walk out with 3 AI tools working for your job.",
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
            startDate: "2026-04-02T22:00:00Z",
            endDate: "2026-04-03T00:00:00Z",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "Hilton Wilmington/Christiana",
              address: {
                "@type": "PostalAddress",
                streetAddress: "100 Continental Dr",
                addressLocality: "Newark",
                addressRegion: "DE",
                postalCode: "19713",
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
