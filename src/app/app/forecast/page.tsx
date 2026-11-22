import { serverClient } from "@/lib/supabase";
import { money, rollup, stageProbability, stages } from "@/lib/forecast";
import { ForecastCommentary } from "@/components/AiPanels";

export default async function Forecast() {
  const sb = await serverClient();
  const { data: deals } = await sb.from("deals").select("amount, stage");
  const r = rollup(deals ?? []);
  const byStage = stages.map((s) => { const xs = (deals ?? []).filter((d) => d.stage === s); return { s, n: xs.length, v: xs.reduce((t, d) => t + Number(d.amount), 0) }; });
  const max = Math.max(1, ...byStage.map((b) => b.v));
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Forecast</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Closed won", r.won], ["Commit", r.commit], ["Best case", r.bestCase], ["Weighted pipeline", r.weighted]].map(([l, v]) => <div key={l as string} className="card-light p-6"><p className="text-sm text-muted">{l}</p><p className="mt-2 text-3xl font-semibold">{money(v as number)}</p></div>)}</div>
      <div className="card-light p-6"><h2 className="font-semibold">By stage</h2>
        <div className="mt-4 space-y-3">{byStage.map((b) => <div key={b.s} className="text-sm"><div className="flex justify-between capitalize"><span>{b.s.replace("_", " ")} · {b.n} deals · {Math.round(stageProbability[b.s] * 100)}%</span><span>{money(b.v)}</span></div><div className="mt-1 h-2 rounded bg-lavender"><div className="h-2 rounded bg-brand" style={{ width: `${(b.v / max) * 100}%` }} /></div></div>)}</div></div>
      <ForecastCommentary />
    </div>
  );
}
