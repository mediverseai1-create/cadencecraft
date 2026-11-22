import { serverClient } from "@/lib/supabase";
import { createAccount, createContact, deleteAccount } from "../actions";

const input = "rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export default async function Accounts() {
  const sb = await serverClient();
  const { data: accounts } = await sb.from("accounts").select("*, contacts(id, name, title, email)").order("created_at", { ascending: false });
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Accounts</h1>
      <form action={createAccount} className="card-light grid gap-3 p-6 md:grid-cols-5">
        <input name="name" required placeholder="Account name" className={input} />
        <input name="industry" placeholder="Industry" className={input} />
        <input name="size" placeholder="Size (e.g. 200-500)" className={input} />
        <input name="website" placeholder="Website" className={input} />
        <button className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">Add account</button>
      </form>
      {!accounts?.length && <p className="text-muted">No accounts yet.</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {accounts?.map((a) => (
          <div key={a.id} className="card-light p-6">
            <div className="flex items-start justify-between"><div><h2 className="font-semibold">{a.name}</h2><p className="text-sm text-muted">{[a.industry, a.size].filter(Boolean).join(" · ") || "No details"}</p></div>
              <form action={deleteAccount}><input type="hidden" name="id" value={a.id} /><button className="text-xs text-red-600">Delete</button></form></div>
            <ul className="mt-3 space-y-1 text-sm">{a.contacts?.map((c: { id: string; name: string; title: string | null; email: string | null }) => <li key={c.id}>{c.name} <span className="text-muted">{c.title} {c.email}</span></li>)}</ul>
            <form action={createContact} className="mt-4 flex flex-wrap gap-2"><input type="hidden" name="account_id" value={a.id} /><input name="name" required placeholder="Contact name" className={input} /><input name="email" type="email" placeholder="Email" className={input} /><input name="title" placeholder="Title" className={input} /><button className="rounded border border-brand px-3 py-2 text-sm text-brand">Add contact</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
