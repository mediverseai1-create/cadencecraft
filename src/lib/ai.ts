import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { creditCosts, type CreditAction } from "@/content/plans";
import { serverClient } from "./supabase";

export class AppError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

/** Authenticate, then atomically spend credits. Throws AppError when unauthenticated or out of credits. */
export async function requireUserAndSpend(action: CreditAction) {
  const sb = await serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) throw new AppError("Please sign in.", 401);
  const { data: ok, error } = await sb.rpc("consume_credits", { p_action: action, p_credits: creditCosts[action] });
  if (error) throw new AppError("Could not check credits.", 500);
  if (!ok) throw new AppError("Not enough AI credits. Upgrade your plan on the billing page.", 402);
  return { sb, user };
}

/** Return credits if the AI call fails after spending, so users are not charged for errors. */
export async function refund(sb: Awaited<ReturnType<typeof serverClient>>, action: CreditAction) {
  await sb.rpc("consume_credits", { p_action: `${action}_refund`, p_credits: -creditCosts[action] });
}

export async function generateJson<T extends z.ZodTypeAny>(prompt: string, schema: T): Promise<z.infer<T>> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AppError("AI is not configured. Set GEMINI_API_KEY on the server.", 503);
  const client = new GoogleGenerativeAI(key);
  // Try the configured model, then a fallback; retry once each on transient overload.
  const models = [...new Set([process.env.GEMINI_MODEL ?? "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"])];
  let text: string | null = null;
  for (const name of models) {
    // 15s hard cap per model so a slow upstream never hangs the request (worst case ~45s across 3 models).
    const model = client.getGenerativeModel({ model: name, generationConfig: { responseMimeType: "application/json", temperature: 0.3 } }, { timeout: 15000 });
    try { text = (await model.generateContent(prompt)).response.text(); }
    catch (e) {
      const status = (e as { status?: number }).status;
      // Client errors (bad key, bad request) won't improve on another model; overload, 5xx and timeouts fall through.
      if (status !== undefined && status >= 400 && status < 500 && status !== 429 && status !== 404) throw new AppError("AI request failed.", 502);
    }
    if (text !== null) break;
  }
  if (text === null) throw new AppError("The AI service is busy right now. Try again in a minute. You were not charged.", 503);
  let parsed: unknown;
  try { parsed = JSON.parse(text); } catch { throw new AppError("AI returned an unreadable response. Try again.", 502); }
  const checked = schema.safeParse(parsed);
  if (!checked.success) throw new AppError("AI response failed validation. Try again.", 502);
  return checked.data;
}

export function errorResponse(e: unknown) {
  if (e instanceof AppError) return Response.json({ error: e.message }, { status: e.status });
  console.error(e);
  return Response.json({ error: "Unexpected server error." }, { status: 500 });
}
