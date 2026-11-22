import { z } from "zod";
import { AppError, errorResponse, generateJson, refund, requireUserAndSpend } from "@/lib/ai";

const body = z.object({ accountId: z.string().uuid(), channel: z.enum(["email", "call", "social"]).default("email"), goal: z.string().trim().max(300).default("Book a discovery call") });
const out = z.object({ subject: z.string(), message: z.string() });

export async function POST(req: Request) {
  let spent: Awaited<ReturnType<typeof requireUserAndSpend>> | null = null;
  try {
    const input = body.safeParse(await req.json().catch(() => null));
    if (!input.success) throw new AppError("Choose an account first.");
    spent = await requireUserAndSpend("outreach_draft");
    const { data: acct } = await spent.sb.from("accounts").select("name, industry, size, notes").eq("id", input.data.accountId).single();
    if (!acct) throw new AppError("Account not found.", 404);
    const { data: contacts } = await spent.sb.from("contacts").select("name, title").eq("account_id", input.data.accountId).limit(3);
    const result = await generateJson(
      `Write one short ${input.data.channel} outreach step. Goal: ${input.data.goal}. Account: ${JSON.stringify(acct)}. Contacts: ${JSON.stringify(contacts ?? [])}. Do not invent facts beyond these. Respond ONLY with JSON {"subject": string, "message": string}.`,
      out,
    );
    await spent.sb.from("agent_runs").insert({ agent: "outreach_draft", input: input.data, output: result, credits: 50 });
    return Response.json(result);
  } catch (e) {
    if (spent) await refund(spent.sb, "outreach_draft").catch(() => {});
    return errorResponse(e);
  }
}
