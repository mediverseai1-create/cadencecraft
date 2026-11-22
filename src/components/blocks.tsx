import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Eyebrow, Section } from "./ui";
import { LogoMark } from "./Logo";

export const sampleLogos = ["Northwind", "Altura", "Brightpath", "Corvid", "Helix&Co", "Lumen", "Meridian", "Orbital", "Pinecrest", "Quanta", "Stratos", "Veridian"];

export function LogoStrip({ title }: { title?: string }) {
  const row = [...sampleLogos, ...sampleLogos];
  return (
    <div className="overflow-hidden py-10">
      {title && <p className="mb-8 text-center text-lg font-semibold">{title}</p>}
      <div className="flex w-max marquee gap-14 whitespace-nowrap">
        {row.map((l, i) => <span key={i} className="text-2xl font-semibold tracking-tight text-muted/70">{l}</span>)}
      </div>
    </div>
  );
}

export function ClosingBand({ title = "CadenceCraft agentic AI platform for revenue teams", tagline = "Agents that work every deal, every day, so your team can focus on the conversations that close." }: { title?: string; tagline?: string }) {
  return (
    <section className="band-night px-4 py-20 text-center text-white sm:px-8">
      <div className="mx-auto max-w-[780px]">
        <LogoMark className="mx-auto h-10 w-10" />
        <h2 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
        <p className="mt-4 text-white/80">{tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/signup">Sign up</Button>
          <Button href="/pricing" variant="outlineDark">View pricing info</Button>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, children, cta, visual }: { eyebrow: string; title: ReactNode; children?: ReactNode; cta?: ReactNode; visual?: ReactNode }) {
  return (
    <section className="dot-bg px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] md:text-[3.4rem]">{title}</h1>
          {children && <div className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed">{children}</div>}
          {cta && <div className="mt-8 flex flex-wrap items-center gap-5">{cta}</div>}
        </div>
        <div>{visual ?? <ProductMock />}</div>
      </div>
    </section>
  );
}

export function ProductMock() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-line bg-white p-5 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line pb-3 text-sm font-semibold"><LogoMark className="h-5 w-5" /> Home</div>
        <p className="mt-4 font-semibold">👋 Welcome back, Nick</p>
        <div className="mt-3 rounded-lg border border-brand/50 p-3 text-xs text-muted">Ask a question about the account…</div>
        <p className="mt-5 text-xs font-semibold">Upcoming meetings</p>
        {["Sync with GeoCorp / Discovery Call", "Pricing review / Northwind", "QBR prep / Altura"].map((m, i) => (
          <div key={m} className="mt-2 flex items-center justify-between rounded-lg border border-line px-3 py-2 text-xs">
            <span>{m}</span><span className="rounded bg-brand px-2 py-1 text-white">Join</span>
            <span className="sr-only">{i}</span>
          </div>
        ))}
      </div>
      <div className="float absolute -bottom-8 -left-6 w-56 rounded-xl border border-line bg-white p-3 shadow-xl">
        <p className="text-xs font-semibold">Video call</p>
        <div className="mt-2 grid grid-cols-2 gap-1"><div className="h-14 rounded bg-gradient-to-br from-[#c9b8ff] to-[#7b6bff]" /><div className="h-14 rounded bg-gradient-to-br from-[#ffd2b0] to-[#ff9a8b]" /></div>
      </div>
    </div>
  );
}

export function FeatureBlock({ eyebrow, title, body, bullets, href, reverse }: { eyebrow?: string; title: string; body: string; bullets?: string[]; href?: string; reverse?: boolean }) {
  return (
    <div className={`grid items-center gap-10 py-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div>
        {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
        <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{title}</h3>
        <p className="mt-4 leading-relaxed text-white/80">{body}</p>
        {bullets && <ul className="mt-5 space-y-2 text-white/85">{bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-[#8f89ff]">✦</span>{b}</li>)}</ul>}
        {href && <Link href={href} className="mt-6 inline-block font-semibold text-[#9d97ff] hover:underline">Learn more →</Link>}
      </div>
      <div className="card-dark p-6">
        <div className="grid grid-cols-3 gap-3">
          {[72, 48, 90, 35, 64, 80].map((h, i) => (
            <div key={i} className="flex h-32 items-end rounded-lg bg-white/5 p-2"><div className="w-full rounded bg-gradient-to-t from-brand to-[#a98bf5]" style={{ height: `${h}%` }} /></div>
          ))}
        </div>
        <div className="mt-4 h-2 w-2/3 rounded bg-white/15" /><div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function StatRow({ stats, dark = false }: { stats: { value: string; label: string }[]; dark?: boolean }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className={`text-4xl font-semibold ${dark ? "text-white" : "text-brand"}`}>{s.value}</p>
          <p className={`mt-2 ${dark ? "text-white/75" : "text-muted"}`}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function CardGrid({ items, cols = 3 }: { items: { title: string; body: string; href?: string }[]; cols?: 2 | 3 | 4 }) {
  const c = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-6 ${c}`}>
      {items.map((it) => {
        const inner = (<><h3 className="text-lg font-semibold">{it.title}</h3><p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{it.body}</p>{it.href && <p className="mt-5 font-semibold text-brand">Learn more →</p>}</>);
        return it.href ? <Link key={it.title} href={it.href} className="card-light block p-7">{inner}</Link> : <div key={it.title} className="card-light p-7">{inner}</div>;
      })}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, intro, center = true, dark = false }: { eyebrow?: string; title: string; intro?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "mx-auto max-w-[820px] text-center" : "max-w-[720px]"}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 text-3xl font-semibold leading-tight md:text-[2.5rem] ${dark ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 leading-relaxed ${dark ? "text-white/80" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

export function Testimonial({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <figure className="card-light p-8">
      <blockquote className="text-lg leading-relaxed">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-semibold text-white">{name[0]}</span>
        <span><span className="block font-semibold">{name}</span><span className="text-sm text-muted">{role}, {company}</span></span>
      </figcaption>
    </figure>
  );
}

export { Section };
