import { serverClient } from "@/lib/supabase";
import { plans } from "@/content/plans";

const links: Record<string, string | undefined> = {
  essentials: process.env.NEXT_PUBLIC_PAYMENT_LINK_ESSENTIALS,
  core: process.env.NEXT_PUBLIC_PAYMENT_LINK_CORE,
  plus: process.env.NEXT_PUBLIC_PAYMENT_LINK_PLUS,
  pro: process.env.NEXT_PUBLIC_PAYMENT_LINK_PRO,
};

export default async function Billing() {
  const sb = await serverClient();
  const [{ data: ws }, { data: subs }] = await Promise.all([
    sb.from("workspaces").select("id, plan, credits_total, credits_used").single(),
    sb.from("subscriptions").select("plan, status, created_at").order("created_at", { ascending: false }),
  ]);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Billing</h1>
      <div className="card-light p-6"><p className="text-sm text-muted">Current plan</p><p className="text-3xl font-semibold capitalize">{ws?.plan}</p>
        <p className="mt-1 text-sm text-muted">{ws ? `${ws.credits_used.toLocaleString()} of ${ws.credits_total.toLocaleString()} credits used` : ""}</p>
        <p className="mt-3 text-xs text-muted">Workspace ID (include in payment reference): <code>{ws?.id}</code></p></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => {
          const href = links[p.id];
          return (
            <div key={p.id} className="card-light flex flex-col p-6"><h2 className="font-semibold">{p.name}</h2><p className="mt-2 text-2xl font-semibold text-brand">{p.credits.toLocaleString()} <span className="text-sm text-muted">credits</span></p>
              <div className="mt-auto pt-4">
                {ws?.plan === p.id ? <p className="text-sm font-semibold text-green-700">Current plan</p>
                  : href ? <a href={`${href}${href.includes("?") ? "&" : "?"}client_reference_id=${ws?.id}`} className="block rounded bg-brand py-2 text-center text-sm font-semibold text-white">Upgrade</a>
                  : <p className="text-sm text-muted">Payment link not configured.</p>}
              </div></div>
          );
        })}
      </div>
      <p className="text-sm text-muted">Plans change only after the payment provider confirms through the webhook. Returning from checkout does not upgrade your plan.</p>
      <div className="card-light p-6"><h2 className="font-semibold">Subscription history</h2>
        <ul className="mt-3 text-sm">{subs?.map((s, i) => <li key={i} className="border-t border-line py-2 capitalize">{s.plan} · {s.status} · {new Date(s.created_at).toLocaleDateString()}</li>)}{!subs?.length && <li className="text-muted">None yet.</li>}</ul></div>
    </div>
  );
}
