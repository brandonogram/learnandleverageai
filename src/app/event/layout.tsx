import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Workshop — Learn & Leverage AI",
  description: "Free hands-on AI workshops for professionals in Delaware and Greater Philadelphia. Small group, in-person. Next session date and location TBA — join the waitlist.",
  openGraph: {
    title: "Free AI Workshop — Learn & Leverage AI",
    description: "Free hands-on AI workshops for professionals in Delaware and Greater Philadelphia. Small group, in-person. Next session TBA — join the waitlist.",
    url: "https://learnandleverageai.com/workshops",
  },
  other: {
    "script:structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "Free AI Hands-On Workshop — See What AI Can Actually Do For Your Job",
      "description": "Free hands-on AI workshop for professionals. Small group (10-15), in-person in Delaware and Greater Philadelphia. Bring your laptop, leave with AI tools working for your job.",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventPostponed",
      "location": {
        "@type": "Place",
        "name": "TBA — Delaware & Greater Philadelphia area",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "DE"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Learn & Leverage AI",
        "url": "https://learnandleverageai.com"
      },
      "performer": {
        "@type": "Person",
        "name": "Brandon Calloway"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder",
        "url": "https://learnandleverageai.com/workshops"
      },
      "isAccessibleForFree": true
    }),
  },
};

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            "name": "Free AI Hands-On Workshop — See What AI Can Actually Do For Your Job",
            "description": "Free hands-on AI workshop for professionals. Small group (10-15), in-person in Delaware and Greater Philadelphia. Bring your laptop, leave with AI tools working for your job.",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventPostponed",
            "location": {
              "@type": "Place",
              "name": "TBA — Delaware & Greater Philadelphia area",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "DE"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "Learn & Leverage AI",
              "url": "https://learnandleverageai.com"
            },
            "performer": {
              "@type": "Person",
              "name": "Brandon Calloway"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/PreOrder",
              "url": "https://learnandleverageai.com/workshops"
            },
            "isAccessibleForFree": true
          }),
        }}
      />
      {children}
    </>
  );
}
