import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: { default: "CadenceCraft | Agentic AI Platform for Revenue Teams", template: "%s | CadenceCraft" },
  description: "Stop buying software. Start hiring AI agents. CadenceCraft is the agentic AI platform for revenue teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body>{children}</body>
    </html>
  );
}
