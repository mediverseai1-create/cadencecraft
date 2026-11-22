export type NavLink = { label: string; href: string; desc?: string };

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
  { label: "Revenue Intelligence Software", href: "/platform/revenue-intelligence" },
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
  { label: "Customer stories", href: "/resources/customer-stories" },
  { label: "Compare vs. point tools", href: "/why-cadencecraft#compare" },
  { label: "Security & trust", href: "/security" },
];

export const resourceGroups: { title: string; links: (NavLink & { desc: string })[] }[] = [
  {
    title: "Content library",
    links: [
      { label: "Blog", href: "/resources/blog", desc: "Explore sales trends, tips and tricks" },
      { label: "Agent Recipes", href: "/resources/agent-recipes", desc: "Step-by-step AI agent workflows for revenue teams" },
      { label: "Reports & guides", href: "/resources/reports-guides", desc: "Learn best practices from industry experts" },
      { label: "Webinars & videos", href: "/resources/webinars", desc: "Watch online or in person" },
      { label: "Inside the Agentic Studio", href: "/resources/agentic-studio", desc: "Candid conversations with enterprise leaders on scaling AI" },
      { label: "Tools", href: "/resources/tools", desc: "Free sales tools, calculators, and quizzes" },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "Success Center", href: "/support", desc: "Get the most out of CadenceCraft" },
      { label: "Support", href: "/support", desc: "Find answers" },
      { label: "CadenceCraft University", href: "/resources/university", desc: "Learn new skills" },
      { label: "Product news", href: "/resources/product-news", desc: "See the latest updates" },
      { label: "Marketplace", href: "/integrations", desc: "Browse CadenceCraft integrations" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Become a Partner", href: "/partners", desc: "Marketplace, referral and services partners" },
      { label: "Partner Portal", href: "/login", desc: "Log in to the Partner Portal" },
    ],
  },
];

export const footerCols: { title: string; links: NavLink[] }[] = [
  { title: "Platform", links: platformNav.slice(0, 8) },
  { title: "Use cases", links: useCaseNav },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Agent Recipes", href: "/resources/agent-recipes" },
      { label: "Reports & guides", href: "/resources/reports-guides" },
      { label: "Webinars & videos", href: "/resources/webinars" },
      { label: "Customer stories", href: "/resources/customer-stories" },
      { label: "Tools", href: "/resources/tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
