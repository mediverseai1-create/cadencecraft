import type { Metadata } from "next";
import Link from "next/link";
import { Button, Eyebrow, Section } from "@/components/ui";
import { Accordion } from "@/components/Accordion";
import { ClosingBand, SectionTitle } from "@/components/blocks";
import { plans, type Plan } from "@/content/plans";

export const metadata: Metadata = { title: "AI Agent Platform Pricing for Revenue Teams" };

function PlanCard({ p }: { p: Plan }) {
  return (
    <div className={`card-light relative flex flex-col p-8 ${p.badge ? "!border-brand ring-2 ring-brand/20" : ""}`}>
      {p.badge && <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">{p.badge}</span>}
      <h3 className="text-2xl font-semibold">{p.name}</h3>
      <p className="mt-2 text-muted">{p.blurb}</p>
      <p className="mt-6 text-5xl font-semibold text-brand">{p.price === 0 ? "$0" : `$${p.price}`}{p.price > 0 && <span className="ml-1 text-base font-medium text-muted">per month</span>}</p>
      <p className="mt-2 text-sm text-muted">{p.credits.toLocaleString()} AI credits {p.price > 0 ? "each month" : "to start"}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{f}</li>)}</ul>
      <p className="mt-5 text-xs text-muted">{p.limits.apiCalls.toLocaleString()} API calls, {p.limits.customObjects} custom objects, {p.limits.knowledgeMb} MB knowledge</p>
      <Link href={p.price === 0 ? "/signup" : `/signup?plan=${p.id}`} className="mt-6 rounded-[4px] bg-brand py-3 text-center font-semibold text-white hover:bg-brand-dark">Sign up</Link>
    </div>
  );
}

const faqs = [
  ["How does pricing work?", "Each plan is a flat monthly price that includes a pool of AI credits. Credits fund the AI work that actually happens."],
  ["How is consumption measured?", "Each AI action deducts a fixed number of credits: conversation analysis 250, outreach draft 50, forecast commentary 150 and agent run 100."],
  ["What happens if I run out of credits?", "AI actions pause until you upgrade your plan. Nothing else in your workspace is affected."],
  ["Are failed AI actions charged?", "No. Credits are returned automatically when an AI action fails."],
  ["Can I change plans?", "Yes. Upgrade at any time from the billing page."],
  ["What is included in the Free plan?", "2,000 AI credits, accounts, pipeline, sequences and conversation analysis."],
  ["Which plan should a revenue leader choose?", "Pro adds forecasting and governance for leaders accountable for the number."],
  ["Which plan suits a lean team?", "Essentials covers conversation intelligence. Core adds pipeline and account management."],
].map(([title, body]) => ({ title, body }));

export default function Pricing() {
  return (
    <main>
      <section className="dot-bg px-4 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-[820px]">
          <Eyebrow>CadenceCraft pricing</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">AI agent platform pricing for revenue teams</h1>
          <p className="mt-6 text-lg text-muted">Flat monthly plans with transparent AI credits. Spend scales with the revenue work agents deliver.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="/signup">Sign up</Button><Button href="/login" variant="outline">Sign in</Button></div>
        </div>
      </section>
      <Section id="packages">
        <SectionTitle title="Choose your plan" intro="Start on Free. Upgrade when AI is running your pipeline." />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">{[...plans].sort((a, b) => a.price - b.price).map((p) => <PlanCard key={p.id} p={p} />)}</div>
      </Section>
      <Section className="dot-bg">
        <SectionTitle title="What drives the plan you need" />
        <div className="grid gap-6 md:grid-cols-3">{[["Team size and activity volume", "More users and higher activity consume more credits."], ["AI workflows activated", "Each workflow draws on your credit pool."], ["Capabilities required", "Forecasting and governance sit in Pro."]].map(([t, b]) => <div key={t} className="card-light p-7"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-muted">{b}</p></div>)}</div>
      </Section>
      <Section>
        <SectionTitle title="Pricing FAQs" />
        <div className="mx-auto max-w-[860px]"><Accordion items={faqs} /></div>
      </Section>
      <ClosingBand title="Put AI in charge of the work that slows revenue" />
    </main>
  );
}
