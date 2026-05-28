import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { firstGradeUnits } from "./firstGradeCurriculum";

async function getAuthenticatedIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new Error("Not authenticated");
  }

  return identity;
}

async function ensureLearnerProfile(ctx: MutationCtx) {
  const identity = await getAuthenticatedIdentity(ctx);
  const now = Date.now();
  const existing = await ctx.db
    .query("learnerProfiles")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();

  if (existing !== null) {
    await ctx.db.patch(existing._id, {
      email: identity.email,
      displayName: identity.name,
      updatedAt: now,
    });
    return existing._id;
  }

  return await ctx.db.insert("learnerProfiles", {
    tokenIdentifier: identity.tokenIdentifier,
    email: identity.email,
    displayName: identity.name,
    activeGradeLevel: 1,
    createdAt: now,
    updatedAt: now,
  });
}

export const firstGrade = query({
  args: {},
  handler: async () => {
    return {
      gradeLevel: 1,
      title: "First Grade Math",
      teachingNote:
        "Use simple words, short practice, and clear visuals for every idea.",
      units: firstGradeUnits,
    };
  },
});

export const myFirstGradeProgress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthenticatedIdentity(ctx);
    const rows = await ctx.db
      .query("lessonProgress")
      .withIndex("by_tokenIdentifier_and_gradeLevel", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier).eq("gradeLevel", 1),
      )
      .collect();

    return rows.map((row) => ({
      lessonId: row.lessonId,
      unitId: row.unitId,
      status: row.status,
      correctCount: row.correctCount,
      attemptCount: row.attemptCount,
      masteryScore: row.masteryScore,
      lastPracticedAt: row.lastPracticedAt,
    }));
  },
});

export const recordActivityAttempt = mutation({
  args: {
    unitId: v.string(),
    lessonId: v.string(),
    activityId: v.string(),
    isCorrect: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthenticatedIdentity(ctx);
    await ensureLearnerProfile(ctx);

    const now = Date.now();
    await ctx.db.insert("activityAttempts", {
      tokenIdentifier: identity.tokenIdentifier,
      gradeLevel: 1,
      unitId: args.unitId,
      lessonId: args.lessonId,
      activityId: args.activityId,
      isCorrect: args.isCorrect,
      createdAt: now,
    });

    const existing = await ctx.db
      .query("lessonProgress")
      .withIndex("by_tokenIdentifier_and_lessonId", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
          .eq("lessonId", args.lessonId),
      )
      .unique();

    const previousCorrect = existing?.correctCount ?? 0;
    const previousAttempts = existing?.attemptCount ?? 0;
    const correctCount = previousCorrect + (args.isCorrect ? 1 : 0);
    const attemptCount = previousAttempts + 1;
    const masteryScore = Math.round((correctCount / attemptCount) * 100);
    const status =
      masteryScore >= 80 && attemptCount >= 3 ? "mastered" : "in_progress";

    if (existing === null) {
      await ctx.db.insert("lessonProgress", {
        tokenIdentifier: identity.tokenIdentifier,
        gradeLevel: 1,
        unitId: args.unitId,
        lessonId: args.lessonId,
        status,
        correctCount,
        attemptCount,
        masteryScore,
        lastPracticedAt: now,
      });
    } else {
      await ctx.db.patch(existing._id, {
        unitId: args.unitId,
        status,
        correctCount,
        attemptCount,
        masteryScore,
        lastPracticedAt: now,
      });
    }

    return {
      status,
      correctCount,
      attemptCount,
      masteryScore,
    };
  },
});
