import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  syncChecks: defineTable({
    tokenIdentifier: v.string(),
    email: v.optional(v.string()),
    lastSeenAt: v.number(),
    count: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  learnerProfiles: defineTable({
    tokenIdentifier: v.string(),
    email: v.optional(v.string()),
    displayName: v.optional(v.string()),
    activeGradeLevel: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  lessonProgress: defineTable({
    tokenIdentifier: v.string(),
    gradeLevel: v.number(),
    unitId: v.string(),
    lessonId: v.string(),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("mastered"),
    ),
    correctCount: v.number(),
    attemptCount: v.number(),
    masteryScore: v.number(),
    lastPracticedAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_tokenIdentifier_and_gradeLevel", [
      "tokenIdentifier",
      "gradeLevel",
    ])
    .index("by_tokenIdentifier_and_gradeLevel_and_lessonId", [
      "tokenIdentifier",
      "gradeLevel",
      "lessonId",
    ]),
  activityAttempts: defineTable({
    tokenIdentifier: v.string(),
    gradeLevel: v.number(),
    unitId: v.string(),
    lessonId: v.string(),
    activityId: v.string(),
    isCorrect: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_tokenIdentifier_and_lessonId", ["tokenIdentifier", "lessonId"])
    .index("by_tokenIdentifier_and_createdAt", [
      "tokenIdentifier",
      "createdAt",
    ]),
  gameRuns: defineTable({
    tokenIdentifier: v.string(),
    gameId: v.string(),
    score: v.number(),
    durationSeconds: v.number(),
    completedAt: v.number(),
  })
    .index("by_tokenIdentifier_and_gameId_and_completedAt", [
      "tokenIdentifier",
      "gameId",
      "completedAt",
    ])
    .index("by_tokenIdentifier_and_gameId_and_score", [
      "tokenIdentifier",
      "gameId",
      "score",
    ]),
});
