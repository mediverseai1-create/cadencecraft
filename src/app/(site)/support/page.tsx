import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { Accordion } from "@/components/Accordion";
export const metadata = { title: "Support" };
export default function Support() {
  return <InfoPage eyebrow="Support" title="Find answers and get help" intro="Guides for getting started, plus a direct line to our team." closing={false}>
    <Accordion items={[
      { title: "How do I get started?", body: <>Create an account at <Link className="text-brand" href="/signup">sign up</Link>, then add accounts and deals in your workspace.</> },
      { title: "How are credits counted?", body: "Each AI action deducts a fixed number of credits shown on the pricing page. Usage appears under Billing." },
      { title: "I forgot my password", body: <>Use <Link className="text-brand" href="/forgot-password">password recovery</Link>.</> },
      { title: "Still stuck?", body: <>Send a message through the <Link className="text-brand" href="/contact">contact form</Link>.</> },
    ]} />
  </InfoPage>;
}
