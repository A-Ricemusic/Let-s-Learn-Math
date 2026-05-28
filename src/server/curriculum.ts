import {
  firstGradeUnits,
  getLessonExamples,
} from "../../convex/firstGradeCurriculum";
import { buildSectionPlan } from "../features/lessons/plan";
import type { CurriculumSection } from "../features/lessons/types";

export const gradeOptions = Array.from({ length: 12 }, (_, index) => {
  const gradeLevel = index + 1;
  return {
    gradeLevel,
    title: `Grade ${gradeLevel}`,
    description:
      gradeLevel === 1
        ? "Making ten, addition, subtraction, place value, time, measurement, and shapes."
        : "Starter lesson path ready. Full curriculum will be expanded next.",
  };
});

export function getGradeUnits(gradeLevel: number): CurriculumSection[] {
  if (gradeLevel === 1) {
    return firstGradeUnits.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => ({
        ...lesson,
        examples: getLessonExamples(lesson),
      })),
    }));
  }

  return getStarterGradeUnits(gradeLevel);
}

export function findCurriculumQuestion({
  gradeLevel,
  unitId,
  lessonId,
  activityId,
}: {
  gradeLevel: number;
  unitId: string;
  lessonId: string;
  activityId: string;
}) {
  if (lessonId !== unitId) {
    return null;
  }

  const section =
    getGradeUnits(gradeLevel).find((unit) => unit.id === unitId) ?? null;
  if (section === null) {
    return null;
  }

  const sectionPlan = buildSectionPlan(section);
  return (
    sectionPlan.practice.find((question) => question.id === activityId) ??
    sectionPlan.quiz.find((question) => question.id === activityId) ??
    null
  );
}

function getStarterGradeUnits(gradeLevel: number): CurriculumSection[] {
  return [
    {
      id: `grade-${gradeLevel}-foundations`,
      title: `Grade ${gradeLevel} Foundations`,
      goal: "Start with a clear example, then solve a practice problem.",
      lessons: [
        {
          id: `grade-${gradeLevel}-number-thinking`,
          title: "Number Thinking",
          prompt: `${gradeLevel * 3} + ${gradeLevel} = ?`,
          correctAnswer: String(gradeLevel * 4),
          choices: [
            String(gradeLevel * 4 - 1),
            String(gradeLevel * 4),
            String(gradeLevel * 4 + 1),
          ],
          visualModel: "number_line",
          visualNumbers: [gradeLevel * 3, gradeLevel],
          examples: [
            {
              id: `grade-${gradeLevel}-number-thinking-example-1`,
              explanation: `Start at ${gradeLevel * 3}.`,
              visualNumbers: [gradeLevel * 3, 0],
            },
            {
              id: `grade-${gradeLevel}-number-thinking-example-2`,
              explanation: `Move forward ${gradeLevel}.`,
              visualNumbers: [gradeLevel * 3, gradeLevel],
            },
            {
              id: `grade-${gradeLevel}-number-thinking-example-3`,
              explanation: `You land on ${gradeLevel * 4}.`,
              visualNumbers: [gradeLevel * 4, 0],
            },
          ],
        },
      ],
    },
  ];
}
