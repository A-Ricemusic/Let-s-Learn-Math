# Backend Effect Usage

Use Effect for backend business logic in Convex functions.

Scope:

- Use Effect inside files under `convex/` when modeling backend workflows, validation, expected failures, retries, or composition.
- Keep Effect out of Expo and React Native UI code unless there is a separate explicit decision to introduce it there.
- Keep Convex function definitions (`query`, `mutation`, `action`) as the boundary. Build the internal workflow with Effect, then run it at the handler edge.

Preferred pattern:

```ts
import { Effect } from "effect";
import { mutation } from "./_generated/server";
import { runEffect } from "./effect";

export const example = mutation({
  args: {},
  handler: async (ctx) =>
    runEffect(
      Effect.gen(function* () {
        const identity = yield* Effect.promise(() => ctx.auth.getUserIdentity());

        if (!identity) {
          return yield* Effect.fail(new Error("Authentication required"));
        }

        return { userId: identity.subject };
      }),
    ),
});
```

Guidelines:

- Prefer `Effect.gen` for multi-step backend logic.
- Use `Effect.promise` when calling Convex APIs such as `ctx.db`, `ctx.auth`, `ctx.storage`, or scheduler calls.
- Use `Effect.fail(new Error(...))` for expected backend failures that should reject the Convex handler.
- Use `runEffect` from `convex/effect.ts` at the handler boundary instead of calling `Effect.runPromise` inline in every function.
- Keep Convex validators from `convex/values` as the public API contract for function arguments.
- Do not wrap simple one-line Convex reads or writes in Effect unless it helps compose with surrounding backend logic.
