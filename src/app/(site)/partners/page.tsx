import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Partners" };
export default function Partners() {
  return <InfoPage eyebrow="Partners" title="Grow with CadenceCraft" intro="Marketplace, referral and services partners are welcome."
    sections={[
      { title: "Marketplace partners", body: "Build integrations that reach our customers." },
      { title: "Referral partners", body: "Introduce teams that need agentic revenue software." },
      { title: "Services partners", body: "Help customers implement and adopt." },
    ]} />;
}
