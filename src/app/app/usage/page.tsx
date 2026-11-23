import { agentLabel } from "@/lib/labels";
import { serverClient } from "@/lib/supabase";

export default async function Usage() {
  const sb = await serverClient();
  const [{ data: ws }, { data: events }] = await Promise.all([
    sb.from("workspaces").select("credits_total, credits_used, plan").single(),
    sb.from("usage_events").select("id, action, credits, created_at").order("created_at", { ascending: false }).limit(50),
  ]);
  const pct = ws ? Math.min(100, (ws.credits_used / ws.credits_total) * 100) : 0;
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Usage and credits</h1>
      <div className="card-light p-6"><p className="text-3xl font-semibold">{ws ? (ws.credits_total - ws.credits_used).toLocaleString() : 0} <span className="text-base font-normal text-muted">credits remaining</span></p>
        <div className="mt-3 h-2 rounded bg-lavender"><div className="h-2 rounded bg-brand" style={{ width: `${pct}%` }} /></div></div>
      <div className="card-light p-6"><h2 className="font-semibold">Activity</h2>
        <table className="mt-3 w-full text-left text-sm"><tbody>{events?.map((e) => <tr key={e.id} className="border-t border-line"><td className="py-2">{agentLabel(e.action)}</td><td>{e.credits > 0 ? `-${e.credits}` : `+${-e.credits}`}</td><td className="text-muted">{new Date(e.created_at).toLocaleString()}</td></tr>)}</tbody></table>
        {!events?.length && <p className="mt-3 text-sm text-muted">No usage yet.</p>}</div>
    </div>
  );
}
