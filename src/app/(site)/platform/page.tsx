import type { Metadata } from "next";
import Link from "next/link";
import { modules, useCases } from "@/content/modules";
import { Accordion } from "@/components/Accordion";
import { Button, Section } from "@/components/ui";
import { CardGrid, ClosingBand, PageHero, SectionTitle, StatRow } from "@/components/blocks";

export const metadata: Metadata = { title: "The AI-native platform for revenue" };

const industries = ["IT Services and Software", "Business Services", "Financial Services", "Retail", "Manufacturing", "Telecommunications", "Logistics", "Insurance"];

export default function PlatformPage() {
  return (
    <main>
      <PageHero eyebrow="What is CadenceCraft?" title="The AI-native platform purpose-built for revenue." cta={<Button href="/signup">Sign up</Button>}>
        <p>CadenceCraft unifies prospect engagement, deal execution, coaching and revenue intelligence on one AI engine. The engine analyzes accounts and conversations, predicts outcomes, decides the next best action and automates the work.</p>
        <p className="mt-4 rounded-lg bg-white/70 p-3 text-sm">Governed by design: human approval, audit logs and credit limits on every agent.</p>
      </PageHero>
      <Section>
        <SectionTitle eyebrow="Key capabilities of CadenceCraft" title="Nine capabilities. One AI engine." />
        <CardGrid items={modules.slice(0, 9).map((m) => ({ title: m.title, body: m.tagline, href: `/platform/${m.slug}` }))} />
      </Section>
      <Section className="dot-bg">
        <SectionTitle eyebrow="Platform benefits" title="What an AI-native platform delivers" intro="Conventional tools store data and wait for people to act. CadenceCraft’s AI does the follow-through, with your approval, on the work that consumes a seller’s day." />
        <StatRow stats={[{ value: "10 hrs", label: "saved per rep each week" }, { value: "3x", label: "higher reply rates" }, { value: "99%", label: "faster speed to lead" }]} />
        <p className="mt-6 text-center text-sm text-muted">Target outcomes for teams running agents across the full lifecycle.</p>
      </Section>
      <Section>
        <SectionTitle title="Trust is built into the platform" />
        <div className="flex flex-wrap justify-center gap-8 font-semibold">{[["Security", "/security"], ["Privacy", "/privacy"], ["Governance", "/security"]].map(([l, h]) => <Link key={l} href={h} className="text-brand">{l}</Link>)}</div>
      </Section>
      <Section className="dot-bg">
        <SectionTitle title="Solutions for every revenue team and industry" />
        <div className="mx-auto max-w-[860px]"><Accordion items={useCases.map((u) => ({ title: u.title, body: <>{u.pitch} <Link className="font-semibold text-brand" href={`/use-cases/${u.slug}`}>{u.title} solutions</Link></> }))} /></div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">{industries.map((i) => <span key={i} className="rounded-full border border-line bg-white px-4 py-2 text-sm">{i}</span>)}</div>
      </Section>
      <ClosingBand />
    </main>
  );
}
