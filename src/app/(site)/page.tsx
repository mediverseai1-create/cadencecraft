import Link from "next/link";
import { EyeOff, Network, Hourglass } from "lucide-react";
import { Button, Eyebrow, Section } from "@/components/ui";
import { Accordion } from "@/components/Accordion";
import { ClosingBand, FeatureBlock, LogoStrip, SectionTitle, Testimonial } from "@/components/blocks";
import { useCaseNav } from "@/content/nav";

const personaCopy: Record<string, string> = {
  "Revenue Operations": "One governed system of record for process, data and agent activity.",
  "Sales Leaders": "Forecasts and risk you can inspect down to the deal.",
  "Account Executives": "Prep, follow-up and next steps handled before you ask.",
  "Sales Managers": "Coaching moments surfaced while they still matter.",
  "Sales Development": "Prioritized accounts and personalized outreach, at scale.",
  "Customer Success": "Renewal and expansion signals routed to the right owner.",
};

export default function Home() {
  return (
    <main>
      <section className="hero-night px-4 pb-24 pt-20 text-center text-white sm:px-8">
        <div className="mx-auto max-w-[860px]">
          <Eyebrow dark>Agentic AI platform for revenue teams</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.08] md:text-[4rem]">
            Stop buying software.<br /><span className="grad-text">Start hiring AI agents.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-lg leading-relaxed text-white/90">
            CadenceCraft agents work as teammates, taking on real work across the full revenue lifecycle to build more pipeline and close more revenue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/signup">Sign up</Button>
            <Button href="/platform/ai-agents" variant="outlineDark">Explore AI Agents</Button>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-[900px] gap-10 sm:grid-cols-3">
          {[["90%", "Reduced prospecting time"], ["45%", "Increase in average deal size"], ["50%", "Less time prepping for meetings"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl font-semibold">{v}</p>
              <p className="mt-1 text-white/70">{l}</p>
              <Link href="/resources/customer-stories" className="mt-3 inline-block border-b-2 border-brand font-semibold text-white/90">Read more</Link>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-white/50">Illustrative targets used for launch copy. Replace with measured customer data.</p>
      </section>

      <section className="hero-night px-4 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <SectionTitle dark eyebrow="The revenue execution gap" title="Everyone’s under pressure to adopt AI. Few are clear on how it actually moves revenue." intro="AI is a board mandate, not a nice-to-have. But bolting more tools onto an already crowded stack won’t close the gap between signals and revenue growth." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [EyeOff, "Poor visibility and alignment", "Leaders can’t see risk, pipeline performance, or where execution is breaking down in real time, so the right levers go unpulled when it matters most."],
              [Network, "Inconsistent seller skills", "Reps miss cues that shape how a deal progresses, and by the time managers can coach them, the moment has already passed."],
              [Hourglass, "Wasted seller capacity", "The hours reps should spend selling go to research, updates and follow-up, and the AI meant to fix that just adds another system to log into."],
            ].map(([Icon, t, b]) => {
              const I = Icon as typeof EyeOff;
              return (
                <div key={t as string} className="card-dark p-8 text-center">
                  <I className="mx-auto h-7 w-7 text-[#6c64ff]" />
                  <h3 className="mt-5 text-xl font-semibold">{t as string}</h3>
                  <p className="mt-4 leading-relaxed text-white/85">{b as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Section className="dot-bg text-center">
        <h2 className="mx-auto max-w-[760px] text-4xl font-semibold leading-tight md:text-5xl">AI that acts. <span className="text-brand">Revenue you can predict.</span></h2>
        <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-muted">Most tools tell you what happened. CadenceCraft agents do the follow-through: they research accounts, update the CRM, draft outreach, guide live calls and keep the forecast honest.</p>
        <div className="mt-8"><Button href="/signup">Sign up</Button></div>
      </Section>

      <section className="band-night px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <SectionTitle dark eyebrow="What it means to hire CadenceCraft agents" title="CadenceCraft works every part of the revenue lifecycle." />
          <FeatureBlock eyebrow="Build pipeline" title="Create pipeline from signals, not guesswork" body="Prospecting agents watch intent, hiring and product signals, rank accounts against your ideal customer profile, and launch personalized sequences without a rep touching a spreadsheet." bullets={["Signal-based account prioritization", "Personalized multichannel sequences", "Automatic meeting booking"]} href="/platform/sales-engagement" />
          <FeatureBlock reverse eyebrow="Execute deals" title="Execute every deal with a teammate at your side" body="Deal agents prepare meetings, capture next steps, update fields, and build mutual action plans so no commitment slips between calls." bullets={["Meeting prep in seconds", "Automatic CRM updates", "Shared mutual action plans"]} href="/platform/deal-management" />
          <FeatureBlock eyebrow="Inspect and forecast" title="Inspect, coach and forecast with evidence" body="Conversation intelligence and deal insights roll up into a forecast grounded in what buyers actually said, with coaching delivered at the moment it matters." bullets={["Risk flagged across the pipeline", "Call-level coaching insights", "Forecast roll-ups by team and stage"]} href="/platform/sales-forecasting" />
        </div>
      </section>

      <Section>
        <SectionTitle eyebrow="Proven in practice" title="Customers seeing real outcomes" intro="Sample testimonials shown as launch placeholders." />
        <div className="grid gap-6 md:grid-cols-2">
          <Testimonial quote="Our reps got hours back every week, and our forecast calls finally start from facts instead of opinions." name="Avery Morgan" role="VP Revenue Operations" company="Northwind" />
          <Testimonial quote="The agents handle research and follow-up, so managers coach live deals instead of chasing updates." name="Jordan Lee" role="Head of Sales" company="Altura" />
        </div>
        <LogoStrip />
      </Section>

      <Section className="dot-bg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold md:text-[2.5rem]">Why choose CadenceCraft?</h2>
            <p className="mt-4 text-muted">One platform, built for revenue from the first line of code.</p>
            <div className="mt-8"><Button href="/platform">Explore our Platform and Features</Button></div>
          </div>
          <Accordion items={[
            { title: "One platform, not another point tool", body: "Engagement, deal management, conversation intelligence and forecasting share a single data model, so insights and actions never live in different places." },
            { title: "AI that acts like a seller", body: "Agents complete tasks end to end with approvals and audit trails, rather than stopping at a suggestion." },
            { title: "Better context", body: "Every agent reads the same account history, call transcripts and CRM fields, so output reflects your actual deals." },
            { title: "Revenue-native agents", body: "Prebuilt roles for prospecting, meeting prep, follow-up and forecasting, tuned to sales motions." },
            { title: "Works with your tech stack", body: "Connect your CRM, calendar, email and data sources, and keep the tools your team already trusts." },
          ]} />
        </div>
      </Section>

      <Section>
        <SectionTitle title="Built to be trusted" intro="Controls revenue leaders and security teams ask for first." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {["Row-level data isolation", "Human approval workflows", "Full agent audit log", "Role-based access", "Encrypted at rest", "Usage and credit limits"].map((b) => (
            <div key={b} className="card-light flex h-28 items-center justify-center p-4 text-center text-sm font-semibold">{b}</div>
          ))}
        </div>
      </Section>

      <Section className="dot-bg">
        <SectionTitle eyebrow="Find your role" title="CadenceCraft solutions for every revenue role" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCaseNav.map((l) => (
            <Link key={l.href} href={l.href} className="card-light p-7">
              <h3 className="text-xl font-semibold">{l.label}</h3>
              <p className="mt-3 text-muted">{personaCopy[l.label]}</p>
              <p className="mt-5 font-semibold text-brand">Learn more →</p>
            </Link>
          ))}
        </div>
      </Section>

      <ClosingBand />
    </main>
  );
}
