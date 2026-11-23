import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Security" };
export default function Security() {
  return <InfoPage eyebrow="Trust" title="Security, privacy and governance" intro="The controls built into CadenceCraft, stated precisely. We do not claim third-party certifications we have not earned."
    sections={[
      { title: "Security", body: "Authentication and storage run on Supabase. Row Level Security isolates every workspace's data at the database. Credentials and AI keys stay on the server." },
      { title: "Privacy", body: "Customer data is used only to operate the product. AI requests are sent from the server to the configured AI provider and are not exposed to other customers." },
      { title: "Governance", body: "Every agent run is logged with its inputs, outputs and credits consumed. Credit limits cap AI usage for each workspace." },
    ]} />;
}
