export type Module = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  capabilities: { title: string; body: string }[];
  outcomes: { value: string; label: string }[];
};

export const modules: Module[] = [
  {
    slug: "ai-agents", title: "AI Agents",
    tagline: "AI teammates that execute real revenue work.",
    intro: "Deploy agents for prospecting, meeting preparation, follow-up and forecasting. Each agent analyzes live account data, decides the next action, produces structured output and waits for approval wherever you require it.",
    capabilities: [
      { title: "Role-based agents", body: "Start from prebuilt roles such as Call Analyst, Outreach Writer and Forecast Analyst, each with defined inputs, outputs and guardrails." },
      { title: "Grounded in your data", body: "Agents read accounts, deals, contacts and call transcripts from your workspace, never from generic prompts." },
      { title: "Full audit trail", body: "Every run is logged with inputs, outputs and credits consumed, so leaders see exactly what the AI did." },
    ],
    outcomes: [{ value: "10 hrs", label: "saved per rep each week" }, { value: "3x", label: "higher reply rates" }, { value: "99%", label: "faster speed to lead" }],
  },
  {
    slug: "pipeline-management", title: "Pipeline Management",
    tagline: "AI inspects every stage, every risk and every dollar.",
    intro: "A live pipeline board where AI scores deal health, detects stalls and quantifies coverage, so leaders review risk instead of reconstructing it.",
    capabilities: [
      { title: "Live pipeline board", body: "Move deals across stages and watch value and probability roll up instantly." },
      { title: "Stall detection", body: "Health scoring flags deals with no activity and states the reason." },
      { title: "Coverage analysis", body: "See whether pipeline supports the target and which stages are slowing." },
    ],
    outcomes: [{ value: "2x", label: "faster pipeline reviews" }, { value: "30%", label: "fewer stalled deals" }, { value: "100%", label: "of open deals scored" }],
  },
  {
    slug: "sales-forecasting", title: "Sales Forecasting",
    tagline: "AI predicts the quarter. Math proves it.",
    intro: "Commit, best case and weighted pipeline are computed deterministically from stage probabilities. AI then writes the commentary leaders bring to the forecast call.",
    capabilities: [
      { title: "Deterministic roll-ups", body: "Every figure is calculated in code from deal data. The model never estimates a number." },
      { title: "Scenario views", body: "Compare commit, best case and weighted pipeline in one view." },
      { title: "AI forecast narrative", body: "Generate a precise written summary of the number and the risks behind it." },
    ],
    outcomes: [{ value: "5%", label: "forecast error goal" }, { value: "50%", label: "less forecast preparation" }, { value: "Live", label: "roll-ups by stage" }],
  },
  {
    slug: "deal-insights", title: "Deal Insights",
    tagline: "AI scores deal health before the quarter is at risk.",
    intro: "Health scores combine stage, activity recency, amount and next-step coverage into one transparent signal per deal, with the reasons attached.",
    capabilities: [
      { title: "Transparent scoring", body: "Scoring rules are visible, so leaders trust and challenge the output." },
      { title: "Stated risk reasons", body: "Each flagged deal lists exactly why it is at risk." },
      { title: "Recommended next actions", body: "AI ranks follow-ups by expected impact on the deal." },
    ],
    outcomes: [{ value: "81%", label: "outcome accuracy goal" }, { value: "Daily", label: "score refresh" }, { value: "Every deal", label: "scored with reasons" }],
  },
  {
    slug: "account-management", title: "Account Management",
    tagline: "One account record. Every contact, call and signal.",
    intro: "Maintain account records, buying-committee contacts and conversation history in one workspace, so AI agents and teams act on the same context.",
    capabilities: [
      { title: "Account records", body: "Industry, size, owner and status with full history." },
      { title: "Buying-committee mapping", body: "Capture each stakeholder's role and engagement." },
      { title: "Shared context for agents", body: "Every agent reads the same record before it acts." },
    ],
    outcomes: [{ value: "360°", label: "account visibility" }, { value: "1", label: "shared source of truth" }, { value: "Minutes", label: "to onboard a team" }],
  },
  {
    slug: "sales-engagement", title: "Sales Engagement",
    tagline: "AI writes and sequences outreach tailored to each buyer.",
    intro: "Build multi-step sequences, then let an agent draft each message from account and contact data. Prospecting shifts from manual research to AI execution.",
    capabilities: [
      { title: "Sequence builder", body: "Define steps, channels and timing for every motion." },
      { title: "AI-drafted outreach", body: "Each message is generated from the account record, not a template." },
      { title: "Usage-controlled drafting", body: "Every draft is metered in credits and logged." },
    ],
    outcomes: [{ value: "90%", label: "less time prospecting" }, { value: "3x", label: "higher reply rates" }, { value: "50 credits", label: "per AI-drafted message" }],
  },
  {
    slug: "deal-management", title: "Deal Management",
    tagline: "AI keeps every deal record current and every commitment tracked.",
    intro: "Amount, stage, close date, next step and notes live together, and agents convert calls into updates so records reflect reality.",
    capabilities: [
      { title: "Deal workspace", body: "One place for value, stakeholders, next steps and notes." },
      { title: "Automated updates", body: "Agents turn call analysis into next steps and field changes." },
      { title: "Approval controls", body: "Review AI changes before they reach the record." },
    ],
    outcomes: [{ value: "45%", label: "larger average deal size" }, { value: "0", label: "manual CRM updates required" }, { value: "100%", label: "of changes logged" }],
  },
  {
    slug: "mutual-action-plans", title: "Mutual Action Plans",
    tagline: "AI aligns buyer and seller on every step to close.",
    intro: "Shared plans with owners and dates keep both sides accountable and expose slippage before it costs the deal.",
    capabilities: [
      { title: "Shared milestones", body: "Define steps, owners and due dates with the buyer." },
      { title: "Progress tracking", body: "See which milestones are complete, late or blocked." },
      { title: "AI-built drafts", body: "Generate a plan from deal context in seconds." },
    ],
    outcomes: [{ value: "Shorter", label: "sales cycles" }, { value: "Clear", label: "ownership on both sides" }, { value: "Earlier", label: "warning on slipping deals" }],
  },
  {
    slug: "conversation-intelligence", title: "Conversation Intelligence",
    tagline: "AI turns every call into risk signals, commitments and coaching.",
    intro: "Submit a transcript and receive a structured analysis: summary, sentiment, objections, competitors, commitments, risks and coaching points, saved to your workspace.",
    capabilities: [
      { title: "Structured analysis", body: "Summary, objections, competitors mentioned and action items in a consistent format." },
      { title: "Sentiment and risk", body: "Surface deal risk the moment it is spoken." },
      { title: "Persistent record", body: "Insights are stored and searchable beside the account." },
    ],
    outcomes: [{ value: "6-9 hrs", label: "saved each week" }, { value: "100%", label: "of calls analyzed" }, { value: "Seconds", label: "from transcript to insight" }],
  },
  {
    slug: "rep-coaching", title: "Rep Coaching",
    tagline: "AI finds the coaching moment while the deal is still open.",
    intro: "AI reads real conversations and surfaces specific coaching points, so managers intervene on live deals instead of reviewing last quarter.",
    capabilities: [
      { title: "Evidence-based feedback", body: "Coaching points are drawn from what was said on the call." },
      { title: "Objection patterns", body: "Identify the objections that recur across a team." },
      { title: "Consistent standards", body: "Apply one discovery and next-step standard to every rep." },
    ],
    outcomes: [{ value: "3x", label: "faster rep ramp" }, { value: "Weekly", label: "coaching cadence" }, { value: "Higher", label: "win rates" }],
  },
  {
    slug: "revenue-intelligence", title: "Revenue Intelligence",
    tagline: "One AI layer across the entire revenue lifecycle.",
    intro: "Engagement, pipeline and conversation data feed one model, so leaders get a single, consistent view of pipeline, forecast and agent activity.",
    capabilities: [
      { title: "Unified data model", body: "Accounts, deals, activities and calls in one schema." },
      { title: "Executive dashboard", body: "Pipeline, forecast, credits and agent runs on one screen." },
      { title: "Governed AI", body: "Every agent action is logged and metered." },
    ],
    outcomes: [{ value: "1", label: "platform for the lifecycle" }, { value: "Live", label: "executive dashboard" }, { value: "100%", label: "agent actions audited" }],
  },
];

export const useCases = [
  { slug: "revenue-operations", title: "Revenue Operations", pitch: "AI enforces process, cleans data and audits every agent action.", points: ["Standardize stages and fields across every team", "Audit every agent run and credit spent", "Replace a sprawl of point tools with one governed system"] },
  { slug: "sales-leaders", title: "Sales Leaders", pitch: "AI predicts the quarter and exposes risk before it lands.", points: ["Roll-ups by stage, team and quarter", "Deal risk surfaced with stated reasons", "A written forecast narrative on demand"] },
  { slug: "account-executives", title: "Account Executives", pitch: "AI prepares every meeting and executes every follow-up.", points: ["Meeting preparation generated from deal context", "Call analysis converted into next steps", "Follow-up drafted for your approval"] },
  { slug: "sales-managers", title: "Sales Managers", pitch: "AI delivers coaching while the deal is still live.", points: ["Coaching points drawn from real conversations", "Pipeline inspection by rep", "One standard applied to every call"] },
  { slug: "sales-development", title: "Sales Development", pitch: "AI ranks accounts and writes outreach tailored to each buyer.", points: ["Sequences with AI-drafted steps", "Accounts prioritized by buying signal", "Every draft logged and metered"] },
  { slug: "customer-success", title: "Customer Success", pitch: "AI detects renewal risk and expansion signals early.", points: ["Account health in one view", "Conversation insights per customer", "Handoffs to sales with full context"] },
];
