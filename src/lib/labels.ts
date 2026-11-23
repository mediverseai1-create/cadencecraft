export const agentLabel = (key: string) =>
  ({ conversation_analysis: "Call analysis", outreach_draft: "Outreach draft", forecast_commentary: "Forecast commentary", agent_run: "Agent run" } as Record<string, string>)[key.replace(/_refund$/, "")] ?? key;
