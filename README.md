# Let's Learn Math

Expo + React Native starter for a math tutoring app. The current milestone is intentionally small: prove Clerk email-code authentication works before connecting Clerk to Convex.

## Current Scope

- Expo renders the mobile app.
- Clerk handles email-code sign-in and sign-up.
- Convex is present with a simple unauthenticated `hello` query.
- Authenticated Convex calls are deferred until the Clerk session flow is working.

## Setup

1. Install dependencies with Bun:

   ```sh
   bun install
   ```

2. Create a Clerk application.

3. In Clerk, enable email-code authentication and public sign-ups.

4. Copy `.env.example` to `.env` and set:

   ```sh
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

5. Start Expo manually:

   ```sh
   bun start
   ```

Agents should not start long-running dev servers in this repo.

## Clerk Flow

The app uses a custom React Native flow:

1. Signed-out user taps `Sign in`.
2. User enters an email address.
3. Clerk sends a one-time code.
4. User enters the code.
5. Existing users are signed in.
6. New users are created and signed in.
7. Signed-in users see their email and a sign-out button.

## Convex Auth Later

Do not add Convex auth until the basic Clerk flow works.

When authenticated Convex calls are needed:

1. Create a Clerk JWT template named `convex`.
2. Add `convex/auth.config.ts`:

   ```ts
   export default {
     providers: [
       {
         domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
         applicationID: "convex",
       },
     ],
   };
   ```

3. Set `CLERK_JWT_ISSUER_DOMAIN` in the Convex dashboard.
4. Wrap the app with `ConvexProviderWithClerk`.
5. In Convex functions, derive identity with `ctx.auth.getUserIdentity()` and use `identity.tokenIdentifier` for ownership keys.

## Useful Commands

```sh
bun run check
bun run test
bun run test:all
bun run convex:codegen
```
