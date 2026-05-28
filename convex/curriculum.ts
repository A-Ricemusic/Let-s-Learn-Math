import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { firstGradeUnits, getLessonExamples } from "./firstGradeCurriculum";

const gradeOptions = Array.from({ length: 12 }, (_, index) => {
  const gradeLevel = index + 1;
  return {
    gradeLevel,
    title: `Grade ${gradeLevel}`,
    description:
      gradeLevel === 1
        ? "Making ten, addition, subtraction, place value, time, measurement, and shapes."
        : "Starter lesson path ready. Full curriculum will be expanded next.",
  };
});

function getStarterGradeUnits(gradeLevel: number) {
  return [
    {
      id: `grade-${gradeLevel}-foundations`,
      title: `Grade ${gradeLevel} Foundations`,
      goal: "Start with a clear example, then solve a practice problem.",
      lessons: [
        {
          id: `grade-${gradeLevel}-number-thinking`,
          unitId: `grade-${gradeLevel}-foundations`,
          title: "Number Thinking",
          concept: "Number sense",
          explanation:
            "Use a picture, a pattern, or a number line to understand the problem.",
          visualModel: "number_line",
          masteryTarget: 80,
          prompt: `${gradeLevel * 3} + ${gradeLevel} = ?`,
          correctAnswer: String(gradeLevel * 4),
          choices: [
            String(gradeLevel * 4 - 1),
            String(gradeLevel * 4),
            String(gradeLevel * 4 + 1),
          ],
          visualNumbers: [gradeLevel * 3, gradeLevel],
          examples: [
            {
              id: `grade-${gradeLevel}-number-thinking-example-1`,
              explanation: `Start at ${gradeLevel * 3}.`,
              visualNumbers: [gradeLevel * 3, 0],
            },
            {
              id: `grade-${gradeLevel}-number-thinking-example-2`,
              explanation: `Move forward ${gradeLevel}.`,
              visualNumbers: [gradeLevel * 3, gradeLevel],
            },
            {
              id: `grade-${gradeLevel}-number-thinking-example-3`,
              explanation: `You land on ${gradeLevel * 4}.`,
              visualNumbers: [gradeLevel * 4, 0],
            },
          ],
        },
      ],
    },
  ];
}

function getGradeUnits(gradeLevel: number) {
  if (gradeLevel === 1) {
    return firstGradeUnits.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => ({
        ...lesson,
        examples: getLessonExamples(lesson),
      })),
    }));
  }

  return getStarterGradeUnits(gradeLevel);
}

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
    gradeLevel: v.number(),
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
      gradeLevel: args.gradeLevel,
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
