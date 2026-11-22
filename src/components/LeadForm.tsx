"use client";
import { useState } from "react";

export function LeadForm({ kind }: { kind: "demo" | "contact" }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, kind }) });
    const json = await res.json().catch(() => ({}));
    if (res.ok) setState("done");
    else { setState("error"); setMsg(json.error ?? "Something went wrong."); }
  }
  if (state === "done") return <p className="card-light p-8 text-lg font-semibold">Thanks, we’ll be in touch shortly.</p>;
  const input = "w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-brand";
  return (
    <form onSubmit={submit} className="card-light space-y-4 p-8">
      <input name="name" required placeholder="Full name" className={input} />
      <input name="email" type="email" required placeholder="Work email" className={input} />
      <input name="company" placeholder="Company" className={input} />
      <textarea name="message" rows={4} placeholder={kind === "demo" ? "What would you like to see?" : "How can we help?"} className={input} />
      {state === "error" && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      <button disabled={state === "sending"} className="w-full rounded-[4px] bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{state === "sending" ? "Sending…" : kind === "demo" ? "Request a demo" : "Send message"}</button>
    </form>
  );
}
