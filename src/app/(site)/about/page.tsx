import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "About" };
export default function About() {
  return <InfoPage eyebrow="About CadenceCraft" title="We build agents that do the work revenue teams never get to." intro="CadenceCraft exists to give sellers their time back and leaders a forecast they can trust."
    sections={[
      { title: "Our mission", body: "Replace sprawling tool stacks with one platform where AI agents complete real revenue work under human control." },
      { title: "What we believe", body: "AI should act, not only advise. Every action should be approved where it matters, logged, and measurable." },
      { title: "How we build", body: "Deterministic math for numbers, AI for language and judgment, and a data model shared across every module." },
    ]} />;
}
