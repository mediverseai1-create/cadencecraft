import { InfoPage } from "@/components/InfoPage";
export const metadata = { title: "Terms" };
export default function Terms() {
  return <InfoPage eyebrow="Legal" title="Terms of service" closing={false} intro="The terms that govern use of CadenceCraft by business customers."
    sections={[
      { title: "Use of the service", body: "CadenceCraft may be used for lawful business purposes. Customers are responsible for activity in their workspace." },
      { title: "Plans and credits", body: "AI features consume credits according to the plan. Credits reset on each billing cycle." },
      { title: "Availability", body: "We work to keep the service available and will communicate material changes in advance." },
    ]} />;
}
