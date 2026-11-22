"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { browserClient } from "@/lib/supabase-browser";

const input = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand";
const btn = "rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60";

async function post(url: string, body?: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Request failed.");
  return json;
}

export function ConversationAnalyzer() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [text, setText] = useState("");
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_000_000) { setErr("File is larger than 1 MB."); return; }
    setText(await file.text());
    // Persist the original to private storage, scoped to the workspace folder.
    const sb = browserClient();
    const { data: ws } = await sb.from("profiles").select("workspace_id").single();
    if (ws) await sb.storage.from("transcripts").upload(`${ws.workspace_id}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`, file);
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      await post("/api/ai/analyze", { title: new FormData(e.currentTarget).get("title"), transcript: text });
      setText("");
      router.refresh();
    } catch (x) { setErr(x instanceof Error ? x.message : "Failed."); } finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="card-light space-y-3 p-6">
      <h2 className="font-semibold">Analyze a call <span className="text-sm font-normal text-muted">(250 credits)</span></h2>
      <input name="title" required placeholder="Call title" className={input} />
      <textarea value={text} onChange={(e) => setText(e.target.value)} required rows={8} placeholder="Paste the transcript…" className={input} />
      <input type="file" accept=".txt,.md,.vtt,.srt" onChange={onFile} className="text-sm" />
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button disabled={busy} className={btn}>{busy ? "Analyzing…" : "Analyze"}</button>
    </form>
  );
}

export function OutreachDrafter({ accounts }: { accounts: { id: string; name: string }[] }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ subject: string; message: string } | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    try { setOut(await post("/api/ai/outreach", { accountId: f.get("accountId"), channel: f.get("channel"), goal: f.get("goal") })); }
    catch (x) { setErr(x instanceof Error ? x.message : "Failed."); } finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="card-light space-y-3 p-6">
      <h2 className="font-semibold">AI outreach draft <span className="text-sm font-normal text-muted">(50 credits)</span></h2>
      <select name="accountId" required className={input}><option value="">Choose account</option>{accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
      <select name="channel" className={input}><option value="email">Email</option><option value="call">Call script</option><option value="social">Social message</option></select>
      <input name="goal" defaultValue="Book a discovery call" className={input} />
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button disabled={busy} className={btn}>{busy ? "Drafting…" : "Draft"}</button>
      {out && <div className="rounded-lg bg-lavender p-4 text-sm"><p className="font-semibold">{out.subject}</p><p className="mt-2 whitespace-pre-wrap">{out.message}</p></div>}
    </form>
  );
}

export function ForecastCommentary() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ narrative: string; risks: string[] } | null>(null);
  async function run() {
    setErr(""); setBusy(true);
    try { setOut(await post("/api/ai/forecast")); } catch (x) { setErr(x instanceof Error ? x.message : "Failed."); } finally { setBusy(false); }
  }
  return (
    <div className="card-light space-y-3 p-6">
      <h2 className="font-semibold">AI forecast commentary <span className="text-sm font-normal text-muted">(150 credits)</span></h2>
      <p className="text-sm text-muted">Numbers are computed in code. The model only writes the narrative.</p>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button onClick={run} disabled={busy} className={btn}>{busy ? "Writing…" : "Generate commentary"}</button>
      {out && <div className="rounded-lg bg-lavender p-4 text-sm"><p>{out.narrative}</p><ul className="mt-3 list-disc pl-5">{out.risks.map((r) => <li key={r}>{r}</li>)}</ul></div>}
    </div>
  );
}
