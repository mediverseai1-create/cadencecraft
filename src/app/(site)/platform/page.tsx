import type { Metadata } from "next";
import Link from "next/link";
import { modules, useCases } from "@/content/modules";
import { Accordion } from "@/components/Accordion";
import { Button, Section } from "@/components/ui";
import { CardGrid, ClosingBand, LogoStrip, PageHero, SectionTitle, StatRow, Testimonial } from "@/components/blocks";

export const metadata: Metadata = { title: "The complete agentic AI platform for revenue" };

const industries = ["IT Services & Software", "Business Services", "Financial Services", "Retail", "Manufacturing", "Telecommunications", "Logistics", "Insurance"];

export default function PlatformPage() {
  return (
    <main>
      <PageHero eyebrow="What is CadenceCraft?" title="The complete agentic AI platform purpose-built for revenue." cta={<Button href="/demo">Request demo</Button>}>
        <p>CadenceCraft unifies prospect engagement, deal execution, coaching and revenue intelligence with integrated AI agents that can autonomously execute the work.</p>
        <p className="mt-4 rounded-lg bg-white/70 p-3 text-sm">Responsible AI: human approval, audit logs and credit limits on every agent.</p>
      </PageHero>
      <Section>
        <SectionTitle eyebrow="Key capabilities of CadenceCraft" title="More than just prospecting…" />
        <CardGrid items={modules.slice(0, 9).map((m) => ({ title: m.title, body: m.tagline, href: `/platform/${m.slug}` }))} />
      </Section>
      <Section className="dot-bg">
        <SectionTitle eyebrow="CadenceCraft sales AI workflows" title="Intelligent revenue workflows with CadenceCraft AI" />
        <div className="text-center"><Button href="/platform/ai-agents">About Sales AI</Button></div>
      </Section>
      <Section>
        <SectionTitle eyebrow="Platform benefits" title="What is an agentic AI platform?" intro="Software where AI does the follow-through, with your approval, on the work that eats a seller’s day." />
        <StatRow stats={[{ value: "10 hrs", label: "per rep saved weekly (target)" }, { value: "3x", label: "reply rates (target)" }, { value: "99%", label: "faster speed to lead (target)" }]} />
      </Section>
      <Section className="dot-bg">
        <SectionTitle title="Your trust is our priority" />
        <div className="flex flex-wrap justify-center gap-8 font-semibold">{[["Security", "/security"], ["Privacy", "/privacy"], ["Governance", "/security#governance"]].map(([l, h]) => <Link key={l} href={h} className="text-brand">{l} →</Link>)}</div>
      </Section>
      <Section>
        <SectionTitle title="Solutions for every team and industry" />
        <div className="mx-auto max-w-[860px]"><Accordion items={useCases.map((u) => ({ title: u.title, body: <>{u.pitch} <Link className="font-semibold text-brand" href={`/use-cases/${u.slug}`}>Learn more →</Link></> }))} /></div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">{industries.map((i) => <span key={i} className="rounded-full border border-line px-4 py-2 text-sm">{i}</span>)}</div>
      </Section>
      <Section className="dot-bg">
        <SectionTitle title="Customer stories" intro="Sample stories shown as launch placeholders." />
        <div className="grid gap-6 md:grid-cols-2">
          <Testimonial quote="Agents cut our admin load and made coaching a daily habit." name="Casey Rivera" role="Director of Sales" company="Brightpath" />
          <Testimonial quote="One platform replaced four tools and our forecast tightened." name="Sam Patel" role="RevOps Lead" company="Corvid" />
        </div>
        <LogoStrip title="Sales, Marketing, RevOps and Customer Success teams trust CadenceCraft" />
      </Section>
      <Section>
        <SectionTitle eyebrow="Integrations & API" title="Connect the tools your team already uses" />
        <div className="text-center"><Button href="/integrations">Learn More</Button></div>
      </Section>
      <ClosingBand />
    </main>
  );
}
