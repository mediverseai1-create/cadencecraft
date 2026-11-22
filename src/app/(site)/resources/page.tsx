import type { Metadata } from "next";
import Link from "next/link";
import { resourceSections } from "@/content/resources";
import { Eyebrow, Section } from "@/components/ui";
import { ClosingBand } from "@/components/blocks";

export const metadata: Metadata = { title: "Resources" };

export default function Resources() {
  return (
    <main>
      <section className="dot-bg px-4 py-20 sm:px-8"><div className="mx-auto max-w-[1200px]"><Eyebrow>CadenceCraft sales resources</Eyebrow><h1 className="mt-4 text-5xl font-semibold md:text-6xl">Resources</h1></div></section>
      {resourceSections.slice(0, 4).map((s, idx) => (
        <Section key={s.slug} className={idx % 2 ? "dot-bg" : ""}>
          <div className="mb-8 flex items-end justify-between"><h2 className="text-3xl font-semibold">{s.title}</h2><Link className="font-semibold text-brand" href={`/resources/${s.slug}`}>See all →</Link></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {s.items.map((t) => (
              <Link key={t} href={`/resources/${s.slug}`} className="card-light overflow-hidden">
                <div className="h-36 bg-gradient-to-br from-[#d8d0ff] to-[#8f89ff]" />
                <p className="p-5 font-semibold leading-snug">{t}</p>
              </Link>
            ))}
          </div>
        </Section>
      ))}
      <ClosingBand />
    </main>
  );
}
