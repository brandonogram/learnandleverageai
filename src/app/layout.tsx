import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learnandleverageai.com"),
  title: {
    default: "Learn & Leverage AI | AI Solutions for Home Service Businesses",
    template: "%s | Learn & Leverage AI",
  },
  description: "Helping home service business owners understand and implement AI—without the complexity. AI receptionists, workflow automation, and operational systems for HVAC, plumbing, electrical, pool, landscaping, and roofing companies.",
  keywords: ["AI for home services", "AI receptionist", "HVAC automation", "plumbing business AI", "home service automation", "AI consulting", "business automation", "AI training"],
  authors: [{ name: "Brandon Calloway" }],
  creator: "Learn & Leverage AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnandleverageai.com",
    siteName: "Learn & Leverage AI",
    title: "Learn & Leverage AI | AI Solutions for Home Service Businesses",
    description: "Helping home service business owners implement AI—without the complexity. Free live event for HVAC, plumbing, electrical, pool, landscaping, and roofing companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn & Leverage AI | AI for Home Service Businesses",
    description: "Free live event: How home service businesses are using AI to answer every call, book more jobs, and save 15+ hours per week.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EZ5QMDJ5R6"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EZ5QMDJ5R6');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
