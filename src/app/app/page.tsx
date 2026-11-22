import Link from "next/link";
import { serverClient } from "@/lib/supabase";
import { money, rollup } from "@/lib/forecast";

export default async function Dashboard() {
  const sb = await serverClient();
  const [{ data: deals }, { count: accounts }, { data: ws }, { data: runs }] = await Promise.all([
    sb.from("deals").select("amount, stage, last_activity_at"),
    sb.from("accounts").select("id", { count: "exact", head: true }),
    sb.from("workspaces").select("credits_total, credits_used, plan").single(),
    sb.from("agent_runs").select("agent, created_at, credits").order("created_at", { ascending: false }).limit(5),
  ]);
  const r = rollup(deals ?? []);
  const cards = [["Open pipeline", money(r.pipeline)], ["Weighted forecast", money(r.weighted)], ["Closed won", money(r.won)], ["Accounts", String(accounts ?? 0)]];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Home</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([l, v]) => <div key={l} className="card-light p-6"><p className="text-sm text-muted">{l}</p><p className="mt-2 text-3xl font-semibold">{v}</p></div>)}</div>
      {!deals?.length && <div className="card-light p-6">No data yet. <Link href="/app/accounts" className="font-semibold text-brand">Add an account</Link> then <Link href="/app/pipeline" className="font-semibold text-brand">create a deal</Link>.</div>}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-light p-6"><h2 className="font-semibold">Credits</h2><p className="mt-2 text-muted">{ws ? `${(ws.credits_total - ws.credits_used).toLocaleString()} of ${ws.credits_total.toLocaleString()} remaining` : ""}</p>
          <div className="mt-3 h-2 rounded bg-lavender"><div className="h-2 rounded bg-brand" style={{ width: `${ws ? Math.min(100, (ws.credits_used / ws.credits_total) * 100) : 0}%` }} /></div></div>
        <div className="card-light p-6"><h2 className="font-semibold">Recent agent runs</h2>
          <ul className="mt-3 space-y-2 text-sm">{(runs ?? []).map((x, i) => <li key={i} className="flex justify-between"><span>{x.agent}</span><span className="text-muted">{x.credits} credits</span></li>)}{!runs?.length && <li className="text-muted">None yet.</li>}</ul></div>
      </div>
    </div>
  );
}
