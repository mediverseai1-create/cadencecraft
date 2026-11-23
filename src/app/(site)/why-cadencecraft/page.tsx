import type { Metadata } from "next";
import Link from "next/link";
import { useCases } from "@/content/modules";
import { Accordion } from "@/components/Accordion";
import { Button, Section } from "@/components/ui";
import { CardGrid, ClosingBand, PageHero, SectionTitle, StatRow } from "@/components/blocks";

export const metadata: Metadata = { title: "Why CadenceCraft?" };

export default function Why() {
  return (
    <main>
      <PageHero eyebrow="Why CadenceCraft?" title={<>Hire agents.<br />Unleash sellers.</>} cta={<Button href="/signup">Sign up</Button>}>
        <p>CadenceCraft is the AI-native revenue platform for B2B teams. Its agents learn your go-to-market context, take on the research, updates and follow-up that consume a seller’s day, and guide every rep through live customer conversations.</p>
      </PageHero>
      <Section className="dot-bg text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Agents that act. Not just advise.</h2>
        <p className="mx-auto mt-4 max-w-[680px] text-muted">Analysis is table stakes. CadenceCraft agents update records, draft outreach and prepare every meeting, then log every action for review.</p>
        <div className="mt-6"><Button href="/signup">Sign up</Button></div>
      </Section>
      <Section>
        <SectionTitle title="Built for every revenue role" />
        <div className="flex flex-wrap justify-center gap-3">{useCases.map((u) => <Link key={u.slug} href={`/use-cases/${u.slug}`} className="rounded-full border border-brand px-5 py-2 font-semibold text-brand hover:bg-brand hover:text-white">{u.title}</Link>)}</div>
      </Section>
      <Section id="compare" className="dot-bg">
        <SectionTitle title="Why revenue leaders choose CadenceCraft" />
        <CardGrid items={[
          { title: "Agents act on deals", body: "Instead of only analyzing calls, agents carry the follow-through into the deal record." },
          { title: "A forecast tied to evidence", body: "Roll-ups connect directly to the deals and conversations behind the number." },
          { title: "One unified workspace", body: "Engagement, deals and intelligence share one data model, not three logins." },
        ]} />
      </Section>
      <Section>
        <SectionTitle title="How AI agents generate revenue and productivity" />
        <div className="mx-auto max-w-[860px]"><Accordion items={[
          { title: "Coordinated precision", body: "Agents share one data model, so outreach, deal updates and forecasts stay consistent." },
          { title: "Guidance in the moment", body: "Preparation and next-step prompts surface when reps need them." },
          { title: "Execution on the seller’s behalf", body: "Routine tasks run automatically, with approvals where you want them." },
        ]} /></div>
        <div className="mt-12"><StatRow stats={[{ value: "6-9 hrs", label: "saved each week" }, { value: "5%", label: "forecast error goal" }, { value: "1 stack", label: "instead of many" }]} /></div>
        <p className="mt-6 text-center text-sm text-muted">Target outcomes for teams running agents across the full lifecycle.</p>
      </Section>
      <Section className="dot-bg text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Ready to build predictable revenue?</h2>
        <div className="mt-6"><Button href="/signup">Sign up</Button></div>
      </Section>
      <Section>
        <SectionTitle title="Frequently asked questions" />
        <div className="mx-auto max-w-[860px]"><Accordion items={[
          { title: "What is an AI-native revenue platform?", body: "A platform where AI is the core engine: it analyzes data, predicts outcomes, decides the next action and automates the work, rather than a feature added to a database." },
          { title: "How do agents improve deal execution?", body: "They prepare meetings, capture next steps and keep records current." },
          { title: "How does it make pipeline predictable?", body: "Deterministic roll-ups and deal health scoring show what is real." },
          { title: "How is security handled?", body: "Row-level isolation, role-based access and audit logs. The security page lists what is implemented." },
          { title: "Do agents replace reps?", body: "No. They remove administrative work so reps spend more time with buyers." },
          { title: "How is this different from point solutions?", body: "One data model across engagement, deals and intelligence." },
          { title: "Who is it built for?", body: "Sales leaders, revenue operations, managers, account executives, development reps and customer success teams." },
        ]} /></div>
      </Section>
      <ClosingBand />
    </main>
  );
}
