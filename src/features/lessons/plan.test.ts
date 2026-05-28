import { describe, expect, test } from "vitest";
import { buildSectionPlan, findQuestionInSectionPlan } from "./plan";
import type { CurriculumSection } from "./types";

const section: CurriculumSection = {
  id: "making-ten",
  title: "Making Ten",
  goal: "Use ten frames.",
  lessons: [
    {
      id: "make-ten-7-3",
      title: "7 and 3 make 10",
      prompt: "There are 7 dots. How many more make 10?",
      choices: ["2", "3", "4"],
      correctAnswer: "3",
      visualModel: "ten_frame",
      visualNumbers: [7, 3],
      examples: [
        {
          id: "make-ten-7-3-example-1",
          explanation: "7 dots are already in the frame.",
          visualNumbers: [7],
        },
      ],
    },
  ],
};

describe("buildSectionPlan", () => {
  test("builds making ten steps, three practice questions, and a five question quiz", () => {
    const plan = buildSectionPlan(section);

    expect(plan.examples).toHaveLength(6);
    expect(plan.practice).toHaveLength(3);
    expect(plan.quiz).toHaveLength(5);
  });

  test("uses stable generated question ids", () => {
    const plan = buildSectionPlan(section);

    expect(plan.practice[0]?.id).toBe("making-ten-practice-1");
    expect(plan.quiz[0]?.id).toBe("making-ten-quiz-1");
  });
});

describe("findQuestionInSectionPlan", () => {
  test("finds generated practice and quiz questions", () => {
    expect(
      findQuestionInSectionPlan(section, "making-ten-practice-1-1")
        ?.correctAnswer,
    ).toBeUndefined();
    expect(
      findQuestionInSectionPlan(section, "making-ten-practice-1")
        ?.correctAnswer,
    ).toBe("3");
    expect(
      findQuestionInSectionPlan(section, "making-ten-quiz-1")?.prompt,
    ).toBe("There are 7 dots. How many more make 10?");
  });

  test("returns null for unknown generated question ids", () => {
    expect(findQuestionInSectionPlan(section, "missing")).toBeNull();
  });
});
