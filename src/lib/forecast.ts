export const stageProbability: Record<string, number> = {
  prospecting: 0.1, qualified: 0.25, proposal: 0.5, negotiation: 0.75, closed_won: 1, closed_lost: 0,
};
export const stages = ["prospecting", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"] as const;

export type DealLike = { amount: number | string; stage: string; last_activity_at?: string | null };

/** Deterministic roll-up. No AI involved. */
export function rollup(deals: DealLike[]) {
  const open = deals.filter((d) => d.stage !== "closed_won" && d.stage !== "closed_lost");
  const sum = (xs: DealLike[]) => xs.reduce((t, d) => t + Number(d.amount), 0);
  return {
    won: sum(deals.filter((d) => d.stage === "closed_won")),
    commit: sum(open.filter((d) => d.stage === "negotiation")),
    bestCase: sum(open.filter((d) => d.stage === "negotiation" || d.stage === "proposal")),
    pipeline: sum(open),
    weighted: open.reduce((t, d) => t + Number(d.amount) * (stageProbability[d.stage] ?? 0), 0),
    openCount: open.length,
  };
}

/** Transparent 0-100 health score. */
export function dealHealth(d: DealLike, now = Date.now()) {
  const reasons: string[] = [];
  let score = 50 + (stageProbability[d.stage] ?? 0) * 40;
  const days = d.last_activity_at ? (now - new Date(d.last_activity_at).getTime()) / 86400000 : 99;
  if (days > 14) { score -= 30; reasons.push(`No activity for ${Math.floor(days)} days`); }
  else if (days > 7) { score -= 12; reasons.push(`Quiet for ${Math.floor(days)} days`); }
  return { score: Math.max(0, Math.min(100, Math.round(score))), reasons };
}

export const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
