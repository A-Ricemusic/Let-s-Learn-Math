import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ensureLearnerProfile, getAuthenticatedIdentity } from "./lib/auth";
import type { Doc } from "./_generated/dataModel";

const MAKE_TEN_GAME_ID = "make-ten";
const MAX_RECENT_RUNS = 10;
const MAX_GAME_SCORE = 10000;
const MAX_GAME_DURATION_SECONDS = 60 * 60;

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

function clampWholeNumber({
  maximum,
  minimum,
  name,
  value,
}: {
  maximum: number;
  minimum: number;
  name: string;
  value: number;
}) {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }

  return Math.min(maximum, Math.max(minimum, Math.floor(value)));
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
    const score = clampWholeNumber({
      maximum: MAX_GAME_SCORE,
      minimum: 0,
      name: "score",
      value: args.score,
    });
    const durationSeconds = clampWholeNumber({
      maximum: MAX_GAME_DURATION_SECONDS,
      minimum: 1,
      name: "durationSeconds",
      value: args.durationSeconds,
    });

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
