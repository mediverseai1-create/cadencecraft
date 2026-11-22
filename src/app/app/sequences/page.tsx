import { serverClient } from "@/lib/supabase";
import { OutreachDrafter } from "@/components/AiPanels";
import { createSequence, deleteSequence } from "../actions";

const input = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export default async function Sequences() {
  const sb = await serverClient();
  const [{ data: seqs }, { data: accounts }] = await Promise.all([sb.from("sequences").select("*").order("created_at", { ascending: false }), sb.from("accounts").select("id, name").order("name")]);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Sequences</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <form action={createSequence} className="card-light space-y-3 p-6">
          <h2 className="font-semibold">New sequence</h2>
          <input name="name" required placeholder="Sequence name" className={input} />
          <textarea name="steps" required rows={5} placeholder={"One step per line, e.g.\nIntro email\nFollow-up with case study\nCall"} className={input} />
          <button className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">Create</button>
        </form>
        <OutreachDrafter accounts={accounts ?? []} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {seqs?.map((s) => (
          <div key={s.id} className="card-light p-6 text-sm">
            <div className="flex justify-between"><h2 className="font-semibold">{s.name}</h2><form action={deleteSequence}><input type="hidden" name="id" value={s.id} /><button className="text-xs text-red-600">Delete</button></form></div>
            <ol className="mt-3 list-decimal space-y-1 pl-5">{(s.steps as { day: number; note: string }[]).map((st, i) => <li key={i}>Day {st.day}: {st.note}</li>)}</ol>
          </div>
        ))}
        {!seqs?.length && <p className="text-muted">No sequences yet.</p>}
      </div>
    </div>
  );
}
