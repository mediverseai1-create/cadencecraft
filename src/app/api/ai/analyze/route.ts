import { z } from "zod";
import { AppError, errorResponse, generateJson, refund, requireUserAndSpend } from "@/lib/ai";

const body = z.object({ title: z.string().trim().min(1).max(200), transcript: z.string().trim().min(40, "Transcript is too short.").max(60000), dealId: z.string().uuid().optional() });

const analysis = z.object({
  summary: z.string(),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  objections: z.array(z.string()),
  competitors: z.array(z.string()),
  commitments: z.array(z.string()),
  nextSteps: z.array(z.string()),
  risks: z.array(z.string()),
  coaching: z.array(z.string()),
});

export async function POST(req: Request) {
  let spent: Awaited<ReturnType<typeof requireUserAndSpend>> | null = null;
  try {
    const input = body.safeParse(await req.json().catch(() => null));
    if (!input.success) throw new AppError(input.error.issues[0]?.message ?? "Invalid input.");
    spent = await requireUserAndSpend("conversation_analysis");
    const result = await generateJson(
      `You analyze sales call transcripts. Respond ONLY with JSON having keys: summary (string), sentiment ("positive"|"neutral"|"negative"), objections, competitors, commitments, nextSteps, risks, coaching (each an array of short strings). Use only facts in the transcript. Transcript:\n"""${input.data.transcript}"""`,
      analysis,
    );
    const { data, error } = await spent.sb.from("conversations").insert({ title: input.data.title, transcript: input.data.transcript, analysis: result, deal_id: input.data.dealId ?? null }).select("id").single();
    if (error) throw new AppError("Analysis succeeded but saving failed.", 500);
    await spent.sb.from("agent_runs").insert({ agent: "conversation_analysis", input: { title: input.data.title }, output: result, credits: 250 });
    return Response.json({ id: data.id, analysis: result });
  } catch (e) {
    if (spent) await refund(spent.sb, "conversation_analysis").catch(() => {});
    return errorResponse(e);
  }
}
