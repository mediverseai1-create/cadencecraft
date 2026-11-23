import Link from "next/link";
import { EyeOff, Network, Hourglass } from "lucide-react";
import { Button, Eyebrow, Section } from "@/components/ui";
import { Accordion } from "@/components/Accordion";
import { ClosingBand, FeatureBlock, SectionTitle } from "@/components/blocks";
import { useCaseNav } from "@/content/nav";

const personaCopy: Record<string, string> = {
  "Revenue Operations": "One governed system where AI enforces process, cleans data and audits every agent action.",
  "Sales Leaders": "AI predicts the quarter and flags risk down to the individual deal.",
  "Account Executives": "AI prepares every meeting, captures every commitment and drafts every follow-up.",
  "Sales Managers": "AI surfaces coaching moments from live conversations while the deal is still open.",
  "Sales Development": "AI ranks accounts by buying signal and sequences outreach tailored to each buyer.",
  "Customer Success": "AI detects renewal risk and expansion signals and routes them to the right owner.",
};

export default function Home() {
  return (
    <main>
      <section className="hero-night px-4 pb-24 pt-20 text-center text-white sm:px-8">
        <div className="mx-auto max-w-[860px]">
          <Eyebrow dark>AI-native revenue platform for B2B teams</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.08] md:text-[4rem]">
            Stop buying software.<br /><span className="grad-text">Start hiring AI agents.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg leading-relaxed text-white/90">
            CadenceCraft’s AI engine analyzes every account and call, predicts which deals will close, decides the next best action and automates the follow-through. Revenue teams close more with fewer tools.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/signup">Sign up</Button>
            <Button href="/login" variant="outlineDark">Sign in</Button>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-[900px] gap-10 sm:grid-cols-3">
          {[["90%", "Less time spent prospecting"], ["45%", "Larger average deal size"], ["50%", "Less time preparing for meetings"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-4xl font-semibold">{v}</p>
              <p className="mt-1 text-white/70">{l}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-white/50">Target outcomes for teams running CadenceCraft agents across the full lifecycle.</p>
      </section>

      <section className="hero-night px-4 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <SectionTitle dark eyebrow="The revenue execution gap" title="Every board demands AI. Few leaders can show how it moves revenue." intro="Adding tools to a crowded stack does not close the gap between signals and revenue. AI has to own the execution." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [EyeOff, "Blind spots in pipeline and risk", "Leaders cannot see risk, pipeline performance or execution breakdowns in real time, so the right levers go unpulled when they matter most."],
              [Network, "Inconsistent seller execution", "Reps miss the cues that shape a deal. By the time managers can coach, the moment has passed."],
              [Hourglass, "Selling capacity lost to admin", "Hours that belong to buyers go to research, updates and follow-up, and bolt-on AI adds another system to maintain."],
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
        <p className="mx-auto mt-6 max-w-[680px] text-lg leading-relaxed text-muted">Dashboards report what happened. CadenceCraft’s AI analyzes the evidence, predicts the outcome, decides the next move and executes it: account research, CRM updates, outreach, call guidance and forecast integrity.</p>
        <div className="mt-8"><Button href="/signup">Sign up</Button></div>
      </Section>

      <section className="band-night px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <SectionTitle dark eyebrow="What it means to hire CadenceCraft agents" title="CadenceCraft’s AI works every stage of the revenue lifecycle." />
          <FeatureBlock eyebrow="Build pipeline" title="AI turns buying signals into qualified pipeline" body="Prospecting agents analyze intent, hiring and product signals, rank every account against your ideal customer profile and launch sequences tailored to each buyer. No spreadsheets, no manual list building." bullets={["Signal-based account prioritization", "Tailored multichannel sequences", "Automated meeting booking"]} />
          <FeatureBlock reverse eyebrow="Execute deals" title="AI runs the work behind every deal" body="Deal agents prepare each meeting, capture next steps, update fields and build mutual action plans, so no commitment slips between calls." bullets={["Meeting preparation in seconds", "Automatic CRM updates", "Shared mutual action plans"]} />
          <FeatureBlock eyebrow="Inspect and forecast" title="AI predicts the quarter from what buyers actually said" body="Conversation intelligence and deal health scoring roll up into a forecast grounded in evidence, with coaching delivered while the deal is still open." bullets={["Risk flagged across the pipeline", "Call-level coaching insights", "Roll-ups by team and stage"]} />
        </div>
      </section>

      <Section className="dot-bg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold md:text-[2.5rem]">Why revenue leaders choose CadenceCraft</h2>
            <p className="mt-4 text-muted">One AI-native platform, built for revenue from the first line of code.</p>
            <div className="mt-8"><Button href="/signup">Sign up</Button></div>
          </div>
          <Accordion items={[
            { title: "One platform replaces a stack of point tools", body: "Engagement, deal management, conversation intelligence and forecasting share a single data model, so insight and action live in the same place." },
            { title: "AI that executes, not just advises", body: "Agents complete tasks end to end with approvals and audit trails, rather than stopping at a recommendation." },
            { title: "Context from every record", body: "Every agent reads the same account history, call transcripts and CRM fields, so output reflects your actual deals." },
            { title: "Revenue-native agents", body: "Prebuilt roles for prospecting, meeting preparation, follow-up and forecasting, tuned to enterprise sales motions." },
            { title: "Fits your existing stack", body: "Import accounts and deals by CSV today and keep the systems your teams already trust." },
          ]} />
        </div>
      </Section>

      <Section>
        <SectionTitle title="Built for enterprise trust" intro="The controls revenue leaders and security teams require first." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {["Row-level data isolation", "Human approval workflows", "Full agent audit log", "Role-based access", "Encrypted at rest", "Credit and usage limits"].map((b) => (
            <div key={b} className="card-light flex h-28 items-center justify-center p-4 text-center text-sm font-semibold">{b}</div>
          ))}
        </div>
      </Section>

      <Section className="dot-bg">
        <SectionTitle eyebrow="Find your role" title="AI built for every revenue role" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCaseNav.map((l) => (
            <Link key={l.href} href={l.href} className="card-light p-7">
              <h3 className="text-xl font-semibold">{l.label}</h3>
              <p className="mt-3 text-muted">{personaCopy[l.label]}</p>
            </Link>
          ))}
        </div>
      </Section>

      <ClosingBand />
    </main>
  );
}
