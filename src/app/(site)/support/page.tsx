import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { Accordion } from "@/components/Accordion";
export const metadata = { title: "Support" };
export default function Support() {
  return <InfoPage eyebrow="Support" title="Answers for CadenceCraft teams" intro="Operating guidance for administrators and users." closing={false}>
    <Accordion items={[
      { title: "How do I get started?", body: <>Create an account on the <Link className="text-brand" href="/signup">sign-up page</Link>, confirm your email, then add accounts and deals in your workspace.</> },
      { title: "How are credits counted?", body: "Each AI action deducts a fixed number of credits, listed on the pricing page. Usage appears under Usage in your workspace." },
      { title: "I forgot my password", body: <>Use <Link className="text-brand" href="/forgot-password">password recovery</Link> to receive a reset link.</> },
      { title: "How do I upgrade?", body: "Open Billing in your workspace, choose a plan and complete checkout. Your plan updates after payment is confirmed." },
    ]} />
  </InfoPage>;
}
