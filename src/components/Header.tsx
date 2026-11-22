"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { platformNav, useCaseNav, whyNav, resourceGroups } from "@/content/nav";

type MenuKey = "why" | "platform" | "use" | "resources" | null;

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
  const linkCls = "flex items-center gap-3 rounded-lg px-3 py-2 text-[0.95rem] font-medium text-brand hover:bg-lavender";
  const mobileGroups: [string, { label: string; href: string }[]][] = [
    ["Why CadenceCraft?", whyNav],
    ["Platform", platformNav],
    ["Use Cases", useCaseNav],
    ["Resources", resourceGroups.flatMap((g) => g.links)],
  ];

  return (
    <header className="sticky top-0 z-50 bg-black" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-4 sm:px-8">
        <Link href="/" onClick={close} aria-label="CadenceCraft home"><Logo /></Link>
        <nav className="hidden items-center gap-6 whitespace-nowrap xl:flex lg:gap-8" aria-label="Main">
          {trigger("why", "Why CadenceCraft?")}
          {trigger("platform", "Platform")}
          {trigger("use", "Use Cases")}
          {trigger("resources", "Resources")}
          <Link href="/pricing" className="text-[0.95rem] font-medium text-white">Pricing</Link>
        </nav>
        <div className="hidden items-center gap-5 xl:flex">
          <Link href="/login" className="font-medium text-white">Sign in</Link>
          <Link href="/signup" className="rounded-[4px] bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark">Sign up</Link>
        </div>
        <button className="text-white xl:hidden" aria-label="Toggle menu" onClick={() => setMobile(!mobile)}>
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[68px] hidden xl:block">
          <div className="mx-auto max-w-[1320px] px-8">
            {open === "platform" && (
              <div className="ml-[28%] w-[560px] rounded-2xl bg-white p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-x-4">
                  {platformNav.map((l) => <Link key={l.href} href={l.href} onClick={close} className={linkCls}>{l.label}</Link>)}
                </div>
              </div>
            )}
            {open === "use" && (
              <div className="ml-[40%] w-[300px] rounded-2xl bg-white p-4 shadow-xl">
                {useCaseNav.map((l) => <Link key={l.href} href={l.href} onClick={close} className={linkCls}>{l.label}</Link>)}
              </div>
            )}
            {open === "why" && (
              <div className="ml-[22%] w-[300px] rounded-2xl bg-white p-4 shadow-xl">
                {whyNav.map((l) => <Link key={l.label} href={l.href} onClick={close} className={linkCls}>{l.label}</Link>)}
              </div>
            )}
            {open === "resources" && (
              <div className="mx-auto grid w-full max-w-[900px] grid-cols-3 gap-8 rounded-2xl bg-white p-8 shadow-xl">
                {resourceGroups.map((g) => (
                  <div key={g.title}>
                    <p className="eyebrow mb-4 !text-[0.7rem] text-muted">{g.title}</p>
                    {g.links.map((l) => (
                      <Link key={l.label} href={l.href} onClick={close} className="mb-4 block">
                        <span className="font-semibold text-brand">{l.label}</span>
                        <span className="block text-sm text-ink">{l.desc}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {mobile && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto bg-black px-4 pb-8 xl:hidden">
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
