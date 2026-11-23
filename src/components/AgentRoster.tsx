import { LogoMark } from "./Logo";

const agents = [
  { name: "Call Analyst", role: "Analyzes every call", task: "Flagged legal-review risk on the Northwind call", state: "Working" },
  { name: "Outreach Writer", role: "Automates outreach", task: "Drafted 14 messages tailored to ranked accounts", state: "Working" },
  { name: "Forecast Analyst", role: "Predicts the quarter", task: "Weighted pipeline updated: $2.5M, 3 deals at risk", state: "Working" },
];

/** Hero visual: the roster of AI agents a workspace has hired, with live activity and approvals. */
export function AgentRoster() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-6 rounded-[2rem] bg-brand/25 blur-3xl" aria-hidden />
      <div className="card-dark relative overflow-hidden !bg-[#150a4a]/90 p-5 text-left shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold"><LogoMark className="h-5 w-5" />Your AI workforce</div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">3 agents hired</span>
        </div>
        <ul className="mt-4 space-y-3">
          {agents.map((a) => (
            <li key={a.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-[#a9a4ff]">{a.role}</p>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-xs text-white/80"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />{a.state}</span>
              </div>
              <p className="mt-3 text-sm text-white/75">{a.task}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-brand/20 px-4 py-3 text-xs">
          <span className="text-white/85">2 actions awaiting your approval</span>
          <span className="rounded bg-brand px-3 py-1 font-semibold">Review</span>
        </div>
      </div>
    </div>
  );
}
