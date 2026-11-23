-- Safe to re-run. Run this alone if schema.sql already ran.
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant all on all functions in schema public to service_role;
grant select, insert, update, delete on public.accounts, public.contacts, public.deals, public.sequences,
  public.conversations, public.notifications to authenticated;
grant select, insert on public.agent_runs to authenticated;
grant select on public.workspaces, public.profiles, public.usage_events, public.subscriptions to authenticated;
grant update (name) on public.workspaces to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant execute on function public.current_workspace(), public.consume_credits(text, integer) to authenticated;
