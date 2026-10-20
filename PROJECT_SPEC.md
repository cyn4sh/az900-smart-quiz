# AZ-900 Smart Quiz (UNOFFICIAL)

A mobile-first quiz app for learners preparing for the Azure Fundamentals (AZ-900) exam.
Built for the PLP "Vibe Coding Hackathon: AZ-900 Exam Prep Edition".

**This is an unofficial study tool. It is not affiliated with or endorsed by Microsoft.**
Never use Microsoft logos or trademarked artwork. All questions are original.

## 1. Scope (v1)

1. **Start screen**: title, short description, "Start quiz" and "History" buttons, visible "Unofficial" label.
2. **Quiz screen**: one question at a time, 10 questions, progress bar.
   - Options are shuffled each time. Display letters (A-D) are assigned AFTER shuffling.
   - After the user answers, show instantly: correct/incorrect state (icon and text, never color alone), the `explanation`, and the `whyNot` line for the wrong options.
3. **Results screen**: score, per-topic breakdown, list of missed questions to review, "Try again" and "History" buttons. The attempt is saved to Supabase once, with a non-blocking status message.
4. **History screen**: past attempts for the current anonymous user, with skeleton loading and an empty state.

Out of scope: live AI explanations (see section 5), email/password accounts, leaderboards, light mode, admin UI, question editing, timers.

## 2. Stack

- React + TypeScript (strict) + Vite
- Tailwind CSS + shadcn/ui (components in `src/components/ui/`)
- TanStack Query for server state
- Supabase: anonymous auth and Postgres (attempts only), with row-level security
- Deployment: Vercel

## 3. Folder structure (locked, do not change without asking)

```
src/
  features/
    quiz/
      components/        # StartScreen, QuestionCard, OptionButton, ProgressBar, ResultsScreen
      hooks/             # useQuiz (reducer-based quiz state)
      data/questions.ts  # FINAL. Do not edit.
      types.ts           # FINAL. Do not edit.
    history/
      components/        # HistoryScreen
      hooks/             # useAttempts, useSaveAttempt
      types.ts
  api/
    supabase.ts          # lazy client from env vars
    attempts.ts          # saveAttempt, listAttempts
  types/
    api.ts               # Database types for the attempts table
  lib/
    auth/                # anonymous session helper
  components/
    ui/                  # shadcn components
    layout/              # AppShell, Footer (with Unofficial label)
```

## 4. Data

`Question` has: `id`, `topic`, `prompt`, `options` (each with a stable `key` and optional `whyNot`), `correctKey`, `explanation`.

Table `attempts` (row-level security: a user can only insert and read their own rows):

| column | type | notes |
| --- | --- | --- |
| id | uuid | primary key |
| user_id | uuid | default `auth.uid()` |
| score | int | |
| total | int | |
| topic_breakdown | jsonb | per-topic correct/total, narrowed with type guards when read |
| created_at | timestamptz | default `now()` |

Env variables (in `.env.local`, never committed): `VITE_SUPABASE_URL` (the bare project URL, no path after `.supabase.co`) and `VITE_SUPABASE_PUBLISHABLE_KEY`. `.env.example` holds placeholders only.

## 5. Not built: "Explain it simply" (future work)

Designed but deliberately left out of v1 to avoid a paid API dependency. The design:

- A Supabase Edge Function calls the Claude API. The API key lives only in function secrets and never reaches the browser.
- Requires the user's JWT (anonymous sessions count), validates the request shape, caps string lengths, and rate limits per user.
- A fixed server-side system prompt asks for a plain-language explanation of at most 90 words with one accurate everyday analogy, and treats the question data as untrusted text.
- The app shows an "Explain it simply" button after each answer.

## 6. Visual identity

Calm dark "late-night study" look. Mobile-first. No light mode.

| token | value |
| --- | --- |
| background | `#0F1419` |
| surface | `#161D26` |
| border | `#243040` |
| text | `#E6EAF0` |
| muted text | `#8B97A8` |
| accent / correct | `#2DD4BF` (teal) |
| wrong | `#F2766B` (coral) |

- Fonts: Manrope (headings), Inter (body), with system fallbacks.
- Radius: 12px cards, 8px buttons and options.
- Elevation: flat and tonal. 1px borders, no drop shadows.
- Buttons: solid teal primary, ghost secondary. Full width on mobile. Answer options are large tap targets (min 48px tall).
- Spacing: 8px grid, generous card padding.
- Icons: Lucide, outlined, thin stroke.
- Motion: gentle ease-out, about 200ms. Respect `prefers-reduced-motion`.
- Loading: soft skeleton shimmer. Empty history: one short line plus a "Take your first quiz" button.
- Background: flat, with one faint radial glow behind the main card.

## 7. Accessibility

- Options are real buttons with visible focus states.
- Correct/incorrect is never shown by color alone: also an icon and text.
- Sufficient contrast on all text.
- The Unofficial label is always visible.

## 8. Build order

- **Chunk A (done):** setup, quiz flow, results screen.
- **Chunk B (done):** Supabase client, anonymous auth, saving attempts, History screen.
- **Chunk C (polish and deploy):**
  1. A real `h1` heading on every screen.
  2. Replace the Vite favicon and add `.env.example`.
  3. Check reduced motion and keyboard focus.
  4. Review `npm audit` (never use `--force`).
  5. Final README with the live link and how the app was built.
  6. Deploy to Vercel with the two env variables, then confirm anonymous sign-in and saving work on the live URL.

## 9. Definition of done

- Full flow works on a phone-sized screen, deployed on a public URL.
- No `any` anywhere. Strict TypeScript, build, and lint all pass.
- No secrets in the client or the repo.
- "Unofficial" label visible on the Start screen and in the footer.
- README explains the project, the design decisions, and how to run it.