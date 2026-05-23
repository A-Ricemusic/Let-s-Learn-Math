import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function requireUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Authentication required");
  }
  return identity;
}

export const generateVideoUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const createLesson = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    topic: v.string(),
    gradeLevel: v.number(),
    durationMinutes: v.number(),
    videoStorageId: v.optional(v.id("_storage")),
    requiredPlan: v.union(v.literal("free"), v.literal("premium")),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);

    return await ctx.db.insert("lessons", {
      ...args,
      isPublished: false,
      createdBy: identity.subject,
    });
  },
});

export const publishLesson = mutation({
  args: {
    lessonId: v.id("lessons"),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    await ctx.db.patch(args.lessonId, { isPublished: args.isPublished });
  },
});

export const listPublishedLessons = query({
  args: {},
  handler: async (ctx) => {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return await Promise.all(
      lessons.map(async (lesson) => ({
        ...lesson,
        videoUrl: lesson.videoStorageId ? await ctx.storage.getUrl(lesson.videoStorageId) : null,
      })),
    );
  },
});

export const saveProgress = mutation({
  args: {
    lessonId: v.id("lessons"),
    progressSeconds: v.number(),
    completedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await requireUser(ctx);
    const existing = await ctx.db
      .query("enrollments")
      .filter((q) =>
        q.and(
          q.eq(q.field("clerkUserId"), identity.subject),
          q.eq(q.field("lessonId"), args.lessonId),
        ),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        progressSeconds: args.progressSeconds,
        completedAt: args.completedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("enrollments", {
      clerkUserId: identity.subject,
      lessonId: args.lessonId,
      progressSeconds: args.progressSeconds,
      completedAt: args.completedAt,
    });
  },
});
