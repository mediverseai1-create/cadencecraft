import { serverClient } from "@/lib/supabase";
import { renameWorkspace, updateProfile } from "../actions";

const input = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export default async function Settings() {
  const sb = await serverClient();
  const { data: { user } } = await sb.auth.getUser();
  const [{ data: ws }, { data: prof }] = await Promise.all([sb.from("workspaces").select("name").single(), sb.from("profiles").select("full_name").single()]);
  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <form action={updateProfile} className="card-light space-y-3 p-6"><h2 className="font-semibold">Profile</h2><p className="text-sm text-muted">{user?.email}</p><input name="full_name" defaultValue={prof?.full_name ?? ""} placeholder="Full name" className={input} /><button className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">Save</button></form>
      <form action={renameWorkspace} className="card-light space-y-3 p-6"><h2 className="font-semibold">Workspace</h2><input name="name" defaultValue={ws?.name ?? ""} required className={input} /><button className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">Rename</button></form>
    </div>
  );
}
