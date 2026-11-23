import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Privacy" };
export default function Privacy() {
  return <InfoPage eyebrow="Legal" title="Privacy policy" closing={false} intro="How CadenceCraft collects, uses and protects business data."
    sections={[
      { title: "Information we collect", body: "Account details, the workspace data you enter, and the usage metrics required to operate and bill the service." },
      { title: "How we use it", body: "To provide the product, secure it, support customers and enforce plan limits." },
      { title: "AI processing", body: "Content you submit to AI features is sent to the configured AI provider to generate results." },
      { title: "Your choices", body: "You can export or delete your workspace data on request through support." },
    ]} />;
}
