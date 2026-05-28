import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";

async function getAuthenticatedIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new Error("Not authenticated");
  }

  return identity;
}

export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthenticatedIdentity(ctx);

    const syncCheck = await ctx.db
      .query("syncChecks")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (syncCheck === null) {
      return null;
    }

    return {
      email: syncCheck.email,
      count: syncCheck.count,
      lastSeenAt: syncCheck.lastSeenAt,
    };
  },
});

export const ping = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthenticatedIdentity(ctx);
    const now = Date.now();
    const existing = await ctx.db
      .query("syncChecks")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (existing === null) {
      const syncCheckId = await ctx.db.insert("syncChecks", {
        tokenIdentifier: identity.tokenIdentifier,
        email: identity.email,
        lastSeenAt: now,
        count: 1,
      });

      return {
        syncCheckId,
        count: 1,
        lastSeenAt: now,
      };
    }

    const count = existing.count + 1;
    await ctx.db.patch(existing._id, {
      email: identity.email,
      lastSeenAt: now,
      count,
    });

    return {
      syncCheckId: existing._id,
      count,
      lastSeenAt: now,
    };
  },
});
