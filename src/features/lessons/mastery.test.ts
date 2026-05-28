import { describe, expect, test } from "vitest";
import { calculateLessonMastery } from "./mastery";

describe("calculateLessonMastery", () => {
  test("records incorrect attempts as in progress", () => {
    expect(
      calculateLessonMastery({
        previousCorrect: 0,
        previousAttempts: 0,
        isCorrect: false,
      }),
    ).toEqual({
      status: "in_progress",
      correctCount: 0,
      attemptCount: 1,
      masteryScore: 0,
    });
  });

  test("requires at least three attempts before mastery", () => {
    expect(
      calculateLessonMastery({
        previousCorrect: 1,
        previousAttempts: 1,
        isCorrect: true,
      }).status,
    ).toBe("in_progress");
  });

  test("marks high scoring lessons mastered after enough attempts", () => {
    expect(
      calculateLessonMastery({
        previousCorrect: 2,
        previousAttempts: 2,
        isCorrect: true,
      }),
    ).toEqual({
      status: "mastered",
      correctCount: 3,
      attemptCount: 3,
      masteryScore: 100,
    });
  });
});
