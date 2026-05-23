# Let's Learn Math

React Native + Expo starter for a math tutoring app with Clerk auth, Convex storage/backend, and a payment placeholder ready for Clerk Billing or another provider.

## Architecture

- Expo renders the mobile app.
- Clerk handles authentication and protects Convex calls through a Convex JWT template.
- Convex stores lesson metadata, learner progress, subscription state, and video files via Convex file storage.
- The app queries Convex for published lessons and receives temporary video URLs for playback.
- Payments start from `convex/payments.ts`; production payment status should be written back from webhooks.

## Setup

1. Install dependencies with Bun:

   ```sh
   bun install
   ```

2. Create Clerk and Convex projects.

3. Copy `.env.example` to `.env` and fill in:

   ```sh
   EXPO_PUBLIC_CONVEX_URL=
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_JWT_ISSUER_DOMAIN=
   ```

4. Configure Clerk with a Convex JWT template named `convex`, then set the issuer domain in Convex.

5. Configure Convex and generate types:

   ```sh
   bunx convex dev --once
   ```

6. Run Expo:

   ```sh
   bun start
   ```

## Video Flow

1. Call `lessons.generateVideoUploadUrl` from an admin screen or script.
2. Upload the video file to the returned URL.
3. Save the returned storage id with `lessons.createLesson`.
4. Publish the lesson with `lessons.publishLesson`.
5. The mobile app calls `lessons.listPublishedLessons` and Convex returns playable video URLs.

## Payments

`convex/payments.ts` is intentionally a placeholder. The production shape should be:

- Start checkout from the app.
- Complete payment through Clerk Billing or another payment provider.
- Handle webhooks in Convex HTTP actions.
- Upsert `subscriptions` by Clerk user id.
- Gate premium lessons by subscription status.

## Useful Commands

```sh
bun run check
bun run convex:codegen
```

Agents should not start long-running dev servers in this repo. Run `bunx convex dev` and `bun start` yourself when you are ready to connect local services.
