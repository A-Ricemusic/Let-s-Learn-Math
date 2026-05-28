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
  test("builds lesson slides, three practice questions, and a five question quiz", () => {
    const plan = buildSectionPlan(section);

    expect(plan.examples).toHaveLength(9);
    expect(plan.practice).toHaveLength(3);
    expect(plan.quiz).toHaveLength(5);
  });

  test("uses examples from multiple lessons in a section", () => {
    const subtractionSection: CurriculumSection = {
      id: "subtraction-within-ten",
      title: "Subtraction Within 10",
      goal: "Take away objects and count what is left.",
      lessons: [
        {
          id: "subtract-8-3",
          title: "Take away 3",
          prompt: "8 apples. 3 go away. How many are left?",
          choices: ["4", "5", "6"],
          correctAnswer: "5",
          visualModel: "take_away",
          visualNumbers: [8, 3],
          examples: [
            {
              id: "subtract-8-3-example-1",
              explanation: "Start with 8.",
              visualNumbers: [8, 0],
            },
            {
              id: "subtract-8-3-example-2",
              explanation: "Take away 3.",
              visualNumbers: [8, 3],
            },
            {
              id: "subtract-8-3-example-3",
              explanation: "5 are left.",
              visualNumbers: [5, 0],
            },
          ],
        },
        {
          id: "subtract-10-6",
          title: "Take away 6",
          prompt: "10 dots. 6 go away. How many are left?",
          choices: ["3", "4", "5"],
          correctAnswer: "4",
          visualModel: "take_away",
          visualNumbers: [10, 6],
          examples: [
            {
              id: "subtract-10-6-example-1",
              explanation: "Start with 10.",
              visualNumbers: [10, 0],
            },
            {
              id: "subtract-10-6-example-2",
              explanation: "Take away 6.",
              visualNumbers: [10, 6],
            },
            {
              id: "subtract-10-6-example-3",
              explanation: "4 are left.",
              visualNumbers: [4, 0],
            },
          ],
        },
      ],
    };

    const plan = buildSectionPlan(subtractionSection);

    expect(plan.examples).toHaveLength(9);
    expect(plan.examples[3]?.id).toBe("subtract-10-6-example-1");
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
