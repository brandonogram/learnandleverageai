import type { Metadata } from "next";
import Script from "next/script";
import { PostHogProvider } from "@/lib/posthog";

export const metadata: Metadata = {
  title: "Free AI Workshop — Hands-On Training | Learn & Leverage AI",
  description:
    "Free 2-hour hands-on AI workshop for corporate professionals in Delaware and Greater Philadelphia. Walk out with 3 AI tools working for your job. No tech experience needed. Join the waitlist.",
  openGraph: {
    title: "Free AI Workshop — Hands-On Training for Professionals",
    description:
      "Free 2-hour workshop for professionals. Hands-on AI training — walk out with tools you can use Monday morning. No tech experience required. Join the waitlist.",
    url: "https://learnandleverageai.com/workshops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Workshop — Hands-On Training | Learn & Leverage AI",
    description:
      "Your boss said learn AI. We'll show you how. Free hands-on workshop — walk out with 3 AI tools working for your job. Join the waitlist.",
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

      {/* Structured Data — Organization (not event-specific until next date is set) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Learn & Leverage AI",
            url: "https://learnandleverageai.com",
            description:
              "Free hands-on AI workshops for corporate professionals in Delaware and Greater Philadelphia. No tech experience needed.",
            founder: {
              "@type": "Person",
              name: "Brandon Calloway",
            },
            areaServed: [
              {
                "@type": "State",
                name: "Delaware",
              },
              {
                "@type": "City",
                name: "Philadelphia",
                containedInPlace: {
                  "@type": "State",
                  name: "Pennsylvania",
                },
              },
            ],
            image: "https://learnandleverageai.com/images/linkedin-ad-workshop.png",
            keywords: ["AI workshop", "artificial intelligence training", "free workshop", "Delaware", "Philadelphia", "professional development", "beginner AI"],
          }),
        }}
      />
      <PostHogProvider>
        {children}
      </PostHogProvider>
    </>
  );
}
