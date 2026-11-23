"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { platformNav, useCaseNav, whyNav } from "@/content/nav";

type MenuKey = "why" | "platform" | "use" | null;

export function Header() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const trigger = (key: Exclude<MenuKey, null>, label: string) => (
    <button
      onMouseEnter={() => setOpen(key)}
      onClick={() => setOpen(open === key ? null : key)}
      aria-expanded={open === key}
      className={`flex items-center gap-1 whitespace-nowrap text-[0.95rem] font-medium ${open === key ? "text-[#8f89ff]" : "text-white"}`}
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition-transform ${open === key ? "rotate-180" : ""}`} />
    </button>
  );
  const close = () => { setOpen(null); setMobile(false); };
  const linkCls = "block rounded-lg px-3 py-2 text-[0.95rem] font-medium text-brand hover:bg-lavender";
  const mobileGroups: [string, { label: string; href: string }[]][] = [
    ["Why CadenceCraft?", whyNav],
    ["Platform", platformNav],
    ["Use Cases", useCaseNav],
  ];

  return (
    <header className="sticky top-0 z-50 bg-black" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-4 sm:px-8">
        <Link href="/" onClick={close} aria-label="CadenceCraft home"><Logo /></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {trigger("why", "Why CadenceCraft?")}
          {trigger("platform", "Platform")}
          {trigger("use", "Use Cases")}
          <Link href="/pricing" className="text-[0.95rem] font-medium text-white">Pricing</Link>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/login" className="font-medium text-white">Sign in</Link>
          <Link href="/signup" className="rounded-[4px] bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark">Sign up</Link>
        </div>
        <button className="text-white lg:hidden" aria-label="Toggle menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[68px] hidden lg:block">
          <div className="mx-auto max-w-[1320px] px-8">
            {open === "platform" && (
              <div className="ml-[22%] w-[560px] rounded-2xl bg-white p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-x-4">
                  {platformNav.map((l) => <Link key={l.href} href={l.href} onClick={close} className={linkCls}>{l.label}</Link>)}
                </div>
              </div>
            )}
            {open === "use" && (
              <div className="ml-[36%] w-[300px] rounded-2xl bg-white p-4 shadow-xl">
                {useCaseNav.map((l) => <Link key={l.href} href={l.href} onClick={close} className={linkCls}>{l.label}</Link>)}
              </div>
            )}
            {open === "why" && (
              <div className="ml-[14%] w-[300px] rounded-2xl bg-white p-4 shadow-xl">
                {whyNav.map((l) => <Link key={l.label} href={l.href} onClick={close} className={linkCls}>{l.label}</Link>)}
              </div>
            )}
          </div>
        </div>
      )}

      {mobile && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto bg-black px-4 pb-8 lg:hidden">
          {mobileGroups.map(([title, links]) => (
            <details key={title} className="border-b border-white/15 py-3 text-white">
              <summary className="cursor-pointer font-medium">{title}</summary>
              <div className="mt-2 flex flex-col gap-2 pl-3">
                {links.map((l) => (
                  <Link key={l.label} href={l.href} onClick={close} className="py-1 text-white/80">{l.label}</Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="/pricing" onClick={close} className="block border-b border-white/15 py-3 font-medium text-white">Pricing</Link>
          <div className="mt-5 flex gap-3">
            <Link href="/login" onClick={close} className="flex-1 rounded border border-white/40 py-3 text-center text-white">Sign in</Link>
            <Link href="/signup" onClick={close} className="flex-1 rounded bg-brand py-3 text-center font-semibold text-white">Sign up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
