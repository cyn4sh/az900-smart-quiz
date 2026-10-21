# AZ-900 Smart Quiz (Unofficial)

**Live demo: https://az900-smart-quiz.vercel.app/**

A mobile-first practice quiz for learners preparing for the Azure Fundamentals (AZ-900) exam. Built for the PLP "Vibe Coding Hackathon: AZ-900 Exam Prep Edition" (challenge: Smart Quiz Builder).

> **Unofficial study tool.** Not affiliated with or endorsed by Microsoft. It uses no Microsoft logos. All questions and explanations are original.

## What it does

- 10 original practice questions across cloud concepts, Azure architecture, and security and governance
- Instant feedback after every answer: correct or incorrect (icon and text, never color alone), an explanation, and a reason why each wrong option is wrong
- Options are shuffled on every attempt
- Score summary with a per-topic breakdown and a review of missed questions
- Attempts are saved automatically, with no sign-up, and shown in a History screen

## Tech stack

React, TypeScript (strict, no `any`), Vite, Tailwind CSS, shadcn/ui, TanStack Query, Supabase (anonymous auth and Postgres), Vercel

## How it was built

Vibe coded, with a plan first and human review at every step:

1. **Spec first.** `PROJECT_SPEC.md` defines the scope, folder structure, data model, and visual identity before any code.
2. **Rules for the AI.** `.cursor/rules/project.mdc` locks the structure, the TypeScript rules, and the files the AI must not touch, such as the question bank.
3. **Plan, then build.** Each chunk was planned in Cursor's Plan mode, then built by the Agent in a narrowly scoped prompt.
4. **Review before keeping.** Every diff was reviewed before it was accepted. Problems caught in review:
   - Cursor swapped shadcn's standard class helper for an unrelated `cn` package. Replaced with `clsx` and `tailwind-merge`.
   - A TypeScript 7 peer-dependency conflict with `typescript-eslint`. Pinned TypeScript to 6.0.
   - Disabled answer buttons would have faded the correct and incorrect feedback. Switched to `aria-disabled`.
   - A wrong Supabase URL (`/rest/v1` suffix) found through the browser console.

## Security

- Row-level security: each anonymous user can only insert and read their own attempts
- Only the public publishable key is used in the browser. No secrets are committed, and `.env.local` is git-ignored.

## Future work

An "Explain it simply" button powered by Claude through a Supabase Edge Function was designed but not built, to avoid a paid API dependency. The design is in `PROJECT_SPEC.md` section 5.

## Run locally

```
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` with your own Supabase project URL and publishable key. The URL must end right after `.supabase.co`.

## Project structure

See `PROJECT_SPEC.md`.