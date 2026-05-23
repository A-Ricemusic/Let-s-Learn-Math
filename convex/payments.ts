import { Effect } from "effect";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { runEffect } from "./effect";

export const createCheckoutSession = mutation({
  args: {
    plan: v.union(v.literal("monthly"), v.literal("annual")),
  },
  handler: async (ctx, args) =>
    runEffect(
      Effect.gen(function* () {
        const identity = yield* Effect.promise(() => ctx.auth.getUserIdentity());
        if (!identity) {
          return yield* Effect.fail(new Error("Authentication required"));
        }

        // Replace this placeholder with Clerk Billing or your payment provider call.
        // Store the returned payment reference on the subscriptions table from a webhook.
        return {
          checkoutUrl: `https://dashboard.clerk.com/billing?user=${identity.subject}&plan=${args.plan}`,
        };
      }),
    ),
});
