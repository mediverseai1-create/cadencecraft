"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { serverClient } from "@/lib/supabase";
import { stages } from "@/lib/forecast";

async function db() {
  const sb = await serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  return sb;
}
const text = (max = 200) => z.string().trim().max(max);

export async function signOut() {
  const sb = await serverClient();
  await sb.auth.signOut();
  redirect("/");
}

export async function createAccount(fd: FormData) {
  const p = z.object({ name: text().min(1), industry: text().optional(), size: text(50).optional(), website: text().optional(), notes: text(2000).optional() }).safeParse(Object.fromEntries(fd));
  if (!p.success) return;
  const sb = await db();
  await sb.from("accounts").insert(p.data);
  revalidatePath("/app/accounts");
}
export async function deleteAccount(fd: FormData) {
  const id = z.string().uuid().safeParse(fd.get("id"));
  if (!id.success) return;
  await (await db()).from("accounts").delete().eq("id", id.data);
  revalidatePath("/app/accounts");
}
export async function createContact(fd: FormData) {
  const p = z.object({ account_id: z.string().uuid(), name: text().min(1), email: text().optional(), title: text().optional() }).safeParse(Object.fromEntries(fd));
  if (!p.success) return;
  await (await db()).from("contacts").insert(p.data);
  revalidatePath("/app/accounts");
}

export async function createDeal(fd: FormData) {
  const p = z.object({ name: text().min(1), amount: z.coerce.number().min(0).max(1e12), account_id: z.string().uuid().optional().or(z.literal("")), close_date: z.string().optional(), next_step: text(500).optional() }).safeParse(Object.fromEntries(fd));
  if (!p.success) return;
  const { account_id, close_date, ...rest } = p.data;
  await (await db()).from("deals").insert({ ...rest, account_id: account_id || null, close_date: close_date || null });
  revalidatePath("/app/pipeline");
}
export async function moveDeal(fd: FormData) {
  const p = z.object({ id: z.string().uuid(), stage: z.enum(stages) }).safeParse(Object.fromEntries(fd));
  if (!p.success) return;
  await (await db()).from("deals").update({ stage: p.data.stage, last_activity_at: new Date().toISOString() }).eq("id", p.data.id);
  revalidatePath("/app/pipeline");
  revalidatePath("/app/forecast");
}
export async function deleteDeal(fd: FormData) {
  const id = z.string().uuid().safeParse(fd.get("id"));
  if (!id.success) return;
  await (await db()).from("deals").delete().eq("id", id.data);
  revalidatePath("/app/pipeline");
}

export async function createSequence(fd: FormData) {
  const p = z.object({ name: text().min(1), steps: text(2000) }).safeParse(Object.fromEntries(fd));
  if (!p.success) return;
  const steps = p.data.steps.split("\n").map((s) => s.trim()).filter(Boolean).map((s, i) => ({ day: i * 2, channel: "email", note: s }));
  await (await db()).from("sequences").insert({ name: p.data.name, steps });
  revalidatePath("/app/sequences");
}
export async function deleteSequence(fd: FormData) {
  const id = z.string().uuid().safeParse(fd.get("id"));
  if (!id.success) return;
  await (await db()).from("sequences").delete().eq("id", id.data);
  revalidatePath("/app/sequences");
}

export async function markAllRead() {
  await (await db()).from("notifications").update({ read: true }).eq("read", false);
  revalidatePath("/app/notifications");
}
export async function renameWorkspace(fd: FormData) {
  const name = text(120).min(1).safeParse(fd.get("name"));
  if (!name.success) return;
  const sb = await db();
  const { data } = await sb.from("workspaces").select("id").single();
  if (data) await sb.from("workspaces").update({ name: name.data }).eq("id", data.id);
  revalidatePath("/app/settings");
}
export async function updateProfile(fd: FormData) {
  const name = text(120).safeParse(fd.get("full_name"));
  if (!name.success) return;
  const sb = await db();
  const { data: { user } } = await sb.auth.getUser();
  await sb.from("profiles").update({ full_name: name.data }).eq("id", user!.id);
  revalidatePath("/app/settings");
}
