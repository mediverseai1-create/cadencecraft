export type Plan = {
  id: "free" | "essentials" | "core" | "pro";
  price: number;
  name: string;
  credits: number;
  badge?: string;
  blurb: string;
  features: string[];
  limits: { apiCalls: number; customObjects: number; knowledgeMb: number };
  stat?: { value: string; label: string }[];
};

export const plans: Plan[] = [
  { id: "free", price: 0, name: "Free", credits: 2000, blurb: "Try the platform with a starter credit allowance.",
    features: ["2,000 AI credits to start", "Accounts, pipeline and sequences", "Conversation analysis", "Community support"],
    limits: { apiCalls: 10000, customObjects: 1, knowledgeMb: 50 } },
  { id: "pro", price: 97, name: "Amplify Pro", credits: 100000, blurb: "Advanced forecasting, governance and priority support.",
    features: ["100,000 AI credits per month", "Everything in Amplify Core", "Forecast roll-ups and AI commentary", "Advanced agent governance", "Priority support"],
    limits: { apiCalls: 1000000, customObjects: 20, knowledgeMb: 1500 }, stat: [{ value: "½", label: "the time on forecasts" }, { value: "15%", label: "fewer forecast errors" }] },
  { id: "essentials", price: 47, name: "Amplify Essentials", credits: 10000, blurb: "Conversation intelligence to start learning from every call.",
    features: ["10,000 AI credits per month", "Conversation intelligence", "Account records", "Email support"],
    limits: { apiCalls: 100000, customObjects: 2, knowledgeMb: 250 } },
  { id: "core", price: 57, badge: "Most Popular!", name: "Amplify Core", credits: 25000, blurb: "Pipeline and account management for lean revenue teams.",
    features: ["25,000 AI credits per month", "Pipeline management", "Account management", "Conversation intelligence"],
    limits: { apiCalls: 250000, customObjects: 5, knowledgeMb: 500 } },
];

export const planById = (id: string) => plans.find((p) => p.id === id);

/** Credits each AI action costs. Used for deterministic usage tracking. */
export const creditCosts = { conversation_analysis: 250, outreach_draft: 50, forecast_commentary: 150, agent_run: 100 } as const;
export type CreditAction = keyof typeof creditCosts;

/** Free workspace allowance before a paid plan is activated. */
export const FREE_CREDITS = 2000;
