import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learnandleverageai.com"),
  title: "Learn & Leverage AI | Practical AI Solutions for Business",
  description: "Helping business owners understand and implement AI without the complexity. Practical AI education and consulting for growing businesses.",
  keywords: ["AI for business", "AI consulting", "business automation", "AI training", "practical AI"],
  authors: [{ name: "Brandon Calloway" }],
  creator: "Learn & Leverage AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnandleverageai.com",
    siteName: "Learn & Leverage AI",
    title: "Learn & Leverage AI | Practical AI Solutions for Business",
    description: "Helping business owners understand and implement AI without the complexity.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn & Leverage AI | Practical AI Solutions for Business",
    description: "Practical AI education and consulting for growing businesses.",
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
        {children}
      </body>
    </html>
  );
}
