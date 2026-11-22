import { InfoPage } from "@/components/InfoPage";
import { CardGrid } from "@/components/blocks";
export const metadata = { title: "Integrations" };
export default function Integrations() {
  return <InfoPage eyebrow="Integrations & API" title="Connect your stack" intro="Status is shown honestly: nothing below is live until its credentials are configured."
    >
    <CardGrid items={[
      { title: "CRM sync", body: "Planned. Import and export accounts and deals via CSV today." },
      { title: "Calendar", body: "Planned." },
      { title: "Email", body: "Planned. Drafts are generated in-app for you to send." },
      { title: "REST API", body: "Planned." },
      { title: "AI provider", body: "Live when GEMINI_API_KEY is set." },
      { title: "Payments", body: "Live when payment links and webhook secret are set." },
    ]} />
  </InfoPage>;
}
