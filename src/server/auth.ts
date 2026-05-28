import type { UserIdentity } from "convex/server";
import type { MutationCtx, QueryCtx } from "../../convex/_generated/server";

export async function getAuthenticatedIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new Error("Not authenticated");
  }

  return identity;
}

export function optionalAuthString(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed === "" ? undefined : trimmed;
}

export async function ensureLearnerProfile(
  ctx: MutationCtx,
  identity: UserIdentity,
) {
  const now = Date.now();
  const email = optionalAuthString(identity.email);
  const displayName = optionalAuthString(identity.name);
  const existing = await ctx.db
    .query("learnerProfiles")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();

  if (existing !== null) {
    await ctx.db.patch(existing._id, {
      email,
      displayName,
      updatedAt: now,
    });
    return existing._id;
  }

  return await ctx.db.insert("learnerProfiles", {
    tokenIdentifier: identity.tokenIdentifier,
    email,
    displayName,
    activeGradeLevel: 1,
    createdAt: now,
    updatedAt: now,
  });
}
