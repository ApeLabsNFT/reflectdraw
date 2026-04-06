# ReflectDraw

ReflectDraw is a reflective wellness app for the moments when your mind feels loud, your attention keeps drifting, or the day has left too much sitting in your body.

It brings together drawing, breath-led regulation, and gentle reflection so people have a softer place to begin on:

- anxious or overstimulated days
- scattered, restless, or hard-to-hold attention days
- nights when the body is tired but the mind will not quiet down
- moments when words alone do not feel like enough

## What The Product Is For

ReflectDraw helps people:

- slow down before reacting
- notice patterns over time
- move thoughts and sensations onto the page
- pair reflection with breath and lower-stimulation rituals
- return to bedtime or recovery moments more gently

The journey is designed to feel calm and coherent:

- land on the story-led front door
- create an account with email
- move into onboarding
- continue into archive, capture, breath, compare, guides, and settings

## What It Is Not

ReflectDraw is not:

- a diagnostic tool
- a replacement for therapy, medical care, or emergency support
- a mental health scoring system
- a passive surveillance product

The language and product framing are intentionally support-first, reflective, and non-diagnostic.

## Core Surfaces

- Landing page
- Email auth flow
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

## Content Direction

The product voice is written for people who know the feeling of:

- racing thoughts
- tight chest or buzzy overwhelm
- attention that keeps slipping away
- nights that refuse to settle

The writing aims to sound:

- gentle without becoming vague
- emotionally intelligent without pretending certainty
- supportive without drifting into diagnosis or treatment claims

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add the environment values you want to enable
3. Restart the dev server after changes

## Image Planning

The production asset plan lives here:

- [docs/reflectdraw-image-inventory.md](./docs/reflectdraw-image-inventory.md)

## Safety Notes

ReflectDraw is built around a few non-negotiables:

- reflective outputs must stay non-diagnostic
- privacy should be clear and easy to control
- sensitive operations stay server-side
- crisis language should be handled conservatively

## Repository Scope

This repository contains the live web app experience. Some internal operational details are intentionally not exposed in the public-facing product or documentation.
