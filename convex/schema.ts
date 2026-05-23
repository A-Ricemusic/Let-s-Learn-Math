import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lessons: defineTable({
    title: v.string(),
    description: v.string(),
    topic: v.string(),
    gradeLevel: v.number(),
    durationMinutes: v.number(),
    videoStorageId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    requiredPlan: v.union(v.literal("free"), v.literal("premium")),
    createdBy: v.string(),
  })
    .index("by_published", ["isPublished"])
    .index("by_topic", ["topic"]),

  enrollments: defineTable({
    clerkUserId: v.string(),
    lessonId: v.id("lessons"),
    progressSeconds: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_user_lesson", ["clerkUserId", "lessonId"]),

  subscriptions: defineTable({
    clerkUserId: v.string(),
    plan: v.union(v.literal("free"), v.literal("monthly"), v.literal("annual")),
    status: v.union(v.literal("active"), v.literal("past_due"), v.literal("canceled")),
    clerkPaymentReference: v.optional(v.string()),
  }).index("by_user", ["clerkUserId"]),
});
