import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { modules } from "@/content/modules";
import { Button, Section } from "@/components/ui";
import { CardGrid, ClosingBand, PageHero, SectionTitle, StatRow } from "@/components/blocks";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = modules.find((x) => x.slug === slug);
  return { title: m?.title ?? "Platform" };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = modules.find((x) => x.slug === slug);
  if (!m) notFound();
  return (
    <main>
      <PageHero eyebrow={m.title} title={m.tagline} cta={<><Button href="/signup">Sign up</Button><Button href="/login" variant="outline">Sign in</Button></>}>
        <p>{m.intro}</p>
      </PageHero>
      <Section>
        <SectionTitle title={`What you get with ${m.title}`} />
        <CardGrid items={m.capabilities} />
      </Section>
      <Section className="dot-bg">
        <SectionTitle eyebrow="Outcomes" title="Built to move the numbers leaders watch" intro="Target outcomes for teams running CadenceCraft agents." />
        <StatRow stats={m.outcomes} />
      </Section>
      <ClosingBand />
    </main>
  );
}
