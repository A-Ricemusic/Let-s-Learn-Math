Use Bun package manager exclusively.

## Development Environment

NEVER start dev servers. Already running. Don't run `bun run dev`, `bun dev`, or `bun x convex dev.

NEVER under any circumstance run a convex command with the production flag. EVER! 

example of a command you may NEVER run EVER:
bun x convex run --prod --component migrations lib:getStatus '{"names":["migrations:backfillStatusUpdatesAggregate"]}'

## Type Checking

ALWAYS run after changes:

bun run typecheck
bun fmt
bun x convex codegen
bun run lint
bun run test(if testing suite exists in app)

## Core Priorities

Performance first.
Reliability first.
Keep behavior predictable under load and during failures (session restarts, reconnects, partial streams).
If a tradeoff is required, choose correctness and robustness over short-term convenience.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

This is a brand new project with no existing users. Please feel free to take the sludgehammer approach and propose broad refactors.

Fix ALL errors before completing tasks. please fix AS MANY warnings as possible. Try not to allow any warning especially if they are fixable.

## TypeScript Conventions

### Strict Rules

- NEVER use `any` - use `unknown` then narrow
- NEVER use v.any in the convex schema or backend
- NEVER use `@ts-ignore` or `@ts-nocheck`
- AVOID using the useEffect hook. Most of the time using a useQuery hook or useMutation hook should work. - - NEVER use the useEffect hook for data fetching!

### Return Type Inference

**Let TypeScript infer.** Only add explicit return types when NECESSARY.




# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
