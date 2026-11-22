-- CadenceCraft schema. Run in the Supabase SQL editor (or `supabase db push`).
create extension if not exists "pgcrypto";

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'free' check (plan in ('free','essentials','core','plus','pro')),
  credits_total integer not null default 2000,
  credits_used integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  workspace_id uuid not null references public.workspaces on delete cascade,
  full_name text,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

create or replace function public.current_workspace() returns uuid
language sql stable security definer set search_path = public as
$$ select workspace_id from public.profiles where id = auth.uid() $$;

-- New user => new workspace + profile
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare ws uuid;
begin
  insert into public.workspaces (name) values (coalesce(new.raw_user_meta_data->>'company', 'My workspace')) returning id into ws;
  insert into public.profiles (id, workspace_id, full_name) values (new.id, ws, new.raw_user_meta_data->>'full_name');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  name text not null, industry text, size text, website text, status text not null default 'prospect',
  notes text, created_at timestamptz not null default now()
);
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  account_id uuid references public.accounts on delete set null,
  name text not null, email text, title text, created_at timestamptz not null default now()
);
create table public.deals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  account_id uuid references public.accounts on delete set null,
  name text not null, amount numeric(14,2) not null default 0,
  stage text not null default 'prospecting' check (stage in ('prospecting','qualified','proposal','negotiation','closed_won','closed_lost')),
  close_date date, next_step text, last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create table public.sequences (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  name text not null, steps jsonb not null default '[]', active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  deal_id uuid references public.deals on delete set null,
  title text not null, transcript text not null, analysis jsonb,
  file_path text, created_at timestamptz not null default now()
);
create table public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  agent text not null, input jsonb, output jsonb, credits integer not null default 0,
  status text not null default 'completed', created_at timestamptz not null default now()
);
create table public.usage_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces on delete cascade,
  action text not null, credits integer not null, created_at timestamptz not null default now()
);
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default public.current_workspace() references public.workspaces on delete cascade,
  title text not null, body text, read boolean not null default false, created_at timestamptz not null default now()
);
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces on delete cascade,
  plan text not null, status text not null default 'active', provider text, provider_ref text unique,
  created_at timestamptz not null default now()
);
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null, name text not null, email text not null, company text, message text,
  created_at timestamptz not null default now()
);

-- Atomic credit spend. Fails (returns false) when the workspace lacks credits.
create or replace function public.consume_credits(p_action text, p_credits integer) returns boolean
language plpgsql security definer set search_path = public as $$
declare ws uuid := public.current_workspace(); ok boolean;
begin
  if ws is null then return false; end if;
  update public.workspaces set credits_used = credits_used + p_credits
   where id = ws and credits_used + p_credits <= credits_total returning true into ok;
  if ok then insert into public.usage_events (workspace_id, action, credits) values (ws, p_action, p_credits); end if;
  return coalesce(ok, false);
end $$;

-- Row Level Security
alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.contacts enable row level security;
alter table public.deals enable row level security;
alter table public.sequences enable row level security;
alter table public.conversations enable row level security;
alter table public.agent_runs enable row level security;
alter table public.usage_events enable row level security;
alter table public.notifications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.leads enable row level security;

create policy "own workspace read" on public.workspaces for select using (id = public.current_workspace());
create policy "own workspace rename" on public.workspaces for update using (id = public.current_workspace()) with check (id = public.current_workspace());
-- plan / credits_total are changed only by the service role (webhook); block client edits:
revoke update on public.workspaces from authenticated;
grant update (name) on public.workspaces to authenticated;

create policy "own profile" on public.profiles for select using (id = auth.uid());
create policy "own profile update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid() and workspace_id = public.current_workspace());

do $$ declare t text; begin
  foreach t in array array['accounts','contacts','deals','sequences','conversations','notifications'] loop
    execute format('create policy "ws all" on public.%I for all using (workspace_id = public.current_workspace()) with check (workspace_id = public.current_workspace())', t);
  end loop;
end $$;
create policy "ws read" on public.agent_runs for select using (workspace_id = public.current_workspace());
create policy "ws insert" on public.agent_runs for insert with check (workspace_id = public.current_workspace());
create policy "ws read" on public.usage_events for select using (workspace_id = public.current_workspace());
create policy "ws read" on public.subscriptions for select using (workspace_id = public.current_workspace());
-- leads: inserted by the server with the service role only (no policies => no client access)

-- Storage: private bucket for call recordings / transcripts, scoped by workspace folder
insert into storage.buckets (id, name, public) values ('transcripts', 'transcripts', false) on conflict do nothing;
create policy "ws files" on storage.objects for all to authenticated
  using (bucket_id = 'transcripts' and (storage.foldername(name))[1] = public.current_workspace()::text)
  with check (bucket_id = 'transcripts' and (storage.foldername(name))[1] = public.current_workspace()::text);
