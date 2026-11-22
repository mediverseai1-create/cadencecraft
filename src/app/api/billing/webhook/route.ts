import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { adminClient } from "@/lib/supabase";
import { planById } from "@/content/plans";

/**
 * Trusted payment confirmation. Your payment provider (or an admin script) POSTs here with
 * header `x-webhook-secret: $PAYMENT_WEBHOOK_SECRET`. A browser redirect alone never upgrades a plan.
 * NOTE: map your provider's real payload (and its signature scheme) onto this schema before going live.
 */
const body = z.object({ workspaceId: z.string().uuid(), plan: z.enum(["essentials", "core", "plus", "pro"]), providerRef: z.string().min(1), provider: z.string().default("payment-link") });

export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const given = req.headers.get("x-webhook-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid payload" }, { status: 400 });
  const plan = planById(parsed.data.plan)!;
  const db = adminClient();
  const { error: subErr } = await db.from("subscriptions").insert({ workspace_id: parsed.data.workspaceId, plan: plan.id, provider: parsed.data.provider, provider_ref: parsed.data.providerRef });
  if (subErr && subErr.code === "23505") return Response.json({ ok: true, duplicate: true }); // idempotent
  if (subErr) return Response.json({ error: "Could not record subscription" }, { status: 500 });
  const { error } = await db.from("workspaces").update({ plan: plan.id, credits_total: plan.credits, credits_used: 0 }).eq("id", parsed.data.workspaceId);
  if (error) return Response.json({ error: "Could not update workspace" }, { status: 500 });
  await db.from("notifications").insert({ workspace_id: parsed.data.workspaceId, title: `Plan upgraded to ${plan.name}`, body: `${plan.credits.toLocaleString()} credits available.` });
  return Response.json({ ok: true });
}
