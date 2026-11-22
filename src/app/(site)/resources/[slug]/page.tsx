import { notFound } from "next/navigation";
import { resourceSections } from "@/content/resources";
import { Section } from "@/components/ui";
import { ClosingBand } from "@/components/blocks";

export function generateStaticParams() {
  return resourceSections.map((s) => ({ slug: s.slug }));
}

export default async function ResourceList({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = resourceSections.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <main>
      <section className="dot-bg px-4 py-20 sm:px-8"><div className="mx-auto max-w-[1200px]"><h1 className="text-5xl font-semibold">{s.title}</h1><p className="mt-4 text-muted">Content for this section is placeholder titles pending editorial.</p></div></section>
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((t) => (<div key={t} className="card-light overflow-hidden"><div className="h-36 bg-gradient-to-br from-[#d8d0ff] to-[#8f89ff]" /><p className="p-5 font-semibold">{t}</p></div>))}
        </div>
      </Section>
      <ClosingBand />
    </main>
  );
}
