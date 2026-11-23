"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { browserClient } from "@/lib/supabase-browser";
import { Logo } from "./Logo";

type Mode = "login" | "signup" | "forgot" | "reset";

function siteOrigin() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  return env && !/localhost|127\.0\.0\.1/.test(env) ? env.replace(/\/$/, "") : location.origin;
}

function friendly(message: string) {
  if (/invalid login/i.test(message)) return "Email or password is incorrect.";
  if (/email not confirmed/i.test(message)) return "Confirm your email first. Check your inbox for the link.";
  if (/already registered/i.test(message)) return "An account with this email already exists. Sign in instead.";
  if (/rate limit/i.test(message)) return "Too many attempts. Wait a few minutes and try again.";
  return message;
}

function Form({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const landing = plan && ["essentials", "core", "pro"].includes(plan) ? `/app/billing?plan=${plan}` : "/app";

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
        router.replace(next && next.startsWith("/app") ? next : landing);
        router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: f.get("name"), company: f.get("company") }, emailRedirectTo: `${siteOrigin()}${landing}` } });
        if (error) throw error;
        if (data.session) { router.replace(landing); router.refresh(); }
        else setInfo("Account created. Check your email and confirm your address to continue.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${siteOrigin()}/reset-password` });
        if (error) throw error;
        setInfo("If that email has an account, a reset link is on its way.");
      } else {
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/app");
      }
    } catch (e) {
      setErr(friendly(e instanceof Error ? e.message : "Something went wrong. Try again."));
    } finally { setBusy(false); }
  }

  const input = "w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-brand";
  const titles = { login: "Sign in", signup: "Create account", forgot: "Reset your password", reset: "Choose a new password" };
  const cta = { login: "Sign in", signup: "Sign up", forgot: "Send reset link", reset: "Save password" };
  return (
    <form onSubmit={submit} className="card-light w-full max-w-[420px] space-y-4 p-8">
      <Link href="/" aria-label="CadenceCraft home"><Logo dark={false} /></Link>
      <h1 className="text-2xl font-semibold">{titles[mode]}</h1>
      {mode === "signup" && (<><input name="name" required placeholder="Full name" autoComplete="name" className={input} /><input name="company" required placeholder="Company" autoComplete="organization" className={input} /></>)}
      {mode !== "reset" && <input name="email" type="email" required placeholder="Work email" autoComplete="email" className={input} />}
      {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder="Password (8 characters minimum)" autoComplete={mode === "login" ? "current-password" : "new-password"} className={input} />}
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      {info && <p role="status" className="text-sm text-green-700">{info}</p>}
      <button disabled={busy} className="w-full rounded-[4px] bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "Please wait" : cta[mode]}</button>
      <div className="flex justify-between text-sm text-brand">
        {mode === "login" && (<><Link href="/signup">Create account</Link><Link href="/forgot-password">Forgot password?</Link></>)}
        {mode === "signup" && <Link href="/login">Already have an account? Sign in</Link>}
        {(mode === "forgot" || mode === "reset") && <Link href="/login">Back to sign in</Link>}
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
