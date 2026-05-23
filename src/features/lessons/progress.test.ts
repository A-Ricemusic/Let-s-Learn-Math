import { describe, expect, test } from "vitest";
import { getLessonProgressPercent } from "./progress";

describe("getLessonProgressPercent", () => {
  test("returns zero when there is no progress", () => {
    expect(getLessonProgressPercent(0, 10)).toBe(0);
  });

  test("calculates rounded progress", () => {
    expect(getLessonProgressPercent(151, 5)).toBe(50);
  });

  test("caps progress at complete", () => {
    expect(getLessonProgressPercent(900, 5)).toBe(100);
  });
});
