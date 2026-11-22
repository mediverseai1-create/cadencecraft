export type Plan = {
  id: "essentials" | "core" | "plus" | "pro";
  name: string;
  credits: number;
  badge?: string;
  blurb: string;
  features: string[];
  limits: { apiCalls: number; customObjects: number; knowledgeMb: number };
  stat?: { value: string; label: string }[];
};

export const plans: Plan[] = [
  { id: "plus", name: "Amplify Plus", credits: 50000, badge: "Most Popular!", blurb: "Engagement, deals and conversation intelligence for growing teams.",
    features: ["50,000 AI credits per month", "Sales engagement and sequences", "Pipeline and deal management", "Conversation intelligence", "Mutual action plans"],
    limits: { apiCalls: 500000, customObjects: 10, knowledgeMb: 750 }, stat: [{ value: "81%", label: "deal-outcome accuracy (goal)" }, { value: "3x", label: "faster rep ramp (goal)" }] },
  { id: "pro", name: "Amplify Pro", credits: 100000, blurb: "Everything in Plus with advanced forecasting and governance.",
    features: ["100,000 AI credits per month", "Everything in Amplify Plus", "Forecast roll-ups and AI commentary", "Advanced agent governance", "Priority support"],
    limits: { apiCalls: 1000000, customObjects: 20, knowledgeMb: 1500 }, stat: [{ value: "½", label: "the time on forecasts (goal)" }, { value: "15%", label: "fewer forecast errors (goal)" }] },
  { id: "essentials", name: "Amplify Essentials", credits: 10000, blurb: "Conversation intelligence to start learning from every call.",
    features: ["10,000 AI credits per month", "Conversation intelligence", "Account records", "Email support"],
    limits: { apiCalls: 100000, customObjects: 2, knowledgeMb: 250 } },
  { id: "core", name: "Amplify Core", credits: 25000, blurb: "Pipeline and account management for lean revenue teams.",
    features: ["25,000 AI credits per month", "Pipeline management", "Account management", "Conversation intelligence"],
    limits: { apiCalls: 250000, customObjects: 5, knowledgeMb: 500 } },
];

export const planById = (id: string) => plans.find((p) => p.id === id);

/** Credits each AI action costs. Used for deterministic usage tracking. */
export const creditCosts = { conversation_analysis: 250, outreach_draft: 50, forecast_commentary: 150, agent_run: 100 } as const;
export type CreditAction = keyof typeof creditCosts;

/** Free workspace allowance before a paid plan is activated. */
export const FREE_CREDITS = 2000;
