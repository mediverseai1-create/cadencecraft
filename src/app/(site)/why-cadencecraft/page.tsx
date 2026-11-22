import type { Metadata } from "next";
import Link from "next/link";
import { useCases } from "@/content/modules";
import { Accordion } from "@/components/Accordion";
import { Button, Section } from "@/components/ui";
import { CardGrid, ClosingBand, LogoStrip, PageHero, SectionTitle, StatRow, Testimonial } from "@/components/blocks";

export const metadata: Metadata = { title: "Why CadenceCraft?" };

export default function Why() {
  return (
    <main>
      <PageHero eyebrow="Why CadenceCraft?" title={<>Hire agents.<br />Unleash sellers.</>} cta={<><Button href="/signup">Sign up</Button></>}>
        <p>CadenceCraft is the agentic AI platform for revenue teams. Its agents learn your go-to-market context, take on the research, updates and follow-up that eat a seller’s day, and guide every rep during live customer conversations.</p>
      </PageHero>
      <Section><LogoStrip title="Trusted by revenue teams across sales, marketing, RevOps and customer success" /></Section>
      <Section className="dot-bg text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Agents that act. Not just advise.</h2>
        <p className="mx-auto mt-4 max-w-[640px] text-muted">Analysis is table stakes. CadenceCraft agents update records, draft outreach and prepare every meeting.</p>
        <div className="mt-6"><Button href="/platform/ai-agents">Explore CadenceCraft AI Agents</Button></div>
      </Section>
      <Section>
        <SectionTitle title="Built for every revenue role" />
        <div className="flex flex-wrap justify-center gap-3">{useCases.map((u) => <Link key={u.slug} href={`/use-cases/${u.slug}`} className="rounded-full border border-brand px-5 py-2 font-semibold text-brand hover:bg-brand hover:text-white">{u.title}</Link>)}</div>
      </Section>
      <Section id="compare" className="dot-bg">
        <SectionTitle title="Why revenue leaders choose CadenceCraft" />
        <CardGrid items={[
          { title: "Agents act on deals", body: "Instead of only analyzing calls, agents carry follow-through into the deal record." },
          { title: "A forecast you can act on", body: "Roll-ups connect straight to the deals behind the number." },
          { title: "A unified experience", body: "Engagement, deals and intelligence in one workspace, not three logins." },
        ]} />
      </Section>
      <Section>
        <SectionTitle title="How AI agents help generate revenue and improve productivity" />
        <div className="mx-auto max-w-[860px]"><Accordion items={[
          { title: "Coordinated precision", body: "Agents share one data model so outreach, deal updates and forecasts stay consistent." },
          { title: "Guide every rep in the moment", body: "Prompts and prep surface when reps need them." },
          { title: "Execute on sellers’ behalf", body: "Routine tasks run automatically, with approvals where you want them." },
        ]} /></div>
        <div className="mt-12"><StatRow stats={[{ value: "6-9 hrs", label: "saved weekly (target)" }, { value: "~5%", label: "forecast error goal" }, { value: "1 stack", label: "instead of many" }]} /></div>
      </Section>
      <Section className="dot-bg"><div className="mx-auto max-w-[720px]"><Testimonial quote="We stopped debating the data and started working the deals." name="Taylor Brooks" role="Head of RevOps" company="Meridian" /></div></Section>
      <Section className="text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Ready to build predictable revenue?</h2>
        <div className="mt-6"><Button href="/signup">Sign up</Button></div>
      </Section>
      <Section className="dot-bg">
        <SectionTitle title="FAQ" />
        <div className="mx-auto max-w-[860px]"><Accordion items={[
          { title: "What is an agentic AI revenue platform?", body: "A platform where AI agents complete revenue tasks end to end rather than only recommending them." },
          { title: "How do agents improve deal execution?", body: "They prepare meetings, capture next steps and keep records current." },
          { title: "How does it make pipeline predictable?", body: "Deterministic roll-ups plus deal health scoring show what is real." },
          { title: "How is security handled?", body: "Row-level isolation, role-based access and audit logs. See the security page for status." },
          { title: "Do agents replace reps?", body: "No. They remove admin so reps spend more time with buyers." },
          { title: "How is this different from point solutions?", body: "One data model across engagement, deals and intelligence." },
          { title: "Who is it built for?", body: "Sales leaders, RevOps, managers, AEs, SDRs and customer success." },
        ]} /></div>
      </Section>
      <ClosingBand />
    </main>
  );
}
