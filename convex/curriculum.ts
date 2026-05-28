import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { calculateLessonMastery } from "../src/features/lessons/mastery";
import {
  ensureLearnerProfile,
  getAuthenticatedIdentity,
} from "../src/server/auth";
import {
  findCurriculumQuestion,
  getGradeUnits,
  gradeOptions,
} from "../src/server/curriculum";
import type { Doc } from "./_generated/dataModel";

function toProgressSummary(row: Doc<"lessonProgress">) {
  return {
    lessonId: row.lessonId,
    unitId: row.unitId,
    status: row.status,
    correctCount: row.correctCount,
    attemptCount: row.attemptCount,
    masteryScore: row.masteryScore,
    lastPracticedAt: row.lastPracticedAt,
  };
}

export const firstGrade = query({
  args: {},
  handler: async () => {
    return {
      gradeLevel: 1,
      title: "First Grade Math",
      teachingNote:
        "Use simple words, short practice, and clear visuals for every idea.",
      units: getGradeUnits(1),
    };
  },
});

export const grades = query({
  args: {},
  handler: async () => {
    return gradeOptions;
  },
});

export const byGrade = query({
  args: {
    gradeLevel: v.number(),
  },
  handler: async (_ctx, args) => {
    const grade = gradeOptions.find(
      (option) => option.gradeLevel === args.gradeLevel,
    );

    if (grade === undefined) {
      throw new Error("Grade not found");
    }

    return {
      gradeLevel: grade.gradeLevel,
      title: `${grade.title} Math`,
      teachingNote:
        args.gradeLevel === 1
          ? "Use simple words, short practice, and clear visuals for every idea."
          : "This grade is selectable now. More complete lessons can be added to this path.",
      units: getGradeUnits(args.gradeLevel),
    };
  },
});

export const myProgressByGrade = query({
  args: {
    gradeLevel: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthenticatedIdentity(ctx);
    const rows = await ctx.db
      .query("lessonProgress")
      .withIndex("by_tokenIdentifier_and_gradeLevel", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
          .eq("gradeLevel", args.gradeLevel),
      )
      .take(100);

    return rows.map(toProgressSummary);
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
      .take(100);

    return rows.map(toProgressSummary);
  },
});

export const recordActivityAttempt = mutation({
  args: {
    gradeLevel: v.number(),
    unitId: v.string(),
    lessonId: v.string(),
    activityId: v.string(),
    selectedAnswer: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getAuthenticatedIdentity(ctx);
    await ensureLearnerProfile(ctx, identity);
    const question = findCurriculumQuestion({
      gradeLevel: args.gradeLevel,
      unitId: args.unitId,
      lessonId: args.lessonId,
      activityId: args.activityId,
    });

    if (question === null) {
      throw new Error("Activity not found");
    }

    const isCorrect = args.selectedAnswer === question.correctAnswer;

    const now = Date.now();
    await ctx.db.insert("activityAttempts", {
      tokenIdentifier: identity.tokenIdentifier,
      gradeLevel: args.gradeLevel,
      unitId: args.unitId,
      lessonId: args.lessonId,
      activityId: args.activityId,
      isCorrect,
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
    const { correctCount, attemptCount, masteryScore, status } =
      calculateLessonMastery({
        previousCorrect,
        previousAttempts,
        isCorrect,
      });

    if (existing === null) {
      await ctx.db.insert("lessonProgress", {
        tokenIdentifier: identity.tokenIdentifier,
        gradeLevel: args.gradeLevel,
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
