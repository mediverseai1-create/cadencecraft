import { notFound } from "next/navigation";
import { useCases, modules } from "@/content/modules";
import { Button, Section } from "@/components/ui";
import { CardGrid, ClosingBand, PageHero, SectionTitle } from "@/components/blocks";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = useCases.find((x) => x.slug === slug);
  if (!u) notFound();
  return (
    <main>
      <PageHero eyebrow={`For ${u.title}`} title={u.pitch} cta={<Button href="/signup">Sign up</Button>}>
        <ul className="space-y-2">{u.points.map((p) => <li key={p}>✦ {p}</li>)}</ul>
      </PageHero>
      <Section>
        <SectionTitle title="Modules built for this role" />
        <CardGrid items={modules.slice(0, 6).map((m) => ({ title: m.title, body: m.tagline, href: `/platform/${m.slug}` }))} />
      </Section>
      <ClosingBand />
    </main>
  );
}
