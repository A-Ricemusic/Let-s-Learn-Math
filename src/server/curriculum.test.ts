import { describe, expect, test } from "vitest";
import { findCurriculumQuestion, getGradeUnits } from "./curriculum";

describe("getGradeUnits", () => {
  test("returns first grade curriculum with generated examples", () => {
    const units = getGradeUnits(1);

    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });
});

describe("findCurriculumQuestion", () => {
  test("finds server-owned question answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 1,
      unitId: "making-ten",
      lessonId: "making-ten",
      activityId: "making-ten-practice-1",
    });

    expect(question?.correctAnswer).toBe("3");
  });

  test("rejects mismatched lesson and unit ids", () => {
    expect(
      findCurriculumQuestion({
        gradeLevel: 1,
        unitId: "making-ten",
        lessonId: "other",
        activityId: "making-ten-practice-1",
      }),
    ).toBeNull();
  });
});
