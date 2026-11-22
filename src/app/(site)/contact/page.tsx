import { LeadForm } from "@/components/LeadForm";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <main className="dot-bg px-4 py-20 sm:px-8">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2">
        <div><p className="eyebrow">Contact</p><h1 className="mt-4 text-4xl font-semibold md:text-5xl">Talk to the team.</h1><p className="mt-6 text-lg text-muted">Questions about the product, pricing or partnerships.</p></div>
        <LeadForm kind="contact" />
      </div>
    </main>
  );
}
