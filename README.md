# Let's Learn Math

Let's Learn Math is an Expo React Native app for guided math practice. It uses
Clerk for passwordless email-code authentication and Convex for authenticated
curriculum, progress, and game data.

## Current App

- Email-code sign-in and sign-up through Clerk Expo.
- Authenticated Convex client wired with Clerk's `convex` JWT template.
- Selectable math paths for Grades 1-8 plus Algebra 1, Algebra 2, Geometry,
  Pre-calculus, Statistics, and Calculus.
- Expanded lesson content for Grade 1, Grades 4-8, and Algebra 1, with starter
  paths for Grades 2-3 and the remaining high-school courses.
- Topic lessons with example slides, practice questions, quizzes, and mastery
  tracking.
- Parent progress report with lesson completion, attempts, mastery scores, and
  game results.
- Make 10 game with saved runs, recent scores, and high score tracking.

## Tech Stack

- Expo 56 and React Native 0.85
- React 19
- Clerk Expo
- Convex
- TypeScript
- Vitest
- Bun

Use Bun for every package and script command in this repository.

## Setup

1. Install dependencies:

   ```sh
   bun install
   ```

2. Copy the environment template:

   ```sh
   cp .env.example .env.local
   ```

3. Fill in the required Expo values:

   ```sh
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   EXPO_PUBLIC_CONVEX_URL=https://...
   ```

4. Configure Clerk:

   - Enable email-code authentication.
   - Allow public sign-ups while the app is in early development.
   - Create a JWT template named `convex`.
   - Set the JWT audience claim to `convex`.

5. Configure Convex auth:

   - `convex/auth.config.ts` currently uses Clerk's custom JWT provider shape.
   - If the Clerk application changes, update the issuer in
     `convex/auth.config.ts`.
   - After auth config changes, run `bun x convex codegen`.

In agent sessions, do not start dev servers. They are expected to already be
running.

## App Structure

- `App.tsx` mounts the app providers.
- `src/app/AppProviders.tsx` wires Clerk, token storage, and Convex auth.
- `src/auth/EmailCodeAuth.tsx` contains the passwordless auth flow.
- `src/features/home/SignedInHome.tsx` contains the signed-in learning shell,
  navigation, lessons, profile, and reports.
- `src/features/games/MakeTenGame.tsx` contains the Make 10 game.
- `src/features/lessons/` contains lesson planning, mastery, progress, and UI
  helpers.
- `src/server/curriculum.ts` is the shared curriculum access layer used by both
  tests and Convex functions.
- `convex/` contains backend schema, auth config, curriculum queries and
  mutations, game score functions, and sync helpers.
- `docs/` contains deeper setup notes for Convex, Clerk, Expo sync, and backend
  Effect usage.

## Convex Data

Convex stores user-owned records by `identity.tokenIdentifier`.

- `learnerProfiles`: email, display name, active path, and timestamps.
- `lessonProgress`: per-path lesson status, attempts, correct count, and mastery
  score.
- `activityAttempts`: immutable practice and quiz attempt history.
- `gameRuns`: saved game scores and completion timestamps.
- `syncChecks`: authenticated sync smoke-test records.

Do not pass client-provided user IDs for authorization. Convex functions should
derive identity server-side with `ctx.auth.getUserIdentity()`.

## Useful Commands

```sh
bun run typecheck
bun fmt
bun x convex codegen
bun run lint
bun run test
```

Other available commands:

```sh
bun run ios
bun run android
bun run web
```

Only run Expo start commands manually when you are intentionally managing the
local dev server yourself. Agents should not run long-running dev servers.

## Testing

The current test suite uses Vitest and focuses on shared curriculum and lesson
logic:

- Curriculum path expansion and question lookup.
- Lesson plan generation.
- Mastery and progress calculations.

Run the full suite with:

```sh
bun run test
```

## Development Notes

- Keep server-owned answers in shared curriculum code so Convex validates
  attempts instead of trusting the client.
- Prefer shared lesson and curriculum helpers over duplicating local UI logic.
- Keep Convex reads indexed by user and path when adding progress features.
- Keep Clerk token fetching stable for Convex auth; `AppProviders` intentionally
  uses a ref-backed token fetcher to avoid websocket auth resets.
