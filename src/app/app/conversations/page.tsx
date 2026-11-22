import { serverClient } from "@/lib/supabase";
import { ConversationAnalyzer } from "@/components/AiPanels";

type Analysis = { summary: string; sentiment: string; objections: string[]; competitors: string[]; commitments: string[]; nextSteps: string[]; risks: string[]; coaching: string[] };

export default async function Conversations() {
  const sb = await serverClient();
  const { data } = await sb.from("conversations").select("id, title, analysis, created_at").order("created_at", { ascending: false });
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Conversation intelligence</h1>
      <ConversationAnalyzer />
      {!data?.length && <p className="text-muted">No analyzed conversations yet.</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {data?.map((c) => {
          const a = c.analysis as Analysis | null;
          return (
            <div key={c.id} className="card-light p-6 text-sm">
              <h2 className="text-base font-semibold">{c.title}</h2>
              {a && (<>
                <p className="mt-2">{a.summary}</p>
                <p className="mt-2 capitalize text-muted">Sentiment: {a.sentiment}</p>
                {([["Objections", a.objections], ["Commitments", a.commitments], ["Next steps", a.nextSteps], ["Risks", a.risks], ["Coaching", a.coaching]] as [string, string[]][]).map(([t, xs]) => xs.length > 0 && <div key={t} className="mt-3"><p className="font-semibold">{t}</p><ul className="list-disc pl-5">{xs.map((x) => <li key={x}>{x}</li>)}</ul></div>)}
              </>)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
