import { describe, expect, test } from "vitest";
import {
  findCurriculumQuestion,
  getGradeUnits,
  gradeOptions,
} from "./curriculum";

describe("getGradeUnits", () => {
  test("returns first grade curriculum with generated examples", () => {
    const units = getGradeUnits(1);

    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("returns a full fourth grade curriculum instead of the starter path", () => {
    const units = getGradeUnits(4);

    expect(units).toHaveLength(9);
    expect(units[0]?.id).toBe("grade-4-place-value");
    expect(units[0]?.lessons).toHaveLength(3);
    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("keeps fourth grade lesson answers and examples complete", () => {
    const units = getGradeUnits(4);

    for (const unit of units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);

      for (const lesson of unit.lessons) {
        expect(lesson.choices).toContain(lesson.correctAnswer);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  test("returns a full fifth grade curriculum instead of the starter path", () => {
    const units = getGradeUnits(5);

    expect(units).toHaveLength(8);
    expect(units[0]?.id).toBe("grade-5-decimal-place-value");
    expect(units[0]?.lessons).toHaveLength(3);
    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("keeps fifth grade lesson answers and examples complete", () => {
    const units = getGradeUnits(5);

    for (const unit of units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);

      for (const lesson of unit.lessons) {
        expect(lesson.choices).toContain(lesson.correctAnswer);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  test("returns a full sixth grade curriculum instead of the starter path", () => {
    const units = getGradeUnits(6);

    expect(units).toHaveLength(6);
    expect(units[0]?.id).toBe("grade-6-ratios-rates-percent");
    expect(units[0]?.lessons).toHaveLength(3);
    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("keeps sixth grade lesson answers and examples complete", () => {
    const units = getGradeUnits(6);

    for (const unit of units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);

      for (const lesson of unit.lessons) {
        expect(lesson.choices).toContain(lesson.correctAnswer);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  test("returns a full seventh grade curriculum instead of the starter path", () => {
    const units = getGradeUnits(7);

    expect(units).toHaveLength(8);
    expect(units[0]?.id).toBe("grade-7-proportional-relationships");
    expect(units[0]?.lessons).toHaveLength(3);
    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("keeps seventh grade lesson answers and examples complete", () => {
    const units = getGradeUnits(7);

    for (const unit of units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);

      for (const lesson of unit.lessons) {
        expect(lesson.choices).toContain(lesson.correctAnswer);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  test("returns a full eighth grade curriculum instead of the starter path", () => {
    const units = getGradeUnits(8);

    expect(units).toHaveLength(8);
    expect(units[0]?.id).toBe("grade-8-real-number-system");
    expect(units[0]?.lessons).toHaveLength(3);
    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("keeps eighth grade lesson answers and examples complete", () => {
    const units = getGradeUnits(8);

    for (const unit of units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);

      for (const lesson of unit.lessons) {
        expect(lesson.choices).toContain(lesson.correctAnswer);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  test("returns a full Algebra 1 curriculum instead of a ninth grade path", () => {
    const units = getGradeUnits(9);

    expect(units).toHaveLength(6);
    expect(units[0]?.id).toBe("algebra-1-equations-inequalities");
    expect(units[0]?.lessons).toHaveLength(3);
    expect(units[0]?.lessons[0]?.examples).toHaveLength(3);
  });

  test("keeps Algebra 1 lesson answers and examples complete", () => {
    const units = getGradeUnits(9);

    for (const unit of units) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);

      for (const lesson of unit.lessons) {
        expect(lesson.choices).toContain(lesson.correctAnswer);
        expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  test("returns course-specific starter paths for the remaining high school courses", () => {
    expect(getGradeUnits(10)[0]?.id).toBe("algebra-2-foundations");
    expect(getGradeUnits(11)[0]?.id).toBe("geometry-foundations");
    expect(getGradeUnits(12)[0]?.id).toBe("pre-calculus-foundations");
    expect(getGradeUnits(13)[0]?.id).toBe("statistics-foundations");
    expect(getGradeUnits(14)[0]?.id).toBe("calculus-foundations");
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

  test("finds fourth grade server-owned answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 4,
      unitId: "grade-4-fraction-equivalence",
      lessonId: "grade-4-fraction-equivalence",
      activityId: "grade-4-fraction-equivalence-practice-1",
    });

    expect(question?.correctAnswer).toBe("1/2");
  });

  test("finds fifth grade server-owned answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 5,
      unitId: "grade-5-fraction-addition",
      lessonId: "grade-5-fraction-addition",
      activityId: "grade-5-fraction-addition-practice-1",
    });

    expect(question?.correctAnswer).toBe("5/6");
  });

  test("finds sixth grade server-owned answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 6,
      unitId: "grade-6-ratios-rates-percent",
      lessonId: "grade-6-ratios-rates-percent",
      activityId: "grade-6-ratios-rates-percent-practice-1",
    });

    expect(question?.correctAnswer).toBe("6");
  });

  test("finds seventh grade server-owned answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 7,
      unitId: "grade-7-proportional-relationships",
      lessonId: "grade-7-proportional-relationships",
      activityId: "grade-7-proportional-relationships-practice-1",
    });

    expect(question?.correctAnswer).toBe("$4");
  });

  test("finds eighth grade server-owned answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 8,
      unitId: "grade-8-linear-equations-slope",
      lessonId: "grade-8-linear-equations-slope",
      activityId: "grade-8-linear-equations-slope-practice-1",
    });

    expect(question?.correctAnswer).toBe("2");
  });

  test("finds Algebra 1 server-owned answers by generated id", () => {
    const question = findCurriculumQuestion({
      gradeLevel: 9,
      unitId: "algebra-1-equations-inequalities",
      lessonId: "algebra-1-equations-inequalities",
      activityId: "algebra-1-equations-inequalities-practice-1",
    });

    expect(question?.correctAnswer).toBe("x = 4");
  });
});

describe("gradeOptions", () => {
  test("marks fifth grade as expanded curriculum", () => {
    expect(
      gradeOptions.find((grade) => grade.gradeLevel === 5)?.description,
    ).toContain("Decimal place value");
  });

  test("marks sixth grade as expanded curriculum", () => {
    expect(
      gradeOptions.find((grade) => grade.gradeLevel === 6)?.description,
    ).toContain("Ratios");
  });

  test("marks seventh grade as expanded curriculum", () => {
    expect(
      gradeOptions.find((grade) => grade.gradeLevel === 7)?.description,
    ).toContain("Proportional relationships");
  });

  test("marks eighth grade as expanded curriculum", () => {
    expect(
      gradeOptions.find((grade) => grade.gradeLevel === 8)?.description,
    ).toContain("Real numbers");
  });

  test("offers high school courses instead of ninth through twelfth grade", () => {
    expect(gradeOptions.slice(8).map((grade) => grade.title)).toEqual([
      "Algebra 1",
      "Algebra 2",
      "Geometry",
      "Pre-calculus",
      "Statistics",
      "Calculus",
    ]);
  });
});
