# AI Sales CRM Product Document

## 1. Product Vision

Build a simple, AI-powered CRM for sales teams that makes pipeline work less manual. The product should help reps and managers see what is happening, understand which deals need attention, and turn messy sales notes into useful CRM updates.

This is not trying to beat Salesforce on configurability. The first version should win by being fast, clear, and helpful for the daily sales loop:

1. Know what needs attention.
2. Update records without busywork.
3. Draft the next follow-up.
4. Keep the pipeline honest.

## 2. Target Users

The first version is built for small sales teams.

Primary users:

- Sales reps managing leads, contacts, tasks, and active deals.
- Sales managers reviewing pipeline health, activity, and forecast risk.
- Founder-led sales teams that need CRM discipline without enterprise setup.

The product should assume a team has real selling motion, but not a dedicated RevOps department.

## 3. MVP Goals

- Provide a clean CRM dashboard with leads, contacts, accounts, deals, tasks, and account activity.
- Give sales teams a practical pipeline view with stage health, deal value, owners, and close dates.
- Add a Sales Copilot that summarizes records, suggests next actions, drafts follow-ups, and structures notes.
- Keep AI suggestions human-reviewed. AI can propose changes, but users approve before CRM data changes.
- Keep the system simple enough to demo and test quickly.

## 4. Non-Goals For V1

- Autonomous email sending.
- Full Gmail, Outlook, or calendar sync.
- Paid billing or plan management.
- Advanced quota forecasting.
- External enrichment providers.
- Complex workflow automation.
- Multi-agent orchestration.
- Enterprise permissions, territories, or custom object builders.

## 5. Core Workflows

### Pipeline Management

Users need to understand the current state of the pipeline.

Core behaviors:

- View deal stages, total value, stage conversion health, and deal counts.
- See which deals are stale, blocked, or likely to slip.
- Open a deal detail view to inspect activity, contacts, next tasks, and AI suggestions.
- Move deals between stages manually.

### Contact And Account Timeline

Users need to see the relationship history quickly.

Core behaviors:

- View account details, primary contacts, owner, company segment, and active opportunity.
- See a chronological timeline of calls, emails, meetings, notes, and tasks.
- Add a note that can be transformed into structured CRM fields by AI.

### Deal Detail

Users need one place to understand a deal.

Core behaviors:

- See deal amount, stage, owner, close date, buyer, account, and health.
- Review recent activity and missing next steps.
- Ask Sales Copilot for a concise deal summary.
- Draft a follow-up email from the latest context.

### Task And Follow-Up Tracking

Users need to know what to do next.

Core behaviors:

- View upcoming and overdue tasks.
- See tasks connected to deals, contacts, and accounts.
- Mark a task as done.
- Let AI suggest next tasks, but keep approval manual.

### Sales Copilot Actions

Users need AI assistance that produces usable CRM work, not vague advice.

Core actions:

- Summarize record: produce a short account, contact, or deal summary.
- Draft follow-up: produce a concise email draft based on deal context and desired tone.
- Structure note: convert messy notes into fields like contact, account, deal, stage, next task, activity summary, and confidence.

## 6. Entity Model

### Workspace

Represents one sales team or company.

Important fields:

- `id`
- `name`
- `createdAt`

### User

Represents a sales rep, manager, or admin.

Important fields:

- `id`
- `workspaceId`
- `name`
- `email`
- `role`

### Lead

Represents a potential buyer before qualification.

Important fields:

- `id`
- `workspaceId`
- `ownerId`
- `name`
- `company`
- `source`
- `status`
- `score`
- `createdAt`

### Contact

Represents a person attached to an account or deal.

Important fields:

- `id`
- `workspaceId`
- `accountId`
- `name`
- `title`
- `email`
- `phone`
- `relationshipStrength`

### Account

Represents a company or organization.

Important fields:

- `id`
- `workspaceId`
- `ownerId`
- `name`
- `segment`
- `website`
- `health`

### Deal

Represents a sales opportunity.

Important fields:

- `id`
- `workspaceId`
- `accountId`
- `ownerId`
- `name`
- `stageId`
- `amount`
- `probability`
- `closeDate`
- `health`
- `nextStep`

### PipelineStage

Represents a stage in the sales process.

Important fields:

- `id`
- `workspaceId`
- `name`
- `sortOrder`
- `winProbability`

### Activity

Represents a call, email, meeting, note, or other sales touch.

Important fields:

- `id`
- `workspaceId`
- `dealId`
- `contactId`
- `type`
- `summary`
- `occurredAt`

### Task

Represents a follow-up or next action.

Important fields:

- `id`
- `workspaceId`
- `ownerId`
- `dealId`
- `contactId`
- `title`
- `dueDate`
- `status`
- `priority`

### Note

Represents raw text written by a user.

Important fields:

- `id`
- `workspaceId`
- `authorId`
- `body`
- `createdAt`

### AISuggestion

Represents an AI-generated recommendation waiting for user review.

Important fields:

- `id`
- `workspaceId`
- `recordType`
- `recordId`
- `type`
- `status`
- `payload`
- `createdAt`

## 7. AI Features

### Record Summary

Input:

- Record type.
- Record fields.
- Recent activities.
- Open tasks.

Output:

- Short summary.
- Deal or account health.
- Key risks.
- Recommended next actions.
- Fields that need user review.

### Follow-Up Draft

Input:

- Recipient.
- Deal context.
- Recent activity.
- Goal of the message.
- Tone.

Output:

- Subject line.
- Email body.
- Tone label.
- Review checklist.

### Note-To-CRM Extraction

Input:

- Raw note text.

Output:

- Contact name.
- Account name.
- Deal name.
- Stage.
- Amount.
- Close date.
- Next task.
- Activity summary.
- Confidence score.
- Fields needing review.

### AI Guardrails

- The OpenAI API key must only be used on the server.
- AI responses must be treated as suggestions, not direct writes.
- Missing API keys should return a clear setup error.
- AI output should be structured where possible.
- Users should review any field updates before saving.

## 8. UX Structure

The app should use a collapsible shadcn dashboard sidebar with these areas:

- Dashboard
- Leads
- Contacts
- Accounts
- Deals
- Tasks
- Sales Copilot
- Settings

The dashboard should show:

- Revenue and pipeline KPIs.
- Pipeline stage health.
- Priority deals.
- Account activity timeline.
- Today's follow-up queue.
- Sales Copilot recommendations.

The first screen should feel like the sales team's operating room. It should avoid a landing page and put useful CRM information on screen immediately.

## 9. Technical Architecture

Recommended stack:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth and Postgres for team-ready persistence.
- OpenAI Responses API for server-side AI features.

Environment variables:

- `CRM_OPENAI_API_KEY`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `CRM_OPENAI_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Initial app structure:

- `PRODUCT_DOCUMENT.md` for product direction.
- `src/app/dashboard/page.tsx` for the first CRM dashboard.
- `src/components/app-sidebar.tsx` for CRM navigation.
- `src/lib/crm-data.ts` for realistic mocked CRM data.
- `src/lib/ai/openai.ts` for server-only OpenAI utilities.
- `src/app/api/ai/summarize-record/route.ts`
- `src/app/api/ai/draft-follow-up/route.ts`
- `src/app/api/ai/structure-note/route.ts`

## 10. API Routes

### POST `/api/ai/summarize-record`

Purpose:

- Summarize a lead, contact, account, or deal and suggest next actions.

Expected body:

```json
{
  "recordType": "deal",
  "record": {},
  "activities": [],
  "openTasks": []
}
```

### POST `/api/ai/draft-follow-up`

Purpose:

- Draft a follow-up email for a contact or deal.

Expected body:

```json
{
  "recipient": "Maya Chen",
  "goal": "Confirm procurement timeline",
  "tone": "direct",
  "context": {}
}
```

### POST `/api/ai/structure-note`

Purpose:

- Convert a messy sales note into structured CRM update suggestions.

Expected body:

```json
{
  "note": "Met Maya at Northstar. Budget approved, legal review next week, follow up Friday."
}
```

## 11. Risks

- AI can produce confident but wrong suggestions. The product must keep review in the loop.
- A CRM without integrations can become demo-only if manual entry is too heavy. The MVP should make manual entry less painful before adding sync.
- Sales teams will ignore generic AI advice. AI output needs to map to concrete CRM actions.
- Pipeline dashboards can become noisy. The MVP should emphasize next action, stale deals, and forecast risk.
- OpenAI model availability and cost can change. The app should use `OPENAI_MODEL` as a configurable default.

## 12. Milestones

### Milestone 1: Product And Shell

- Product document complete.
- Next.js app scaffolded.
- shadcn initialized.
- `sidebar-07` installed.
- CRM navigation replaces sample navigation.

### Milestone 2: CRM Dashboard

- Realistic mocked data.
- Dashboard KPIs.
- Pipeline stage view.
- Deal detail preview.
- Account timeline.
- Task queue.
- Sales Copilot panel.

### Milestone 3: AI API Routes

- Server-only OpenAI utility.
- Summary route.
- Follow-up draft route.
- Note structure route.
- Missing-key handling.
- Structured JSON outputs.

### Milestone 4: Persistence

- Supabase schema.
- Auth.
- Workspace membership.
- CRUD for leads, contacts, accounts, deals, activities, tasks, notes, and AI suggestions.

### Milestone 5: Review Flow

- UI for reviewing AI suggestions.
- Accept/reject actions.
- Audit trail for AI-assisted updates.

## 13. Acceptance Criteria

Product document:

- A new engineer can understand the product, audience, v1 scope, AI behavior, and technical direction without asking foundational questions.

Frontend:

- The app opens directly into a CRM dashboard.
- The sidebar collapses to icons.
- The navigation is CRM-specific.
- Dashboard data is realistic enough for a sales demo.
- Layout works on desktop and mobile.

AI routes:

- API routes run only on the server.
- Missing `OPENAI_API_KEY` returns a helpful setup response.
- Each route validates input.
- Each route returns structured JSON.
- AI suggestions are clearly review-required.

Security:

- `OPENAI_API_KEY` is never referenced in client components.
- `.env.example` documents required variables without containing secrets.
- AI responses do not directly mutate CRM records.
