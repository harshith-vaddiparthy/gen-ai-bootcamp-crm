create extension if not exists "pgcrypto";

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_users (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'rep',
  created_at timestamptz not null default now()
);

create table if not exists public.pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  sort_order int not null,
  win_probability int not null default 0,
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  owner_id uuid references public.crm_users(id) on delete set null,
  name text not null,
  segment text not null default 'Mid-market',
  website text,
  health text not null default 'Needs Attention',
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  account_id uuid references public.accounts(id) on delete cascade,
  name text not null,
  title text,
  email text,
  phone text,
  relationship_strength text not null default 'Medium',
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  owner_id uuid references public.crm_users(id) on delete set null,
  name text not null,
  company text not null,
  source text not null default 'Manual',
  status text not null default 'New',
  score int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  account_id uuid references public.accounts(id) on delete cascade,
  owner_id uuid references public.crm_users(id) on delete set null,
  stage_id uuid references public.pipeline_stages(id) on delete set null,
  name text not null,
  amount numeric(12, 2) not null default 0,
  probability int not null default 0,
  close_date date,
  health text not null default 'Needs Attention',
  next_step text,
  score int not null default 50,
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  account_id uuid references public.accounts(id) on delete cascade,
  type text not null,
  summary text not null,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  owner_id uuid references public.crm_users(id) on delete set null,
  deal_id uuid references public.deals(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  account_id uuid references public.accounts(id) on delete cascade,
  title text not null,
  due_date date,
  status text not null default 'open',
  priority text not null default 'Medium',
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  author_id uuid references public.crm_users(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  account_id uuid references public.accounts(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_suggestions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  record_type text not null,
  record_id uuid,
  type text not null,
  status text not null default 'pending',
  title text not null,
  detail text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_accounts_workspace on public.accounts(workspace_id);
create index if not exists idx_contacts_workspace on public.contacts(workspace_id);
create index if not exists idx_deals_workspace on public.deals(workspace_id);
create index if not exists idx_activities_workspace on public.activities(workspace_id);
create index if not exists idx_tasks_workspace on public.tasks(workspace_id);
create index if not exists idx_ai_suggestions_workspace on public.ai_suggestions(workspace_id);

alter table public.workspaces enable row level security;
alter table public.crm_users enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.accounts enable row level security;
alter table public.contacts enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.activities enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;
alter table public.ai_suggestions enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'workspaces',
    'crm_users',
    'pipeline_stages',
    'accounts',
    'contacts',
    'leads',
    'deals',
    'activities',
    'tasks',
    'notes',
    'ai_suggestions'
  ]
  loop
    execute format(
      'drop policy if exists "service role manages %I" on public.%I',
      table_name,
      table_name
    );
    execute format(
      'create policy "service role manages %I" on public.%I for all using (auth.role() = ''service_role'') with check (auth.role() = ''service_role'')',
      table_name,
      table_name
    );
  end loop;
end $$;
