import Link from "next/link";
import { serverClient } from "@/lib/supabase";
import { creditCosts } from "@/content/plans";

const agents = [
  { name: "Call Analyst", action: "conversation_analysis", href: "/app/conversations", desc: "Summarizes calls, finds risks and next steps." },
  { name: "Outreach Writer", action: "outreach_draft", href: "/app/sequences", desc: "Drafts personalized outreach from account data." },
  { name: "Forecast Analyst", action: "forecast_commentary", href: "/app/forecast", desc: "Writes forecast commentary from computed numbers." },
] as const;

export default async function Agents() {
  const sb = await serverClient();
  const { data: runs } = await sb.from("agent_runs").select("id, agent, credits, status, created_at").order("created_at", { ascending: false }).limit(25);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Agents</h1>
      <div className="grid gap-4 md:grid-cols-3">{agents.map((a) => <Link key={a.name} href={a.href} className="card-light p-6"><h2 className="font-semibold">{a.name}</h2><p className="mt-2 text-sm text-muted">{a.desc}</p><p className="mt-4 text-sm font-semibold text-brand">{creditCosts[a.action]} credits per run →</p></Link>)}</div>
      <div className="card-light p-6"><h2 className="font-semibold">Run history</h2>
        <table className="mt-3 w-full text-left text-sm"><thead className="text-muted"><tr><th className="py-1">Agent</th><th>Status</th><th>Credits</th><th>When</th></tr></thead>
          <tbody>{runs?.map((r) => <tr key={r.id} className="border-t border-line"><td className="py-2">{r.agent}</td><td>{r.status}</td><td>{r.credits}</td><td>{new Date(r.created_at).toLocaleString()}</td></tr>)}</tbody></table>
        {!runs?.length && <p className="mt-3 text-sm text-muted">No runs yet.</p>}
      </div>
    </div>
  );
}
