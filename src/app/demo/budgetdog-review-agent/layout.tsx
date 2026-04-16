import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budgetdog Review Agent — Product Demo",
  description: "AI-powered financial review pipeline for Budgetdog Academy. Your framework, your templates, your voice — at 10x the speed.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
