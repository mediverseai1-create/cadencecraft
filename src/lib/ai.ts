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
  const model = new GoogleGenerativeAI(key).getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-flash-latest",
    generationConfig: { responseMimeType: "application/json", temperature: 0.3 },
  });
  const result = await model.generateContent(prompt);
  let parsed: unknown;
  try { parsed = JSON.parse(result.response.text()); } catch { throw new AppError("AI returned an unreadable response. Try again.", 502); }
  const checked = schema.safeParse(parsed);
  if (!checked.success) throw new AppError("AI response failed validation. Try again.", 502);
  return checked.data;
}

export function errorResponse(e: unknown) {
  if (e instanceof AppError) return Response.json({ error: e.message }, { status: e.status });
  console.error(e);
  return Response.json({ error: "Unexpected server error." }, { status: 500 });
}
