# Gen AI Bootcamp CRM

A simple AI-powered CRM built for sales teams. This project is a fast MVP that combines a clean shadcn dashboard shell with server-side OpenAI routes for Sales Copilot workflows.

The goal is intentionally narrow: make pipeline work easier without building a heavy enterprise CRM. Sales teams can review pipeline health, priority deals, follow-up tasks, account activity, and AI suggestions from one operating dashboard.

## What It Includes

- **Next.js App Router** with TypeScript
- **Tailwind CSS** and **shadcn/ui**
- **shadcn `sidebar-07` dashboard shell** adapted into a CRM navigation system
- **Supabase Postgres schema** for workspaces, users, accounts, contacts, deals, activities, tasks, notes, and AI suggestions
- **Supabase-backed CRM reads and writes** with demo-data fallback when credentials are missing
- **Server-only OpenAI integration** using the Responses API
- **Structured AI routes** for CRM-safe Sales Copilot actions
- **Product document** with the product vision, entity model, scope, risks, and milestones

## Core Product Flows

- Pipeline management
- Contact and account timeline
- Deal detail preview
- Task and follow-up tracking
- Sales Copilot suggestions

## Sales Copilot API Routes

The AI routes are intentionally server-only and return review-required suggestions instead of directly mutating CRM data.

```txt
POST /api/ai/summarize-record
POST /api/ai/draft-follow-up
POST /api/ai/structure-note
```

If `OPENAI_API_KEY` is missing, the routes return a setup response instead of failing silently.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env.local
```

Add your OpenAI API key:

```bash
CRM_OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.4-mini
CRM_OPENAI_BASE_URL=https://api.openai.com/v1
```

Run the dev server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000/dashboard
```

## Development Commands

```bash
npm run dev
npm run lint
npm run build
```

## Supabase Setup

Create or link a Supabase project, then apply the schema:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

Seed demo CRM data from `supabase/seed/001_demo_crm.sql` in the Supabase SQL editor, or use it as the reference seed for your own data.

Required Supabase env vars:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The app uses the service-role key only in server routes and server components. Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## Project Structure

```txt
PRODUCT_DOCUMENT.md                 Product spec and MVP plan
supabase/migrations/                Supabase schema migrations
supabase/seed/                      Demo CRM seed SQL
src/app/dashboard/page.tsx          CRM dashboard
src/components/app-sidebar.tsx      CRM sidebar navigation
src/lib/crm-repository.ts           Supabase data loader and write helpers
src/lib/crm-data.ts                 Fallback CRM demo data
src/lib/ai/openai.ts                Server-only OpenAI helper
src/app/api/ai/*/route.ts           Sales Copilot API routes
src/app/api/crm/*/route.ts          Supabase-backed CRM write routes
```

## Environment Variables

```txt
CRM_OPENAI_API_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
CRM_OPENAI_BASE_URL=https://api.openai.com/v1

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Supabase variables are included for the planned persistence layer. The current MVP runs with mocked CRM data.

## Product Direction

Read [PRODUCT_DOCUMENT.md](./PRODUCT_DOCUMENT.md) for the full product plan, including:

- Target users
- MVP scope
- Non-goals
- Entity model
- AI guardrails
- API routes
- Milestones
- Acceptance criteria

## AI Safety Notes

- The OpenAI API key is only used server-side.
- AI responses are suggestions, not automatic CRM writes.
- Any AI-generated field changes should be reviewed by a human before saving.
- `.env.local` and other real env files are ignored by git.

## License

MIT. See [LICENSE](./LICENSE).
