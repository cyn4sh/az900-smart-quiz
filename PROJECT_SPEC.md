# AZ-900 Smart Quiz Builder (UNOFFICIAL)

A mobile-first quiz app for learners preparing for the Azure Fundamentals (AZ-900) exam.
Built for the PLP "Vibe Coding Hackathon: AZ-900 Exam Prep Edition".

**This is an unofficial study tool. It is not affiliated with or endorsed by Microsoft.**
Never use Microsoft logos or trademarked artwork. All questions are original.

## 1. Scope (v1)

One flow only:

1. **Start screen**: title, short description, "Start quiz" button, visible "Unofficial" label.
2. **Quiz screen**: one question at a time, 10 questions, progress bar.
   - Options are shuffled each time. Display letters (A-D) are assigned AFTER shuffling.
   - After the user answers, show instantly: correct/incorrect state, the `explanation`, and the `whyNot` line for the wrong options.
   - "Explain it simply" button calls Claude through a Supabase Edge Function and shows a plain-language explanation.
   - "Next" button moves on.
3. **Results screen**: score, per-topic breakdown, list of missed questions to review, "Try again" button. The attempt is saved to Supabase.
4. **History** (small): list of past attempts for the current anonymous user.

Out of scope: accounts with email/password, leaderboards, light mode, admin UI, question editing, timers.

## 2. Stack

- React + TypeScript (strict) + Vite
- Tailwind CSS + shadcn/ui (components generated into `src/components/ui/`)
- TanStack Query for server state
- Supabase: anonymous auth, Postgres (attempts only), Edge Function (Claude proxy)
- Claude API, called ONLY from the Edge Function. The API key never reaches the browser.

## 3. Folder structure (locked, do not change without asking)

```
src/
  features/
    quiz/
      components/        # StartScreen, QuestionCard, OptionButton, ProgressBar, ResultsScreen
      hooks/             # useQuiz (reducer-based quiz state)
      data/questions.ts  # PROVIDED. Do not edit.
      types.ts           # PROVIDED. Do not edit.
    explain/
      components/        # ExplainSimplyButton, ExplanationPanel
      hooks/             # useExplainSimply (TanStack mutation)
    history/
      components/
      hooks/
  api/
    supabase.ts          # client setup
    explain.ts           # calls the Edge Function
    attempts.ts          # save and list attempts
  types/
    api.ts               # generated Supabase types
  lib/
    auth/                # anonymous sign-in and session helper
  components/
    ui/                  # shadcn components
    layout/              # AppShell, Footer (with Unofficial label)
supabase/
  functions/
    explain/             # Edge Function + prompt.ts
```

## 4. Data

`src/features/quiz/types.ts` and `src/features/quiz/data/questions.ts` are provided and final.
`Question` has: `id`, `topic`, `prompt`, `options` (each with a stable `key` and optional `whyNot`), `correctKey`, `explanation`.

### Table: `attempts`

| column | type | notes |
| --- | --- | --- |
| id | uuid | primary key, default `gen_random_uuid()` |
| user_id | uuid | default `auth.uid()`, not null |
| score | int | not null |
| total | int | not null |
| topic_breakdown | jsonb | per-topic correct/total |
| created_at | timestamptz | default `now()` |

Row-level security: a user can only insert and select rows where `user_id = auth.uid()`. The SQL will be supplied separately.

## 5. Edge Function: `explain`

- Method: POST, requires the user's Supabase JWT (anonymous sessions count).
- Request body: `{ prompt: string, options: string[], correctText: string, selectedText: string }`
- Validate the shape and cap string lengths. Reject anything else.
- The system prompt is fixed on the server in `prompt.ts`. User-supplied text is passed as data, never as instructions.
- Calls Claude with a small, fast model (model name from an env var), low max tokens.
- Response: `{ explanation: string }`. Errors return a short, safe message.
- Rate limit per user to prevent abuse.
- The Claude API key lives only in Supabase function secrets.

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

- Fonts: Manrope (headings), Inter (body), loaded from Google Fonts with system fallbacks.
- Radius: 12px cards, 8px buttons and options.
- Elevation: flat and tonal. 1px borders, no drop shadows.
- Buttons: solid teal primary, ghost secondary. Full width on mobile. Answer options are large tap targets (min 48px tall).
- Spacing: 8px grid, generous card padding.
- Icons: Lucide, outlined, thin stroke.
- Motion: gentle ease-out, about 200ms, for the feedback reveal and progress bar. Respect `prefers-reduced-motion`.
- Loading: soft skeleton shimmer while Claude writes the explanation.
- Empty history: one short line plus a "Take your first quiz" button.
- Background: flat, with one faint radial glow behind the main card.
- Use CSS variables for the tokens and wire them into the Tailwind theme.

## 7. Accessibility

- Options are real buttons with visible focus states.
- Correct/incorrect is never shown by color alone: also use an icon and text.
- Sufficient contrast on all text.
- The Unofficial label is always visible.

## 8. Build order (three chunks, review after each chunk)

The Vite react-ts project already exists (ESLint on). Do NOT re-scaffold it.
Chunk A = steps 1-3, Chunk B = steps 4-5, Chunk C = step 6. Build a whole chunk, then stop for review.

1. Setup on the existing project: TS strict + Tailwind + shadcn, tokens and fonts, AppShell with footer label.
2. Quiz state: `useQuiz` reducer, shuffle logic, Start and Quiz screens with instant feedback.
3. Results screen with per-topic breakdown and review list.
4. Supabase: client, anonymous auth, attempts table, save and list attempts, History.
5. Edge Function `explain` and the "Explain it simply" button.
6. Polish: loading and empty states, reduced motion, README with the Unofficial notice.

## 9. Definition of done

- Full flow works on a phone-sized screen.
- No `any` anywhere. Strict TypeScript passes with no errors.
- No secrets in the client or the repo.
- "Unofficial" label visible on Start screen and footer.
- README explains the project, the prompt design, and how to run it.