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
      <p className="mt-6 text-4xl font-semibold text-brand">{p.credits.toLocaleString()}<span className="ml-2 text-base font-medium text-muted">AI credits / mo</span></p>
      {p.stat && <div className="mt-5 grid grid-cols-2 gap-3">{p.stat.map((s) => <div key={s.label} className="rounded-lg bg-lavender p-3"><p className="text-xl font-semibold">{s.value}</p><p className="text-xs text-muted">{s.label}</p></div>)}</div>}
      <ul className="mt-6 flex-1 space-y-2 text-sm">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
      <p className="mt-5 text-xs text-muted">{p.limits.apiCalls.toLocaleString()} API calls · {p.limits.customObjects} custom objects · {p.limits.knowledgeMb} MB knowledge</p>
      <Link href={`/signup?plan=${p.id}`} className="mt-6 rounded-[4px] bg-brand py-3 text-center font-semibold text-white hover:bg-brand-dark">Request pricing</Link>
    </div>
  );
}

const faqs = [
  ["How does pricing work?", "Plans combine seat-based platform access with consumption-based AI credits, so you pay for the AI work that actually happens."],
  ["How much does it cost?", "Cost depends on team size, the AI workflows you activate and the capabilities you need. Request pricing for a quote."],
  ["How is consumption measured?", "Each AI action deducts credits at a fixed rate: conversation analysis 250, outreach draft 50, forecast commentary 150 and agent run 100."],
  ["Can I buy more credits?", "Yes. Add credit packs or move up a package at any time from the billing page."],
  ["Do you offer onboarding services?", "Guided onboarding is available for every package, with extended services for Pro."],
  ["What support is included?", "Email support on every plan and priority support on Pro."],
  ["Are there add-ons?", "Additional API capacity, custom objects and knowledge storage can be added."],
  ["Can existing customers access new agents?", "Yes. New agents appear in your workspace and consume credits from your plan."],
  ["Which plan should a CRO choose?", "Most revenue leaders choose Pro for forecasting and governance."],
  ["Seat-based or consumption-based?", "Both. Seats grant access; credits fund AI actions."],
  ["What are credits used for?", "Conversation analysis, outreach drafting, forecast commentary and agent runs."],
  ["What is the best starter tier?", "Essentials for conversation intelligence, Core for pipeline and accounts."],
  ["How do you compare with other revenue tools?", "CadenceCraft unifies engagement, deals and intelligence so agents can act, not just advise."],
].map(([title, body]) => ({ title, body }));

export default function Pricing() {
  return (
    <main>
      <section className="dot-bg px-4 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-[820px]">
          <Eyebrow>CadenceCraft pricing and packages</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">AI Agent Platform Pricing for Revenue Teams</h1>
          <p className="mt-6 text-lg text-muted">Predictable seats plus transparent AI credits that scale with the value agents deliver.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="/demo">Request Pricing</Button><Button href="#packages" variant="outline">View packages</Button></div>
        </div>
      </section>
      <Section>
        <h2 className="text-2xl font-semibold">How CadenceCraft pricing works:</h2>
        <p className="mt-3 max-w-[760px] text-muted">Seat-based access plus consumption-based AI credits.</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">{["Pay for actual AI usage", "Scale across workflows", "Align cost to pipeline impact", "Expand with adoption"].map((x) => <li key={x} className="card-light p-5 font-semibold">✦ {x}</li>)}</ul>
      </Section>
      <Section id="packages" className="dot-bg">
        <SectionTitle title="Choose your package" intro="Two packages built for teams ready to scale." />
        <div className="grid gap-8 md:grid-cols-2">{plans.filter((p) => p.id === "plus" || p.id === "pro").map((p) => <PlanCard key={p.id} p={p} />)}</div>
        <p className="my-12 text-center text-sm font-semibold uppercase tracking-widest text-muted">Or</p>
        <SectionTitle title="Just getting started?" />
        <div className="grid gap-8 md:grid-cols-2">{plans.filter((p) => p.id === "essentials" || p.id === "core").map((p) => <PlanCard key={p.id} p={p} />)}</div>
      </Section>
      <Section>
        <SectionTitle title="How much does CadenceCraft cost?" />
        <div className="grid gap-6 md:grid-cols-3">{[["Team size and volume", "More seats and higher activity volume shape the package."], ["AI workflows activated", "Each workflow draws on credits."], ["Capabilities required", "Forecasting and governance move you to Pro."]].map(([t, b]) => <div key={t} className="card-light p-7"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-muted">{b}</p></div>)}</div>
        <div className="mt-8 text-center"><Button href="/demo">Get custom pricing</Button></div>
      </Section>
      <Section className="dot-bg">
        <SectionTitle title="Pricing FAQs" />
        <div className="mx-auto max-w-[860px]"><Accordion items={faqs} /></div>
      </Section>
      <Section>
        <SectionTitle eyebrow="Simplified packages for your sales teams" title="Request pricing" />
        <div className="grid gap-6 md:grid-cols-3">{[["Build pipeline", "Prospecting and engagement agents fill the top of funnel."], ["Execute deal cycles", "Deal agents keep every opportunity moving."], ["Automate forecast prep", "Roll-ups and commentary ready before the meeting."]].map(([t, b]) => <p key={t} className="text-muted"><strong className="text-ink">{t}.</strong> {b}</p>)}</div>
      </Section>
      <ClosingBand title="Ready to see CadenceCraft in action?" />
    </main>
  );
}
