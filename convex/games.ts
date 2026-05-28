import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  ensureLearnerProfile,
  getAuthenticatedIdentity,
} from "../src/server/auth";
import type { Doc } from "./_generated/dataModel";

const MAKE_TEN_GAME_ID = "make-ten";
const MAX_RECENT_RUNS = 10;

function toGameRunSummary(row: Doc<"gameRuns">) {
  return {
    id: row._id,
    gameId: row.gameId,
    score: row.score,
    durationSeconds: row.durationSeconds,
    completedAt: row.completedAt,
  };
}

function assertSupportedGame(gameId: string) {
  if (gameId !== MAKE_TEN_GAME_ID) {
    throw new Error("Game not found");
  }
}

export const myGameStats = query({
  args: {
    gameId: v.string(),
  },
  handler: async (ctx, args) => {
    assertSupportedGame(args.gameId);
    const identity = await getAuthenticatedIdentity(ctx);
    const recentRows = await ctx.db
      .query("gameRuns")
      .withIndex("by_tokenIdentifier_and_gameId_and_completedAt", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
          .eq("gameId", args.gameId),
      )
      .order("desc")
      .take(MAX_RECENT_RUNS);
    const bestRows = await ctx.db
      .query("gameRuns")
      .withIndex("by_tokenIdentifier_and_gameId_and_score", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
          .eq("gameId", args.gameId),
      )
      .order("desc")
      .take(1);

    return {
      highScore: bestRows[0]?.score ?? 0,
      recentRuns: recentRows.map(toGameRunSummary),
    };
  },
});

export const recordGameRun = mutation({
  args: {
    gameId: v.string(),
    score: v.number(),
    durationSeconds: v.number(),
  },
  handler: async (ctx, args) => {
    assertSupportedGame(args.gameId);
    const identity = await getAuthenticatedIdentity(ctx);
    await ensureLearnerProfile(ctx, identity);
    const completedAt = Date.now();
    const score = Math.max(0, Math.floor(args.score));
    const durationSeconds = Math.max(1, Math.floor(args.durationSeconds));

    await ctx.db.insert("gameRuns", {
      tokenIdentifier: identity.tokenIdentifier,
      gameId: args.gameId,
      score,
      durationSeconds,
      completedAt,
    });

    return {
      score,
      durationSeconds,
      completedAt,
    };
  },
});
