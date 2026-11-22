import Link from "next/link";
import type { ReactNode } from "react";

export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "outlineDark" | "ghost"; className?: string }) {
  const base = "inline-flex items-center justify-center rounded-[4px] px-5 py-3 text-[0.95rem] font-semibold transition-colors";
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    outline: "border border-brand text-brand hover:bg-brand hover:text-white",
    outlineDark: "border border-white/40 text-white hover:bg-white/10 bg-[#1d1065]",
    ghost: "text-ink hover:text-brand",
  }[variant];
  return <Link href={href} className={`${base} ${styles} ${className}`}>{children}</Link>;
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`eyebrow ${dark ? "text-white" : "text-ink"}`}>{children}</p>;
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`px-4 py-16 sm:px-8 md:py-24 ${className}`}><div className="mx-auto max-w-[1200px]">{children}</div></section>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="font-semibold text-brand underline-offset-4 hover:underline">{children} →</Link>;
}
