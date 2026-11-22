import type { ReactNode } from "react";
import { Section } from "./ui";
import { ClosingBand } from "./blocks";

export function InfoPage({ eyebrow, title, intro, sections, children, closing = true }: { eyebrow: string; title: string; intro: string; sections?: { title: string; body: string }[]; children?: ReactNode; closing?: boolean }) {
  return (
    <main>
      <section className="dot-bg px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-[900px]">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>
        </div>
      </section>
      {(sections || children) && (
        <Section>
          <div className="mx-auto max-w-[900px] space-y-10">
            {sections?.map((s) => (<div key={s.title} id={s.title.toLowerCase()}><h2 className="text-2xl font-semibold">{s.title}</h2><p className="mt-3 leading-relaxed text-muted">{s.body}</p></div>))}
            {children}
          </div>
        </Section>
      )}
      {closing && <ClosingBand />}
    </main>
  );
}
