import Link from "next/link";
import { redirect } from "next/navigation";
import { Bell, BarChart3, Bot, Building2, CreditCard, Home, KanbanSquare, LineChart, MessagesSquare, Send, Settings } from "lucide-react";
import { serverClient } from "@/lib/supabase";
import { LogoMark } from "@/components/Logo";
import { signOut } from "./actions";

export const metadata = { title: "App" };

const nav = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/accounts", label: "Accounts", icon: Building2 },
  { href: "/app/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/app/sequences", label: "Sequences", icon: Send },
  { href: "/app/conversations", label: "Conversations", icon: MessagesSquare },
  { href: "/app/forecast", label: "Forecast", icon: LineChart },
  { href: "/app/agents", label: "Agents", icon: Bot },
  { href: "/app/usage", label: "Usage", icon: BarChart3 },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const sb = await serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const { data: ws } = await sb.from("workspaces").select("name, plan, credits_total, credits_used").single();
  const { count } = await sb.from("notifications").select("id", { count: "exact", head: true }).eq("read", false);
  const left = ws ? ws.credits_total - ws.credits_used : 0;
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f6fc] md:flex-row">
      <aside className="bg-night text-white md:w-60 md:shrink-0">
        <div className="flex items-center gap-2 px-5 py-5"><LogoMark className="h-7 w-7" /><span className="font-semibold">CadenceCraft</span></div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible">
          {nav.map(({ href, label, icon: I }) => (
            <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
              <I className="h-4 w-4" />{label}
              {label === "Notifications" && !!count && <span className="ml-auto rounded-full bg-brand px-2 text-xs">{count}</span>}
            </Link>
          ))}
        </nav>
        <div className="hidden px-5 py-4 text-xs text-white/70 md:block">
          <p className="font-semibold text-white">{ws?.name}</p>
          <p className="capitalize">{ws?.plan} plan · {left.toLocaleString()} credits left</p>
          <form action={signOut}><button className="mt-3 underline">Sign out</button></form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
