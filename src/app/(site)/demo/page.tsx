import { LeadForm } from "@/components/LeadForm";
export const metadata = { title: "Get a demo" };
export default function Demo() {
  return (
    <main className="dot-bg px-4 py-20 sm:px-8">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2">
        <div><p className="eyebrow">Get a demo</p><h1 className="mt-4 text-4xl font-semibold md:text-5xl">See agents work your pipeline.</h1><p className="mt-6 text-lg text-muted">Tell us about your team and we’ll walk through the workflows that matter to you.</p></div>
        <LeadForm kind="demo" />
      </div>
    </main>
  );
}
