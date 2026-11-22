import { z } from "zod";
import { AppError, errorResponse, generateJson, refund, requireUserAndSpend } from "@/lib/ai";
import { rollup } from "@/lib/forecast";

const out = z.object({ narrative: z.string(), risks: z.array(z.string()) });

export async function POST() {
  let spent: Awaited<ReturnType<typeof requireUserAndSpend>> | null = null;
  try {
    spent = await requireUserAndSpend("forecast_commentary");
    const { data: deals } = await spent.sb.from("deals").select("name, amount, stage, close_date, next_step");
    if (!deals?.length) throw new AppError("Add deals before generating commentary.");
    const numbers = rollup(deals); // deterministic figures are computed in code, never by the model
    const result = await generateJson(
      `You write a concise forecast commentary for a sales leader. Use ONLY these computed numbers, do not recompute: ${JSON.stringify(numbers)}. Deals: ${JSON.stringify(deals.slice(0, 40))}. Respond ONLY with JSON {"narrative": string, "risks": string[]}.`,
      out,
    );
    await spent.sb.from("agent_runs").insert({ agent: "forecast_commentary", input: numbers, output: result, credits: 150 });
    return Response.json({ numbers, ...result });
  } catch (e) {
    if (spent) await refund(spent.sb, "forecast_commentary").catch(() => {}); // spent is only set after a successful charge
    return errorResponse(e);
  }
}
