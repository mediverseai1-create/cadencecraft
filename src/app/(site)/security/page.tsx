import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Security" };
export default function Security() {
  return <InfoPage eyebrow="Trust" title="Security, privacy and governance" intro="What is implemented in this codebase today. No third-party certifications are claimed."
    sections={[
      { title: "Security", body: "Authentication and storage run on Supabase. Row Level Security isolates each workspace's data. Secrets stay on the server." },
      { title: "Privacy", body: "Customer data is used only to provide the product. AI requests are sent to the configured provider from the server." },
      { title: "Governance", body: "Agent runs are logged with inputs, outputs and credits consumed, and credit limits cap usage per workspace." },
    ]} />;
}
