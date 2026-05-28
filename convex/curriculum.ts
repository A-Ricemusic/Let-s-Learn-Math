import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { calculateLessonMastery } from "../src/features/lessons/mastery";
import { ensureLearnerProfile, getAuthenticatedIdentity } from "./lib/auth";
import {
  findCurriculumQuestion,
  getGradeUnits,
  gradeOptions,
} from "../src/server/curriculum";
import type { Doc } from "./_generated/dataModel";

const MIN_GRADE_LEVEL = 1;
const MAX_GRADE_LEVEL = 12;
const MAX_PROGRESS_ROWS = 100;

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

function assertGradeLevel(gradeLevel: number) {
  if (
    !Number.isInteger(gradeLevel) ||
    gradeLevel < MIN_GRADE_LEVEL ||
    gradeLevel > MAX_GRADE_LEVEL
  ) {
    throw new Error("Grade not found");
  }
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
    assertGradeLevel(args.gradeLevel);
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
    assertGradeLevel(args.gradeLevel);
    const identity = await getAuthenticatedIdentity(ctx);
    const rows = await ctx.db
      .query("lessonProgress")
      .withIndex("by_tokenIdentifier_and_gradeLevel", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
          .eq("gradeLevel", args.gradeLevel),
      )
      .take(MAX_PROGRESS_ROWS);

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
      .take(MAX_PROGRESS_ROWS);

    return rows.map(toProgressSummary);
  },
});

export const myParentProgressReport = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getAuthenticatedIdentity(ctx);
    const progressRows = await ctx.db
      .query("lessonProgress")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .take(MAX_PROGRESS_ROWS);
    const attemptRows = await ctx.db
      .query("activityAttempts")
      .withIndex("by_tokenIdentifier_and_createdAt", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .order("desc")
      .take(MAX_PROGRESS_ROWS);

    return gradeOptions.map((grade) => {
      const units = getGradeUnits(grade.gradeLevel);
      const lessonReports = units.map((unit) => {
        const progress = progressRows.find(
          (row) =>
            row.gradeLevel === grade.gradeLevel && row.lessonId === unit.id,
        );

        return {
          lessonId: unit.id,
          title: unit.title,
          goal: unit.goal,
          status: progress?.status ?? "not_started",
          correctCount: progress?.correctCount ?? 0,
          attemptCount: progress?.attemptCount ?? 0,
          masteryScore: progress?.masteryScore ?? 0,
          lastPracticedAt: progress?.lastPracticedAt ?? null,
        };
      });
      const gradeAttempts = attemptRows.filter(
        (row) => row.gradeLevel === grade.gradeLevel,
      );
      const correctAttempts = gradeAttempts.filter(
        (row) => row.isCorrect,
      ).length;
      const masteredLessons = lessonReports.filter(
        (lesson) => lesson.status === "mastered",
      ).length;

      return {
        gradeLevel: grade.gradeLevel,
        title: grade.title,
        lessonCount: lessonReports.length,
        masteredLessons,
        totalAttempts: gradeAttempts.length,
        correctAttempts,
        lessonReports,
      };
    });
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
    assertGradeLevel(args.gradeLevel);
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
      .withIndex("by_tokenIdentifier_and_gradeLevel_and_lessonId", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
          .eq("gradeLevel", args.gradeLevel)
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
        gradeLevel: args.gradeLevel,
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
