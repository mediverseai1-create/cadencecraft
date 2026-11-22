export type Module = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  capabilities: { title: string; body: string }[];
  outcomes: { value: string; label: string }[];
  app?: string; // in-app route that implements the workflow
};

export const modules: Module[] = [
  {
    slug: "ai-agents", title: "AI Agents", app: "/app/agents",
    tagline: "Teammates that take on real revenue work.",
    intro: "Configure agents for prospecting, meeting prep, follow-up and forecasting. Each agent reads your live account data, produces structured output, and waits for approval where you want a human in the loop.",
    capabilities: [
      { title: "Role-based agents", body: "Start from prebuilt roles such as Prospector, Deal Coach and Forecast Analyst, then tune instructions and guardrails." },
      { title: "Grounded in your data", body: "Agents read accounts, deals, contacts and call notes from your workspace instead of generic prompts." },
      { title: "Approvals and audit trail", body: "Every run is logged with inputs, outputs and credits used, so leaders can review what agents did." },
    ],
    outcomes: [{ value: "10 hrs", label: "Saved per rep, weekly (target)" }, { value: "3x", label: "Reply-rate lift (target)" }, { value: "99%", label: "Faster speed to lead (target)" }],
  },
  {
    slug: "pipeline-management", title: "Pipeline Management", app: "/app/pipeline",
    tagline: "See every stage, every risk, every dollar.",
    intro: "A board and table view of your pipeline with stage velocity, coverage and stalled-deal detection in one place.",
    capabilities: [
      { title: "Visual pipeline board", body: "Drag deals between stages and see value and probability roll up instantly." },
      { title: "Coverage and velocity", body: "Understand whether you have enough pipeline for target and where deals are slowing." },
      { title: "Stalled deal alerts", body: "Highlight deals with no activity so managers intervene early." },
    ],
    outcomes: [{ value: "2x", label: "Faster pipeline reviews (target)" }, { value: "30%", label: "Fewer stalled deals (target)" }, { value: "1", label: "Source of truth" }],
  },
  {
    slug: "sales-forecasting", title: "Sales Forecasting", app: "/app/forecast",
    tagline: "A forecast you can stand behind.",
    intro: "Roll up commit, best case and pipeline by stage and probability with deterministic math, then layer AI commentary on top.",
    capabilities: [
      { title: "Weighted roll-ups", body: "Calculations use stage probabilities and close dates, never an LLM guess." },
      { title: "Scenario views", body: "Compare commit, best case and full pipeline against quota." },
      { title: "AI commentary", body: "Generate a plain-language forecast narrative from the numbers." },
    ],
    outcomes: [{ value: "±5%", label: "Forecast error goal" }, { value: "50%", label: "Less forecast prep (target)" }, { value: "Real-time", label: "Roll-ups" }],
  },
  {
    slug: "deal-insights", title: "Deal Insights", app: "/app/pipeline",
    tagline: "Know which deals are healthy before the quarter ends.",
    intro: "Health scoring combines stage, recency of activity, amount and next-step coverage into a clear signal per deal.",
    capabilities: [
      { title: "Health scoring", body: "Transparent scoring rules you can inspect and adjust." },
      { title: "Risk reasons", body: "Each flagged deal lists exactly why it is at risk." },
      { title: "Next best action", body: "Suggested follow-ups ranked by impact." },
    ],
    outcomes: [{ value: "81%", label: "Outcome accuracy goal" }, { value: "Daily", label: "Refresh" }, { value: "0", label: "Spreadsheets" }],
  },
  {
    slug: "account-management", title: "Account Management", app: "/app/accounts",
    tagline: "Every account, contact and conversation in one view.",
    intro: "Maintain account records, contacts and activity timelines so every team works from the same context.",
    capabilities: [
      { title: "Account records", body: "Industry, size, owner and status with full history." },
      { title: "Contact mapping", body: "Capture buying committee roles and engagement." },
      { title: "Account plans", body: "Keep goals, risks and next steps beside the data." },
    ],
    outcomes: [{ value: "360°", label: "Account view" }, { value: "1", label: "Shared timeline" }, { value: "Fast", label: "Onboarding" }],
  },
  {
    slug: "sales-engagement", title: "Sales Engagement", app: "/app/sequences",
    tagline: "Multichannel outreach that sounds like a person.",
    intro: "Build sequences of email, call and social steps, and let an agent draft each message from account context.",
    capabilities: [
      { title: "Sequence builder", body: "Define steps, channels and delays." },
      { title: "AI-drafted outreach", body: "Personalize each step from account and contact data." },
      { title: "Enrollment tracking", body: "See who is active, replied or completed." },
    ],
    outcomes: [{ value: "90%", label: "Less prospecting time (target)" }, { value: "3x", label: "Replies (target)" }, { value: "∞", label: "Variants" }],
  },
  {
    slug: "deal-management", title: "Deal Management", app: "/app/pipeline",
    tagline: "Run every deal with discipline.",
    intro: "Keep amount, stage, close date, next steps and notes together, and let agents keep records current.",
    capabilities: [
      { title: "Deal workspace", body: "A single place for notes, stakeholders and tasks." },
      { title: "Automatic updates", body: "Agents summarize calls into next steps and field changes." },
      { title: "Approvals", body: "Review changes before they hit the record." },
    ],
    outcomes: [{ value: "45%", label: "Larger deals (target)" }, { value: "Less", label: "Admin" }, { value: "More", label: "Selling time" }],
  },
  {
    slug: "mutual-action-plans", title: "Mutual Action Plans", app: "/app/pipeline",
    tagline: "Align buyer and seller on every step to close.",
    intro: "Create shared plans with owners and dates that keep both sides accountable.",
    capabilities: [
      { title: "Shared milestones", body: "Define the steps, owners and due dates." },
      { title: "Progress tracking", body: "See which milestones are done or late." },
      { title: "AI-built drafts", body: "Generate a plan from deal context." },
    ],
    outcomes: [{ value: "Shorter", label: "Cycles" }, { value: "Clear", label: "Ownership" }, { value: "Fewer", label: "Surprises" }],
  },
  {
    slug: "conversation-intelligence", title: "Conversation Intelligence", app: "/app/conversations",
    tagline: "Turn every call into coaching, risk signals and next steps.",
    intro: "Paste or upload a transcript and get a structured summary, sentiment, objections, commitments and risks.",
    capabilities: [
      { title: "Structured analysis", body: "Summary, objections, competitors mentioned and action items." },
      { title: "Talk-time and sentiment", body: "Quickly see how the conversation balanced." },
      { title: "Saved to the deal", body: "Insights persist and link to accounts." },
    ],
    outcomes: [{ value: "6-9 hrs", label: "Saved weekly (target)" }, { value: "100%", label: "Calls analyzed" }, { value: "Instant", label: "Summaries" }],
  },
  {
    slug: "rep-coaching", title: "Rep Coaching", app: "/app/conversations",
    tagline: "Coach the moment, not the quarter.",
    intro: "Surface specific coaching moments from real conversations so managers can act while it still matters.",
    capabilities: [
      { title: "Scorecards", body: "Assess discovery, objection handling and next steps." },
      { title: "Moment library", body: "Share great calls as examples." },
      { title: "Progress over time", body: "Track improvement per rep." },
    ],
    outcomes: [{ value: "3x", label: "Faster ramp (target)" }, { value: "Weekly", label: "Coaching cadence" }, { value: "Better", label: "Win rates" }],
  },
  {
    slug: "revenue-intelligence", title: "Revenue Intelligence Software", app: "/app",
    tagline: "One layer of truth across the revenue lifecycle.",
    intro: "Combine engagement, pipeline and conversation data into dashboards leaders trust.",
    capabilities: [
      { title: "Unified data model", body: "Accounts, deals, activities and calls in one schema." },
      { title: "Executive dashboards", body: "Pipeline, forecast and activity at a glance." },
      { title: "Open integrations", body: "Connect CRM, email and calendar." },
    ],
    outcomes: [{ value: "1", label: "Platform" }, { value: "Live", label: "Dashboards" }, { value: "Open", label: "API" }],
  },
];

export const useCases = [
  { slug: "revenue-operations", title: "Revenue Operations", pitch: "Govern process, data and agent activity from one system.", points: ["Standardize stages and fields across teams", "Audit every agent run and credit spent", "Consolidate point tools and reduce stack sprawl"] },
  { slug: "sales-leaders", title: "Sales Leaders", pitch: "Forecast with evidence and see risk early.", points: ["Roll-ups by stage, team and quarter", "Deal risk surfaced with reasons", "Board-ready narrative in one click"] },
  { slug: "account-executives", title: "Account Executives", pitch: "Spend time with buyers, not in tabs.", points: ["Meeting prep generated from deal context", "Call summaries become next steps", "Follow-up drafted for your review"] },
  { slug: "sales-managers", title: "Sales Managers", pitch: "Coach while the deal is still live.", points: ["Coaching moments from real conversations", "Pipeline inspection by rep", "Ramp tracking for new hires"] },
  { slug: "sales-development", title: "Sales Development", pitch: "Prioritize the right accounts and reach them faster.", points: ["Sequences with AI-drafted steps", "Prioritized account lists", "Meetings booked into the calendar"] },
  { slug: "customer-success", title: "Customer Success", pitch: "Catch renewal risk and expansion signals early.", points: ["Account health in one view", "Conversation insights per customer", "Handoffs to sales with context"] },
];
