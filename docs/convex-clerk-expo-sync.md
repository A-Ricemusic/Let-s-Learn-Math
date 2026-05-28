# Convex, Clerk, and Expo Sync Setup

This app uses Clerk for mobile authentication and Convex for authenticated data sync.

## Environment

The Expo app needs these public values:

```sh
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
EXPO_PUBLIC_CONVEX_URL=
```

Convex auth is configured directly in `convex/auth.config.ts` for the current Clerk development issuer:

```ts
const clerkIssuer = "https://hot-python-18.clerk.accounts.dev";
```

If the Clerk instance changes, update this issuer and rerun:

```sh
bun x convex codegen
```

## Clerk JWT Template

Clerk has a JWT template named `convex`.

The template must include:

```json
{
  "aud": "convex"
}
```

The issuer is:

```text
https://hot-python-18.clerk.accounts.dev
```

Clerk signs the template token with `RS256` and publishes the matching keys at:

```text
https://hot-python-18.clerk.accounts.dev/.well-known/jwks.json
```

## Convex Auth Config

Clerk JWT templates are validated as custom JWTs in Convex:

```ts
import type { AuthConfig } from "convex/server";

const clerkIssuer = "https://hot-python-18.clerk.accounts.dev";

export default {
  providers: [
    {
      type: "customJwt",
      issuer: clerkIssuer,
      jwks: `${clerkIssuer}/.well-known/jwks.json`,
      algorithm: "RS256",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
```

Do not configure this token as the OIDC `domain` provider shape. The app sends Clerk's custom `convex` JWT template, so Convex needs the `customJwt` provider with `issuer`, `jwks`, `algorithm`, and `applicationID`.

## Expo Provider Wiring

The app wraps Clerk around Convex:

```tsx
<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
  <ConvexProviderWithAuth client={convex} useAuth={useConvexClerkAuth}>
    <AppContent />
  </ConvexProviderWithAuth>
</ClerkProvider>
```

`useConvexClerkAuth` explicitly asks Clerk for the `convex` template token:

```ts
const fetchAccessToken = useCallback(
  async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
    try {
      return await getTokenRef.current({
        template: "convex",
        skipCache: forceRefreshToken,
      });
    } catch {
      return null;
    }
  },
  [],
);
```

The `getTokenRef` is important. Clerk Expo's `getToken` function is not stable between renders. If it is used directly as a `useCallback` dependency, Convex sees a new auth fetcher repeatedly, resets auth, reconnects the websocket, and the UI can stay stuck on `Connecting...`.

## Backend Sync Test

`convex/schema.ts` defines `syncChecks`:

```ts
syncChecks: defineTable({
  tokenIdentifier: v.string(),
  email: v.optional(v.string()),
  lastSeenAt: v.number(),
  count: v.number(),
}).index("by_tokenIdentifier", ["tokenIdentifier"]);
```

`convex/sync.ts` exposes:

- `api.sync.current`: authenticated query for the current user's sync row.
- `api.sync.ping`: authenticated mutation that creates or updates the current user's sync row.

Both functions derive the user server-side:

```ts
const identity = await ctx.auth.getUserIdentity();
```

Do not pass a user ID from the client for authorization. Use `identity.tokenIdentifier` for user-owned records.

## Verification

After auth or Convex config changes, run:

```sh
bun run typecheck
bun fmt
bun x convex codegen
bun run lint
bun run test
```

Reload Expo with a clean Metro cache when debugging auth state:

```sh
bun run ios -- --clear
```

Successful sync shows:

```text
Authenticated - 1 syncs
```

and a `Last sync` timestamp in the signed-in screen.

## Common Failure Modes

- `No auth provider found matching the given token`: Convex auth config does not match the token's issuer, audience, algorithm, or JWKS. For this app, use the `customJwt` provider shape above.
- UI stuck on `Connecting...`: Convex auth is repeatedly resetting. Keep `fetchAccessToken` stable and call Clerk's latest `getToken` through a ref.
- Token template looks correct but auth still fails: decode only token claims in development and verify `iss` is the Clerk issuer and `aud` is `convex`. Do not log raw tokens.
