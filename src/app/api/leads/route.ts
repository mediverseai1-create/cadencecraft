import { z } from "zod";
import { adminClient } from "@/lib/supabase";

const schema = z.object({
  kind: z.enum(["demo", "contact"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional(),
  message: z.string().trim().max(4000).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Please check your details." }, { status: 400 });
  try {
    const { error } = await adminClient().from("leads").insert(parsed.data);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We could not save your request. Please try again later." }, { status: 503 });
  }
}
