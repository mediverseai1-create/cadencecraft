import { serverClient } from "@/lib/supabase";
import { dealHealth, money, stages } from "@/lib/forecast";
import { createDeal, deleteDeal, moveDeal } from "../actions";

const input = "rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export default async function Pipeline() {
  const sb = await serverClient();
  const [{ data: deals }, { data: accounts }] = await Promise.all([
    sb.from("deals").select("*, accounts(name)").order("created_at", { ascending: false }),
    sb.from("accounts").select("id, name").order("name"),
  ]);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Pipeline</h1>
      <form action={createDeal} className="card-light grid gap-3 p-6 md:grid-cols-6">
        <input name="name" required placeholder="Deal name" className={input} />
        <input name="amount" type="number" min="0" step="any" required placeholder="Amount" className={input} />
        <select name="account_id" className={input}><option value="">No account</option>{accounts?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
        <input name="close_date" type="date" className={input} />
        <input name="next_step" placeholder="Next step" className={input} />
        <button className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">Add deal</button>
      </form>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((s) => {
          const col = deals?.filter((d) => d.stage === s) ?? [];
          return (
            <div key={s} className="w-72 shrink-0 rounded-xl bg-lavender p-3">
              <p className="mb-3 flex justify-between text-sm font-semibold capitalize"><span>{s.replace("_", " ")}</span><span className="text-muted">{money(col.reduce((t, d) => t + Number(d.amount), 0))}</span></p>
              <div className="space-y-3">
                {col.map((d) => {
                  const h = dealHealth(d);
                  return (
                    <div key={d.id} className="card-light p-4 text-sm">
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-muted">{d.accounts?.name ?? "No account"} · {money(Number(d.amount))}</p>
                      {d.next_step && <p className="mt-1">Next: {d.next_step}</p>}
                      <p className={`mt-2 text-xs ${h.score < 50 ? "text-red-600" : "text-green-700"}`}>Health {h.score}{h.reasons.length ? ` · ${h.reasons.join(", ")}` : ""}</p>
                      <form action={moveDeal} className="mt-3 flex gap-2"><input type="hidden" name="id" value={d.id} />
                        <select name="stage" defaultValue={d.stage} className={`${input} flex-1`}>{stages.map((x) => <option key={x} value={x}>{x.replace("_", " ")}</option>)}</select>
                        <button className="rounded border border-brand px-2 text-brand">Move</button></form>
                      <form action={deleteDeal}><input type="hidden" name="id" value={d.id} /><button className="mt-2 text-xs text-red-600">Delete</button></form>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
