import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Terms" };
export default function Terms() {
  return <InfoPage eyebrow="Legal" title="Terms of service" closing={false} intro="Template text. Have counsel review before launch."
    sections={[
      { title: "Use of the service", body: "You may use CadenceCraft for lawful business purposes and are responsible for activity in your workspace." },
      { title: "Plans and credits", body: "AI features consume credits per the plan. Unused credits do not roll over unless stated." },
      { title: "Availability", body: "The service is provided as is while in early release." },
    ]} />;
}
