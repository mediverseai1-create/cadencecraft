"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { browserClient } from "@/lib/supabase-browser";
import { LogoMark } from "./Logo";

type Mode = "login" | "signup" | "forgot" | "reset";

function Form({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setInfo(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    const sb = browserClient();
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const next = params.get("next");
        router.replace(next && next.startsWith("/app") ? next : "/app");
        router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: f.get("name"), company: f.get("company") }, emailRedirectTo: `${location.origin}/app` } });
        if (error) throw error;
        if (data.session) { router.replace("/app"); router.refresh(); } else setInfo("Check your email to confirm your account, then sign in.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/reset-password` });
        if (error) throw error;
        setInfo("If that email exists, a reset link is on its way.");
      } else {
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/app");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally { setBusy(false); }
  }

  const input = "w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-brand";
  const titles = { login: "Sign in", signup: "Create your account", forgot: "Reset your password", reset: "Choose a new password" };
  return (
    <form onSubmit={submit} className="card-light w-full max-w-[420px] space-y-4 p-8">
      <LogoMark className="h-9 w-9" />
      <h1 className="text-2xl font-semibold">{titles[mode]}</h1>
      {!configured && <p role="alert" className="rounded bg-amber-50 p-3 text-sm text-amber-800">Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.</p>}
      {params.get("error") === "not-configured" && <p className="text-sm text-amber-800">The app is unavailable until Supabase is configured.</p>}
      {mode === "signup" && (<><input name="name" required placeholder="Full name" className={input} /><input name="company" required placeholder="Company" className={input} /></>)}
      {mode !== "reset" && <input name="email" type="email" required placeholder="Work email" className={input} />}
      {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder="Password (8+ characters)" className={input} />}
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      {info && <p className="text-sm text-green-700">{info}</p>}
      <button disabled={busy || !configured} className="w-full rounded-[4px] bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "Please wait…" : titles[mode]}</button>
      <div className="flex justify-between text-sm text-brand">
        {mode === "login" && (<><Link href="/signup">Create account</Link><Link href="/forgot-password">Forgot password?</Link></>)}
        {mode === "signup" && <Link href="/login">Already have an account?</Link>}
        {mode === "forgot" && <Link href="/login">Back to sign in</Link>}
      </div>
    </form>
  );
}

export function AuthForm({ mode }: { mode: Mode }) {
  return (
    <main className="dot-bg flex min-h-screen items-center justify-center px-4 py-16">
      <Suspense><Form mode={mode} /></Suspense>
    </main>
  );
}
