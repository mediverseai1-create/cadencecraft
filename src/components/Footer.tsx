import Link from "next/link";
import { Logo } from "./Logo";
import { footerCols } from "@/content/nav";

export function Footer() {
  return (
    <footer className="bg-black px-4 pb-10 pt-16 text-white sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[240px] text-sm text-white/70">The AI-native revenue platform for B2B teams. AI analyzes, predicts, decides and automates.</p>
            <Link href="/signup" className="mt-6 inline-block rounded bg-brand px-5 py-2.5 text-sm font-semibold">Sign up</Link>
          </div>
          {footerCols.map((c) => (
            <div key={c.title}>
              <p className="eyebrow mb-4 !text-[0.7rem] text-white/60">{c.title}</p>
              <ul className="space-y-2.5 text-sm">
                {c.links.map((l) => <li key={l.label}><Link href={l.href} className="text-white/85 hover:text-white">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© 2026 CadenceCraft, Inc. All rights reserved.</p>
          <p className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/security">Security</Link></p>
        </div>
      </div>
    </footer>
  );
}
