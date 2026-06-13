insert into public.workspaces (id, name)
values ('00000000-0000-0000-0000-000000000001', 'PulseCRM Sales')
on conflict (id) do update set name = excluded.name;

insert into public.crm_users (id, workspace_id, name, email, role)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Avery Jones', 'avery@pulsecrm.ai', 'manager'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Mina Patel', 'mina@pulsecrm.ai', 'rep'),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Jordan Lee', 'jordan@pulsecrm.ai', 'rep')
on conflict (id) do update set name = excluded.name, email = excluded.email, role = excluded.role;

insert into public.pipeline_stages (id, workspace_id, name, sort_order, win_probability)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'Qualified', 1, 42),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'Discovery', 2, 51),
  ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'Proposal', 3, 63),
  ('00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000001', 'Negotiation', 4, 78)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order, win_probability = excluded.win_probability;

insert into public.accounts (id, workspace_id, owner_id, name, segment, website, health)
values
  ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Northstar Labs', 'Enterprise', 'https://northstar.example', 'Needs legal follow-up'),
  ('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'RelayWorks', 'Mid-market', 'https://relayworks.example', 'Champion active'),
  ('00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000103', 'Mercury Retail', 'Enterprise', 'https://mercury.example', 'No next meeting')
on conflict (id) do update set name = excluded.name, health = excluded.health, owner_id = excluded.owner_id;

insert into public.contacts (id, workspace_id, account_id, name, title, email, relationship_strength)
values
  ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000301', 'Maya Chen', 'VP Finance', 'maya@northstar.example', 'Strong'),
  ('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000302', 'Chris Morgan', 'Head of RevOps', 'chris@relayworks.example', 'Strong'),
  ('00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000303', 'Priya Nair', 'Operations Director', 'priya@mercury.example', 'Medium')
on conflict (id) do update set name = excluded.name, title = excluded.title, email = excluded.email;

insert into public.deals (id, workspace_id, account_id, owner_id, stage_id, name, amount, probability, close_date, health, next_step, score)
values
  ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000204', 'Platform expansion', 96000, 78, '2026-06-28', 'Needs legal follow-up', 'Send legal redline summary today', 82),
  ('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000203', 'RevOps automation pilot', 74000, 63, '2026-07-03', 'Champion active', 'Confirm pilot success metrics', 76),
  ('00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000202', 'Regional rollout', 118000, 51, '2026-07-18', 'No next meeting', 'Book technical discovery', 58)
on conflict (id) do update set amount = excluded.amount, health = excluded.health, next_step = excluded.next_step, score = excluded.score;

insert into public.activities (workspace_id, deal_id, contact_id, account_id, type, summary, occurred_at)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000301', 'Call', 'Procurement confirmed security review is the blocker', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000302', 'Email', 'Sent ROI calculator and implementation plan', now() - interval '1 day'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000303', 'Meeting', 'Discovery with finance and operations stakeholders', now() - interval '1 day 4 hours');

insert into public.tasks (workspace_id, owner_id, deal_id, account_id, title, due_date, status, priority)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000301', 'Send legal redline summary', current_date, 'open', 'High'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000301', 'Draft CFO business case', current_date + interval '1 day', 'open', 'High'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000302', 'Confirm pilot success metrics', current_date + interval '2 days', 'open', 'Medium'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000303', 'Book technical discovery', current_date - interval '1 day', 'open', 'High');

insert into public.ai_suggestions (workspace_id, record_type, record_id, type, title, detail, payload)
values
  ('00000000-0000-0000-0000-000000000001', 'deal', '00000000-0000-0000-0000-000000000501', 'summary', 'Northstar deal summary', 'Legal review is the only visible blocker. Next best move is a concise redline summary plus CFO-facing ROI note.', '{"action":"Review summary"}'),
  ('00000000-0000-0000-0000-000000000001', 'deal', '00000000-0000-0000-0000-000000000503', 'risk', 'Mercury next step risk', 'Discovery went well, but there is no next meeting. Ask for a technical stakeholder session before the deal ages.', '{"action":"Draft follow-up"}')
on conflict do nothing;
