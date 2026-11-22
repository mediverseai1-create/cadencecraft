import { serverClient } from "@/lib/supabase";
import { markAllRead } from "../actions";

export default async function Notifications() {
  const sb = await serverClient();
  const { data } = await sb.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-semibold">Notifications</h1><form action={markAllRead}><button className="text-sm font-semibold text-brand">Mark all read</button></form></div>
      <div className="space-y-3">{data?.map((n) => <div key={n.id} className={`card-light p-4 ${n.read ? "opacity-60" : ""}`}><p className="font-semibold">{n.title}</p>{n.body && <p className="text-sm text-muted">{n.body}</p>}<p className="mt-1 text-xs text-muted">{new Date(n.created_at).toLocaleString()}</p></div>)}{!data?.length && <p className="text-muted">You are all caught up.</p>}</div>
    </div>
  );
}
