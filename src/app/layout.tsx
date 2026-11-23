import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: { default: "CadenceCraft | AI-native revenue platform for B2B teams", template: "%s | CadenceCraft" },
  description: "CadenceCraft is the AI-native revenue platform for B2B teams. AI analyzes accounts and calls, predicts outcomes, decides the next action and automates the work.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body>{children}</body>
    </html>
  );
}
