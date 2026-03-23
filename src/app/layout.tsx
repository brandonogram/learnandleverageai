import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learnandleverageai.com"),
  title: {
    default: "Learn & Leverage AI | AI Training for Professionals",
    template: "%s | Learn & Leverage AI",
  },
  description: "Hands-on AI training for corporate professionals. No tech experience needed. In-person workshops in Wilmington, Delaware.",
  keywords: ["corporate AI training", "professional development", "AI skills", "AI workshop", "Delaware", "Wilmington", "learn AI", "AI for business"],
  authors: [{ name: "Brandon Calloway" }],
  creator: "Learn & Leverage AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnandleverageai.com",
    siteName: "Learn & Leverage AI",
    title: "Learn & Leverage AI | AI Training for Professionals",
    description: "Hands-on AI training for corporate professionals. No tech experience needed. In-person workshops in Wilmington, Delaware.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn & Leverage AI | AI Training for Professionals",
    description: "Hands-on AI training for corporate professionals. No tech experience needed. In-person workshops in Wilmington, Delaware.",
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
      <body className="antialiased">
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
