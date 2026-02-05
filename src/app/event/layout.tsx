import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Event for Home Service Businesses | Learn & Leverage AI",
  description: "Free 60-minute live event: Discover how HVAC, plumbing, electrical, pool, landscaping, and roofing companies are using AI to answer every call, book more jobs, and save 15+ hours per week.",
  openGraph: {
    title: "Free AI Event for Home Service Businesses",
    description: "60-minute live event: How home service businesses are using AI to answer every call, book more jobs, and save 15+ hours per week. February 20 at 2:00 PM EST.",
    url: "https://learnandleverageai.com/event",
  },
  other: {
    "script:structured-data": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        "name": "AI for Home Service Businesses: A Practical Guide",
        "description": "Free 60-minute live event for HVAC, plumbing, electrical, pool, landscaping, and roofing company owners. Learn how AI can help your business answer every call, book more jobs, and save 15+ hours per week.",
        "startDate": "2026-02-20T14:00:00-05:00",
        "endDate": "2026-02-20T15:00:00-05:00",
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
          "availability": "https://schema.org/LimitedAvailability",
          "url": "https://learnandleverageai.com/event"
        },
        "maximumAttendeeCapacity": 50,
        "isAccessibleForFree": true
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need any technical background?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely not. This presentation is specifically designed for home service business owners who don't consider themselves technical."
            }
          },
          {
            "@type": "Question",
            "name": "Is this just a sales pitch for AI software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. This is educational content designed to help you make informed decisions—including the decision to wait or do nothing if that's right for your business."
            }
          },
          {
            "@type": "Question",
            "name": "Will this apply to my type of business?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We cover real examples from HVAC, plumbing, electrical, pool service, landscaping, roofing, and other home service businesses."
            }
          },
          {
            "@type": "Question",
            "name": "Is AI really relevant for a small home service company?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Especially for small companies. An AI receptionist can answer calls 24/7 for a fraction of what a full-time office person costs. Automated scheduling and follow-ups can save 10-15 hours per week."
            }
          }
        ]
      }
    ]),
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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "EducationEvent",
              "name": "AI for Home Service Businesses: A Practical Guide",
              "description": "Free 60-minute live event for home service company owners.",
              "startDate": "2026-02-20T14:00:00-05:00",
              "endDate": "2026-02-20T15:00:00-05:00",
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
                "availability": "https://schema.org/LimitedAvailability",
                "url": "https://learnandleverageai.com/event"
              },
              "maximumAttendeeCapacity": 50,
              "isAccessibleForFree": true
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Do I need any technical background?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely not. This presentation is specifically designed for home service business owners who don't consider themselves technical."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this just a sales pitch for AI software?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. This is educational content designed to help you make informed decisions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will this apply to my type of business?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We cover real examples from HVAC, plumbing, electrical, pool service, landscaping, roofing, and other home service businesses."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is AI really relevant for a small home service company?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Especially for small companies. An AI receptionist can answer calls 24/7 for a fraction of what a full-time office person costs."
                  }
                }
              ]
            }
          ]),
        }}
      />
      {children}
    </>
  );
}
