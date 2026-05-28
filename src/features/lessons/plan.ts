import type {
  CurriculumSection,
  SectionExample,
  SectionPlan,
  SectionQuestion,
} from "./types";

const EXAMPLE_SLIDE_COUNT = 9;

export function buildSectionPlan(section: CurriculumSection): SectionPlan {
  const examples = section.lessons
    .flatMap((lesson) =>
      lesson.examples.map((example) => ({
        id: example.id,
        explanation: example.explanation,
        visualModel: lesson.visualModel,
        visualNumbers: example.visualNumbers,
      })),
    )
    .slice(0, EXAMPLE_SLIDE_COUNT);
  const filledExamples = fillExamples(section, examples);

  return {
    examples: filledExamples,
    practice: buildQuestions(section, "practice", 3),
    quiz: buildQuestions(section, "quiz", 5),
  };
}

export function findQuestionInSectionPlan(
  section: CurriculumSection,
  questionId: string,
) {
  const plan = buildSectionPlan(section);

  return (
    plan.practice.find((question) => question.id === questionId) ??
    plan.quiz.find((question) => question.id === questionId) ??
    null
  );
}

function fillExamples(
  section: CurriculumSection,
  examples: SectionExample[],
): SectionExample[] {
  if (examples.length >= EXAMPLE_SLIDE_COUNT) {
    return examples;
  }

  const firstLesson = section.lessons[0];
  if (firstLesson === undefined) {
    return examples;
  }

  const filled = [...examples];
  while (filled.length < EXAMPLE_SLIDE_COUNT) {
    filled.push({
      id: `${section.id}-extra-example-${filled.length + 1}`,
      explanation: firstLesson.title,
      visualModel: firstLesson.visualModel,
      visualNumbers: firstLesson.visualNumbers,
    });
  }

  return filled;
}

function buildQuestions(
  section: CurriculumSection,
  kind: string,
  count: number,
): SectionQuestion[] {
  if (section.lessons.length === 0) {
    return [];
  }

  return Array.from({ length: count }, (_, index) => {
    const lesson = section.lessons[index % section.lessons.length];

    return {
      id: `${section.id}-${kind}-${index + 1}`,
      prompt: lesson.prompt,
      choices: lesson.choices,
      correctAnswer: lesson.correctAnswer,
      visualModel: lesson.visualModel,
      visualNumbers:
        lesson.visualModel === "ten_frame"
          ? lesson.visualNumbers.slice(0, 1)
          : lesson.visualNumbers,
    };
  });
}
