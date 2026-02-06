import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Concierge — Personal AI Systems for Executives",
  description: "Custom AI systems built for busy executives and founders. Email automation, meeting prep, knowledge bases, and more — built in a day, tailored to your workflow. Starting at $5,000.",
  openGraph: {
    title: "AI Concierge — Personal AI Systems for Executives",
    description: "I show up. I learn your world. I build your AI systems. Custom AI workflows for executives and founders who don't have 40 hours to figure it out themselves.",
    url: "https://learnandleverageai.com/concierge",
  },
  other: {
    "script:structured-data": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Concierge — Personal AI Systems",
        "description": "Custom AI systems built for executives and founders. Email triage, meeting prep, personal knowledge bases, voice-to-action routing, and more.",
        "provider": {
          "@type": "Person",
          "name": "Brandon Calloway",
          "jobTitle": "AI Concierge",
          "worksFor": {
            "@type": "Organization",
            "name": "Learn & Leverage AI",
            "url": "https://learnandleverageai.com"
          }
        },
        "serviceType": "AI Consulting & Implementation",
        "areaServed": "US",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Concierge Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "AI Jumpstart",
              "price": "5000",
              "priceCurrency": "USD",
              "description": "Full-day working session. 3-5 custom AI workflows. 30 days support."
            },
            {
              "@type": "Offer",
              "name": "AI Operating System",
              "price": "15000",
              "priceCurrency": "USD",
              "description": "Complete AI infrastructure built over 2-4 weeks. Personal CRM, content engine, decision support, custom agents. Plus $1,500/mo retainer."
            },
            {
              "@type": "Offer",
              "name": "Fractional AI Chief of Staff",
              "price": "5000",
              "priceCurrency": "USD",
              "description": "Ongoing AI partnership. Weekly check-ins, proactive workflow builds, team training. $5,000/month, 6-month minimum."
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does the discovery call look like?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 30-minute conversation where I learn about your workflow, tools, and biggest time drains. No pitch — just questions. If we're a fit, I'll send a blueprint of what I'd build."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work in-person or virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Both. Build days can happen at your office or over Zoom. Virtual clients get the same white-glove experience with screen sharing, recorded walkthroughs, and real-time collaboration."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle data security?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every engagement starts with an NDA. I use enterprise-grade tools, never store your data on personal devices, and build systems that keep your information within platforms you already trust."
            }
          },
          {
            "@type": "Question",
            "name": "How is this different from hiring a virtual assistant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A VA handles tasks one at a time. AI systems handle categories of tasks automatically, 24/7. I build the systems; your VA (or EA) becomes 10x more effective using them."
            }
          }
        ]
      }
    ]),
  },
};

export default function ConciergeLayout({
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
              "@type": "Service",
              "name": "AI Concierge — Personal AI Systems",
              "description": "Custom AI systems built for executives and founders.",
              "provider": {
                "@type": "Person",
                "name": "Brandon Calloway",
                "jobTitle": "AI Concierge",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Learn & Leverage AI",
                  "url": "https://learnandleverageai.com"
                }
              },
              "serviceType": "AI Consulting & Implementation",
              "areaServed": "US",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Concierge Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "name": "AI Jumpstart",
                    "price": "5000",
                    "priceCurrency": "USD"
                  },
                  {
                    "@type": "Offer",
                    "name": "AI Operating System",
                    "price": "15000",
                    "priceCurrency": "USD"
                  },
                  {
                    "@type": "Offer",
                    "name": "Fractional AI Chief of Staff",
                    "price": "5000",
                    "priceCurrency": "USD"
                  }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does the discovery call look like?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A 30-minute conversation where I learn about your workflow, tools, and biggest time drains. No pitch — just questions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you work in-person or virtually?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Both. Build days can happen at your office or over Zoom. Virtual clients get the same white-glove experience."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do you handle data security?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every engagement starts with an NDA. I use enterprise-grade tools and never store your data on personal devices."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is this different from hiring a virtual assistant?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A VA handles tasks one at a time. AI systems handle categories of tasks automatically, 24/7."
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
