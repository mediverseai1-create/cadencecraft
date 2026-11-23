# CadenceCraft

Agentic AI platform for revenue teams. Next.js 16, React, TypeScript, Tailwind, Supabase, Gemini.

## Setup

1. `npm install`
2. Create a Supabase project, run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
3. Copy `.env.example` to `.env.local` and fill in values.
4. `npm run dev`

## Environment variables

See `.env.example`. Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `PAYMENT_WEBHOOK_SECRET`. Never commit `.env.local`.

## What works (when configured)

| Area | Status |
| --- | --- |
| Public site: home, platform, 11 module pages, 6 role pages, pricing, why-cadencecraft, about, security, support, legal | Built |
| Auth: sign up, login, logout, password recovery, protected `/app` | Needs Supabase |
| App: accounts/contacts, pipeline board, sequences, forecast, agents, usage, notifications, billing, settings | Needs Supabase |
| AI: call analysis, outreach drafts, forecast commentary | Needs `GEMINI_API_KEY`; credits spent atomically and refunded on failure |
| File upload | Transcript files go to private `transcripts` bucket |
| Payments | Upgrade buttons use your payment links; plan changes only via `/api/billing/webhook` |

## Known limitations

- Email confirmation and password-reset links use the Supabase Site URL setting. Set it to the live domain in Supabase (Authentication, URL Configuration).
- The webhook expects a simple JSON payload and shared secret. Map your payment provider's real event and signature scheme before going live.
- Page visuals were matched from six screenshots plus a text audit; pages and sections below the fold of the reference were not visually inspected.

## Deploy

Import the repo in Vercel, set the env vars above, deploy.
