import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Webinar: AI for Contractors — Stop Losing Money to Missed Calls",
  description: "Free live training Feb 27 at 2pm EST. See how contractors use AI to answer every call, book more jobs, and stop wasting nights on paperwork. No tech skills needed.",
  openGraph: {
    title: "Free Webinar: AI for Contractors — Stop Losing Money to Missed Calls",
    description: "Free live training Feb 27 at 2pm EST. See how contractors use AI to answer every call, book more jobs, and stop wasting nights on paperwork.",
    url: "https://learnandleverageai.com/event",
  },
  other: {
    "script:structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "AI for Contractors: Stop Losing Money to Missed Calls & Manual Work",
      "description": "Free 45-minute live training with demos. See how contractors use AI to answer every call, generate social media content, and save 10+ hours per week.",
      "startDate": "2026-02-27T14:00:00-05:00",
      "endDate": "2026-02-27T15:00:00-05:00",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://learnandleverageai.com/event"
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
        "availability": "https://schema.org/InStock",
        "url": "https://learnandleverageai.com/event"
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
            "name": "AI for Contractors: Stop Losing Money to Missed Calls & Manual Work",
            "description": "Free 45-minute live training with demos for contractors and home service businesses.",
            "startDate": "2026-02-27T14:00:00-05:00",
            "endDate": "2026-02-27T15:00:00-05:00",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "VirtualLocation",
              "url": "https://learnandleverageai.com/event"
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
              "availability": "https://schema.org/InStock",
              "url": "https://learnandleverageai.com/event"
            },
            "isAccessibleForFree": true
          }),
        }}
      />
      {children}
    </>
  );
}
