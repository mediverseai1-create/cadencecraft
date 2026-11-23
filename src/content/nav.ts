export type NavLink = { label: string; href: string };

export const platformNav: NavLink[] = [
  { label: "AI Agents", href: "/platform/ai-agents" },
  { label: "What is CadenceCraft?", href: "/platform" },
  { label: "Pipeline Management", href: "/platform/pipeline-management" },
  { label: "Sales Forecasting", href: "/platform/sales-forecasting" },
  { label: "Deal Insights", href: "/platform/deal-insights" },
  { label: "Account Management", href: "/platform/account-management" },
  { label: "Sales Engagement", href: "/platform/sales-engagement" },
  { label: "Deal Management", href: "/platform/deal-management" },
  { label: "Mutual Action Plans", href: "/platform/mutual-action-plans" },
  { label: "Conversation Intelligence", href: "/platform/conversation-intelligence" },
  { label: "Rep Coaching", href: "/platform/rep-coaching" },
  { label: "Revenue Intelligence", href: "/platform/revenue-intelligence" },
];

export const useCaseNav: NavLink[] = [
  { label: "Revenue Operations", href: "/use-cases/revenue-operations" },
  { label: "Sales Leaders", href: "/use-cases/sales-leaders" },
  { label: "Account Executives", href: "/use-cases/account-executives" },
  { label: "Sales Managers", href: "/use-cases/sales-managers" },
  { label: "Sales Development", href: "/use-cases/sales-development" },
  { label: "Customer Success", href: "/use-cases/customer-success" },
];

export const whyNav: NavLink[] = [
  { label: "Why CadenceCraft?", href: "/why-cadencecraft" },
  { label: "About", href: "/about" },
  { label: "Security and trust", href: "/security" },
];

export const footerCols: { title: string; links: NavLink[] }[] = [
  { title: "Platform", links: platformNav.slice(0, 8) },
  { title: "Use cases", links: useCaseNav },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
