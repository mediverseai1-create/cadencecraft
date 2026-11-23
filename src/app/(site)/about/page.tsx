import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "About" };
export default function About() {
  return <InfoPage eyebrow="About CadenceCraft" title="We build the AI engine that runs revenue." intro="CadenceCraft exists to put AI in charge of the work that slows B2B revenue teams: analysis, prediction, decisions and execution."
    sections={[
      { title: "Our mission", body: "Replace sprawling tool stacks with one platform where AI agents complete real revenue work under human control." },
      { title: "What we believe", body: "AI must act, not only advise. Every action should be approved where it matters, logged, and measured against revenue." },
      { title: "How we build", body: "Deterministic math for every number, AI for language and judgment, and one data model shared across every module." },
    ]} />;
}
