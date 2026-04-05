# ReflectDraw Web

ReflectDraw is a somatic reflection and regulation app built with Next.js. This repo contains the deployable web experience for onboarding, archive, capture ritual, processing, reflection results, breath support, compare, guides, shop, settings, and runtime integration audit.

## Stack

- Next.js App Router
- React 19
- Supabase client scaffolding
- Sentry for runtime monitoring
- PostHog for consent-gated analytics
- Pinecone helper layer for future semantic retrieval
- Clerk provider support as an optional auth path

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill in the credentials you want to enable. The app can still run in demo mode if some providers are missing.

## Available Routes

- `/`
- `/archive`
- `/capture`
- `/processing`
- `/artifact/latest`
- `/compare`
- `/sanctuary`
- `/guides`
- `/shop`
- `/settings`
- `/integrations`

## Deployment

The app is ready for Vercel deployment as a standalone Next.js project. Missing production credentials can be reviewed in the in-app `/integrations` screen or via `/api/status`.
