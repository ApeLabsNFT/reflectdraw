# ReflectDraw

ReflectDraw is a reflective wellness app for drawing, breath-led regulation, and gentle pattern noticing over time.

The experience is designed as a calmer journey:

- land on an editorial front door
- authenticate with email or Google
- move directly into onboarding
- continue into archive, capture, breath, compare, guides, and settings

This repository contains the live Next.js web app that powers the public product experience across desktop and mobile-responsive layouts.

## Product Direction

ReflectDraw is intentionally positioned as:

- somatic reflection
- nervous-system regulation support
- breathwork and bedtime wind-down ritual
- reflective journaling through images

It is intentionally **not** positioned as:

- a diagnostic tool
- a crisis service
- a treatment replacement
- a passive surveillance app

## Core Surfaces

- Landing page
- Auth flow
- Onboarding
- Archive
- Capture ritual
- Processing state
- AI reflection result
- Breath and sleep support
- Compare over time
- Guides
- Shop
- Settings, privacy, and legal

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase for auth and backend services
- Google AI / Gemma-powered reflection pipeline
- Pinecone for future retrieval and semantic memory
- PostHog for consent-based analytics
- Sentry for monitoring
- Vercel for deployment

## Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in the credentials you want to enable
3. Restart the dev server after changing environment values

The app can still run in a reduced or demo-friendly mode if some integrations are not present.

## Image Planning

The recommended production asset list lives here:

- [docs/reflectdraw-image-inventory.md](./docs/reflectdraw-image-inventory.md)

That document covers how many images are needed, where they belong, and which ones matter first.

## Safety and Privacy

ReflectDraw is built around a few non-negotiables:

- reflective outputs must stay non-diagnostic
- privacy should be easy to understand and control
- sensitive operations should stay server-side
- crisis language should be handled conservatively

## Notes on Public Repo Scope

This public repository includes the product experience, UI architecture, and integration surfaces needed to run the app.

Some internal operational details are intentionally kept out of the public-facing documentation and public production routes, including deeper prompt orchestration, diagnostics exposure, and certain deployment-specific implementation choices.

## Deployment

This app is deployed on Vercel and is structured to work well with server-side environment configuration.

Production secrets should never be committed to git.
