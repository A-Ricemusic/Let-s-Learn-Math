import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  syncChecks: defineTable({
    tokenIdentifier: v.string(),
    email: v.optional(v.string()),
    lastSeenAt: v.number(),
    count: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
