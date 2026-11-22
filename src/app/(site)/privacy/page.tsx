import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Privacy" };
export default function Privacy() {
  return <InfoPage eyebrow="Legal" title="Privacy policy" closing={false} intro="Template text. Have counsel review before launch."
    sections={[
      { title: "Information we collect", body: "Account details, workspace data you enter, and usage metrics needed to operate and bill the service." },
      { title: "How we use it", body: "To provide the product, secure it, support you and enforce plan limits." },
      { title: "AI processing", body: "Content you submit to AI features is sent to the configured AI provider to generate results." },
      { title: "Your choices", body: "You can export or delete your workspace data by contacting support." },
    ]} />;
}
