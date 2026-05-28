import {
  firstGradeUnits,
  getLessonExamples,
} from "../../convex/firstGradeCurriculum";
import { algebraOneUnits } from "../../convex/algebraOneCurriculum";
import { eighthGradeUnits } from "../../convex/eighthGradeCurriculum";
import { fifthGradeUnits } from "../../convex/fifthGradeCurriculum";
import { fourthGradeUnits } from "../../convex/fourthGradeCurriculum";
import { seventhGradeUnits } from "../../convex/seventhGradeCurriculum";
import { sixthGradeUnits } from "../../convex/sixthGradeCurriculum";
import { buildSectionPlan } from "../features/lessons/plan";
import type {
  CurriculumSection,
  SectionLesson,
} from "../features/lessons/types";

const expandedGradeDescriptions: Record<number, string> = {
  1: "Making ten, addition, subtraction, place value, time, measurement, and shapes.",
  4: "Place value, multi-digit operations, factors, fractions, decimals, measurement, angles, and geometry.",
  5: "Decimal place value, multi-digit operations, fractions, volume, coordinate planes, and geometry.",
  6: "Ratios, rates, fraction and decimal operations, integers, equations, geometry, and statistics.",
  7: "Proportional relationships, percent, rational numbers, equations, geometry, probability, and statistics.",
  8: "Real numbers, exponents, scientific notation, linear equations, systems, functions, geometry, and bivariate data.",
};

const expandedTeachingNotes: Record<number, string> = {
  1: "Use simple words, short practice, and clear visuals for every idea.",
  4: "Connect every algorithm to place value, area models, fraction models, and measurement contexts.",
  5: "Use decimal grids, fraction bars, area models, volume models, and coordinate planes before fluency practice.",
  6: "Emphasize ratios, integer direction, equation structure, and data displays before abstract fluency.",
  7: "Use proportional reasoning, signed-number models, equations, and data evidence before moving to fluency.",
  8: "Emphasize multiple representations: number lines, tables, equations, graphs, and concise written reasoning.",
};

const starterTeachingNote =
  "This path is selectable now. More complete lessons can be added to it.";

type CurriculumOptionKind = "grade" | "course";
type HighSchoolCoursePathId =
  | "algebra-1"
  | "algebra-2"
  | "geometry"
  | "pre-calculus"
  | "statistics"
  | "calculus";

type CurriculumOptionBase = {
  gradeLevel: number;
  title: string;
  curriculumTitle: string;
  description: string;
  teachingNote: string;
};
type GradeCurriculumOption = CurriculumOptionBase & {
  kind: Extract<CurriculumOptionKind, "grade">;
  pathId: `grade-${number}`;
};
type HighSchoolCourseOption = CurriculumOptionBase & {
  kind: Extract<CurriculumOptionKind, "course">;
  pathId: HighSchoolCoursePathId;
};
type CurriculumOption = GradeCurriculumOption | HighSchoolCourseOption;

const elementaryGradeOptions = Array.from({ length: 8 }, (_, index) => {
  const gradeLevel = index + 1;

  return {
    gradeLevel,
    pathId: `grade-${gradeLevel}` as const,
    kind: "grade" as const,
    title: `Grade ${gradeLevel}`,
    curriculumTitle: `Grade ${gradeLevel} Math`,
    description:
      expandedGradeDescriptions[gradeLevel] ??
      "Starter lesson path ready. Full curriculum will be expanded next.",
    teachingNote: expandedTeachingNotes[gradeLevel] ?? starterTeachingNote,
  };
});

const highSchoolCourseOptions: CurriculumOption[] = [
  {
    gradeLevel: 9,
    pathId: "algebra-1",
    kind: "course",
    title: "Algebra 1",
    curriculumTitle: "Algebra 1",
    description:
      "Equations, inequalities, linear functions, systems, exponents, polynomials, factoring, and quadratics.",
    teachingNote:
      "Build every skill through equations, tables, graphs, and quick checks before fluency practice.",
  },
  {
    gradeLevel: 10,
    pathId: "algebra-2",
    kind: "course",
    title: "Algebra 2",
    curriculumTitle: "Algebra 2",
    description:
      "Advanced functions, quadratics, polynomial expressions, exponentials, logarithms, and sequences.",
    teachingNote:
      "Keep function behavior visible with multiple representations: symbolic, numeric, and graphical.",
  },
  {
    gradeLevel: 11,
    pathId: "geometry",
    kind: "course",
    title: "Geometry",
    curriculumTitle: "Geometry",
    description:
      "Angles, transformations, congruence, similarity, right triangles, circles, area, volume, and proof.",
    teachingNote:
      "Use diagrams first, then name the theorem or relationship that justifies each step.",
  },
  {
    gradeLevel: 12,
    pathId: "pre-calculus",
    kind: "course",
    title: "Pre-calculus",
    curriculumTitle: "Pre-calculus",
    description:
      "Function families, trigonometry, analytic geometry, complex numbers, vectors, and limits.",
    teachingNote:
      "Connect function notation, graphs, and transformations before moving into symbolic manipulation.",
  },
  {
    gradeLevel: 13,
    pathId: "statistics",
    kind: "course",
    title: "Statistics",
    curriculumTitle: "Statistics",
    description:
      "Data distributions, probability, sampling, inference, regression, and statistical reasoning.",
    teachingNote:
      "Ground each calculation in a clear question about data, uncertainty, or prediction.",
  },
  {
    gradeLevel: 14,
    pathId: "calculus",
    kind: "course",
    title: "Calculus",
    curriculumTitle: "Calculus",
    description:
      "Limits, derivatives, integrals, rates of change, accumulation, applications, and modeling.",
    teachingNote:
      "Treat graphs and rates as the primary meaning, then connect that meaning to notation.",
  },
];

export const gradeOptions = [
  ...elementaryGradeOptions,
  ...highSchoolCourseOptions,
] satisfies CurriculumOption[];

export function getGradeOption(gradeLevel: number) {
  return gradeOptions.find((option) => option.gradeLevel === gradeLevel);
}

export function getGradeUnits(gradeLevel: number): CurriculumSection[] {
  const option = getGradeOption(gradeLevel);
  if (option === undefined) {
    throw new Error("Curriculum path not found");
  }

  if (gradeLevel === 1) {
    return firstGradeUnits.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => ({
        ...lesson,
        examples: getLessonExamples(lesson),
      })),
    }));
  }

  if (gradeLevel === 4) {
    return fourthGradeUnits;
  }

  if (gradeLevel === 5) {
    return fifthGradeUnits;
  }

  if (gradeLevel === 6) {
    return sixthGradeUnits;
  }

  if (gradeLevel === 7) {
    return seventhGradeUnits;
  }

  if (gradeLevel === 8) {
    return eighthGradeUnits;
  }

  if (option.kind === "course") {
    if (option.pathId === "algebra-1") {
      return algebraOneUnits;
    }

    return getStarterCourseUnits(option.pathId);
  }

  return getStarterGradeUnits(gradeLevel);
}

export function getGradeTeachingNote(gradeLevel: number) {
  return getGradeOption(gradeLevel)?.teachingNote ?? starterTeachingNote;
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

function getStarterCourseUnits(
  pathId: HighSchoolCoursePathId,
): CurriculumSection[] {
  if (pathId === "algebra-1") {
    return algebraOneUnits;
  }

  const course = starterCourseContent[pathId];

  return [
    {
      id: `${pathId}-foundations`,
      title: course.title,
      goal: course.goal,
      lessons: course.lessons,
    },
  ];
}

const starterCourseContent = {
  "algebra-2": {
    title: "Algebra 2 Foundations",
    goal: "Preview the advanced function thinking this course will build out next.",
    lessons: [
      {
        id: "algebra-2-function-notation",
        title: "Evaluate Function Notation",
        prompt: "If f(x) = 2x^2 - 3, what is f(4)?",
        correctAnswer: "29",
        choices: ["13", "29", "35"],
        visualModel: "expression_cards",
        visualNumbers: [2, 4, 4, -3, 29],
        examples: [
          {
            id: "algebra-2-function-notation-example-1",
            explanation: "Substitute 4 for x.",
            visualNumbers: [4],
          },
          {
            id: "algebra-2-function-notation-example-2",
            explanation: "Compute 2 times 4 squared.",
            visualNumbers: [2, 4, 4],
          },
          {
            id: "algebra-2-function-notation-example-3",
            explanation: "2 times 16 minus 3 equals 29.",
            visualNumbers: [32, -3, 29],
          },
        ],
      },
      {
        id: "algebra-2-quadratic-discriminant",
        title: "Use The Discriminant",
        prompt: "For x^2 - 6x + 9 = 0, what is the discriminant?",
        correctAnswer: "0",
        choices: ["0", "9", "36"],
        visualModel: "expression_cards",
        visualNumbers: [-6, -6, 4, 1, 9, 0],
        examples: [
          {
            id: "algebra-2-quadratic-discriminant-example-1",
            explanation: "The discriminant is b^2 - 4ac.",
            visualNumbers: [-6, 1, 9],
          },
          {
            id: "algebra-2-quadratic-discriminant-example-2",
            explanation: "Here a = 1, b = -6, and c = 9.",
            visualNumbers: [1, -6, 9],
          },
          {
            id: "algebra-2-quadratic-discriminant-example-3",
            explanation: "36 - 36 = 0.",
            visualNumbers: [36, -36, 0],
          },
        ],
      },
      {
        id: "algebra-2-exponential-growth",
        title: "Exponential Growth",
        prompt:
          "A value doubles from 5 to 10 to 20. What is the growth factor?",
        correctAnswer: "2",
        choices: ["2", "5", "10"],
        visualModel: "skip_count",
        visualNumbers: [5, 10, 20],
        examples: [
          {
            id: "algebra-2-exponential-growth-example-1",
            explanation: "Compare each value to the one before it.",
            visualNumbers: [5, 10],
          },
          {
            id: "algebra-2-exponential-growth-example-2",
            explanation: "10 divided by 5 equals 2.",
            visualNumbers: [10, 5, 2],
          },
          {
            id: "algebra-2-exponential-growth-example-3",
            explanation: "20 divided by 10 also equals 2.",
            visualNumbers: [20, 10, 2],
          },
        ],
      },
    ],
  },
  geometry: {
    title: "Geometry Foundations",
    goal: "Preview angle, line, and triangle relationships this course will build out next.",
    lessons: [
      {
        id: "geometry-angle-sum",
        title: "Triangle Angle Sum",
        prompt:
          "Two angles in a triangle are 45 degrees and 65 degrees. What is the third angle?",
        correctAnswer: "70 degrees",
        choices: ["60 degrees", "70 degrees", "80 degrees"],
        visualModel: "angle_model",
        visualNumbers: [45, 65],
        examples: [
          {
            id: "geometry-angle-sum-example-1",
            explanation: "Angles in a triangle add to 180 degrees.",
            visualNumbers: [180],
          },
          {
            id: "geometry-angle-sum-example-2",
            explanation: "45 + 65 = 110.",
            visualNumbers: [45, 65],
          },
          {
            id: "geometry-angle-sum-example-3",
            explanation: "180 - 110 = 70 degrees.",
            visualNumbers: [70],
          },
        ],
      },
      {
        id: "geometry-parallel-lines",
        title: "Identify Parallel Lines",
        prompt: "Which line relationship never intersects?",
        correctAnswer: "parallel",
        choices: ["parallel", "perpendicular", "intersecting"],
        visualModel: "line_geometry",
        visualNumbers: [0],
        examples: [
          {
            id: "geometry-parallel-lines-example-1",
            explanation: "Parallel lines stay the same distance apart.",
            visualNumbers: [0],
          },
          {
            id: "geometry-parallel-lines-example-2",
            explanation: "Perpendicular lines meet at a right angle.",
            visualNumbers: [1],
          },
          {
            id: "geometry-parallel-lines-example-3",
            explanation: "Intersecting lines cross at a point.",
            visualNumbers: [2],
          },
        ],
      },
      {
        id: "geometry-scale-factor",
        title: "Use Scale Factor",
        prompt: "A side length of 6 is scaled by 3. What is the new length?",
        correctAnswer: "18",
        choices: ["9", "18", "24"],
        visualModel: "measurement_conversion",
        visualNumbers: [6, 3, 18],
        examples: [
          {
            id: "geometry-scale-factor-example-1",
            explanation: "A scale factor multiplies every matching length.",
            visualNumbers: [6, 1, 6],
          },
          {
            id: "geometry-scale-factor-example-2",
            explanation: "Multiply 6 by 3.",
            visualNumbers: [6, 3, 18],
          },
          {
            id: "geometry-scale-factor-example-3",
            explanation: "The new side length is 18.",
            visualNumbers: [18, 1, 18],
          },
        ],
      },
    ],
  },
  "pre-calculus": {
    title: "Pre-calculus Foundations",
    goal: "Preview function, transformation, and trigonometric thinking this course will build out next.",
    lessons: [
      {
        id: "pre-calculus-function-composition",
        title: "Compose Functions",
        prompt: "If f(x) = x + 2 and g(x) = 3x, what is f(g(4))?",
        correctAnswer: "14",
        choices: ["12", "14", "18"],
        visualModel: "expression_cards",
        visualNumbers: [4, 3, 12, 2, 14],
        examples: [
          {
            id: "pre-calculus-function-composition-example-1",
            explanation: "Start inside with g(4).",
            visualNumbers: [4, 3],
          },
          {
            id: "pre-calculus-function-composition-example-2",
            explanation: "g(4) = 12.",
            visualNumbers: [12],
          },
          {
            id: "pre-calculus-function-composition-example-3",
            explanation: "f(12) = 12 + 2 = 14.",
            visualNumbers: [12, 2, 14],
          },
        ],
      },
      {
        id: "pre-calculus-graph-shift",
        title: "Describe A Transformation",
        prompt: "Compared with y = x^2, y = (x - 3)^2 moves the graph where?",
        correctAnswer: "right 3",
        choices: ["left 3", "right 3", "up 3"],
        visualModel: "coordinate_plane",
        visualNumbers: [0, 1, 0],
        examples: [
          {
            id: "pre-calculus-graph-shift-example-1",
            explanation: "Inside changes move graphs horizontally.",
            visualNumbers: [0, 1, 0],
          },
          {
            id: "pre-calculus-graph-shift-example-2",
            explanation: "x - 3 shifts the graph right.",
            visualNumbers: [3, 0],
          },
          {
            id: "pre-calculus-graph-shift-example-3",
            explanation: "The shift is right 3.",
            visualNumbers: [3, 0],
          },
        ],
      },
      {
        id: "pre-calculus-basic-sine",
        title: "Use A Trig Ratio",
        prompt: "In a right triangle, sin(theta) equals which ratio?",
        correctAnswer: "opposite / hypotenuse",
        choices: [
          "adjacent / hypotenuse",
          "opposite / hypotenuse",
          "opposite / adjacent",
        ],
        visualModel: "expression_cards",
        visualNumbers: [1, 2, 3],
        examples: [
          {
            id: "pre-calculus-basic-sine-example-1",
            explanation: "Sine compares the opposite side to the hypotenuse.",
            visualNumbers: [1, 3],
          },
          {
            id: "pre-calculus-basic-sine-example-2",
            explanation: "Cosine uses adjacent over hypotenuse.",
            visualNumbers: [2, 3],
          },
          {
            id: "pre-calculus-basic-sine-example-3",
            explanation: "Tangent uses opposite over adjacent.",
            visualNumbers: [1, 2],
          },
        ],
      },
    ],
  },
  statistics: {
    title: "Statistics Foundations",
    goal: "Preview data, probability, and modeling skills this course will build out next.",
    lessons: [
      {
        id: "statistics-mean",
        title: "Find The Mean",
        prompt: "What is the mean of 4, 6, and 11?",
        correctAnswer: "7",
        choices: ["6", "7", "21"],
        visualModel: "expression_cards",
        visualNumbers: [4, 6, 11, 21, 7],
        examples: [
          {
            id: "statistics-mean-example-1",
            explanation: "Add all the values.",
            visualNumbers: [4, 6, 11],
          },
          {
            id: "statistics-mean-example-2",
            explanation: "4 + 6 + 11 = 21.",
            visualNumbers: [21],
          },
          {
            id: "statistics-mean-example-3",
            explanation: "Divide 21 by 3 values to get 7.",
            visualNumbers: [21, 3, 7],
          },
        ],
      },
      {
        id: "statistics-probability",
        title: "Simple Probability",
        prompt: "A bag has 2 red tiles and 3 blue tiles. What is P(red)?",
        correctAnswer: "2/5",
        choices: ["2/5", "3/5", "2/3"],
        visualModel: "fraction_bar",
        visualNumbers: [2, 5],
        examples: [
          {
            id: "statistics-probability-example-1",
            explanation: "There are 2 favorable outcomes: the red tiles.",
            visualNumbers: [2, 5],
          },
          {
            id: "statistics-probability-example-2",
            explanation: "There are 5 total tiles.",
            visualNumbers: [5, 5],
          },
          {
            id: "statistics-probability-example-3",
            explanation: "P(red) = 2/5.",
            visualNumbers: [2, 5],
          },
        ],
      },
      {
        id: "statistics-linear-model",
        title: "Interpret A Linear Model",
        prompt: "A model y = 4x + 10 predicts cost. What is the starting cost?",
        correctAnswer: "$10",
        choices: ["$4", "$10", "$14"],
        visualModel: "coordinate_plane",
        visualNumbers: [4, 1, 10],
        examples: [
          {
            id: "statistics-linear-model-example-1",
            explanation: "The starting value is the y-intercept.",
            visualNumbers: [4, 1, 10],
          },
          {
            id: "statistics-linear-model-example-2",
            explanation: "In y = 4x + 10, the intercept is 10.",
            visualNumbers: [4, 1, 10],
          },
          {
            id: "statistics-linear-model-example-3",
            explanation: "The starting cost is $10.",
            visualNumbers: [10],
          },
        ],
      },
    ],
  },
  calculus: {
    title: "Calculus Foundations",
    goal: "Preview rate-of-change and accumulation ideas this course will build out next.",
    lessons: [
      {
        id: "calculus-average-rate",
        title: "Average Rate Of Change",
        prompt:
          "A function changes from 5 to 17 while x changes from 1 to 4. What is the average rate?",
        correctAnswer: "4",
        choices: ["3", "4", "12"],
        visualModel: "coordinate_plane",
        visualNumbers: [4, 1, 1],
        examples: [
          {
            id: "calculus-average-rate-example-1",
            explanation:
              "Average rate is change in output over change in input.",
            visualNumbers: [17, 5],
          },
          {
            id: "calculus-average-rate-example-2",
            explanation: "The output change is 17 - 5 = 12.",
            visualNumbers: [17, -5, 12],
          },
          {
            id: "calculus-average-rate-example-3",
            explanation: "The input change is 4 - 1 = 3, and 12 / 3 = 4.",
            visualNumbers: [12, 3, 4],
          },
        ],
      },
      {
        id: "calculus-derivative-meaning",
        title: "Derivative As Slope",
        prompt: "What does the derivative measure at a point?",
        correctAnswer: "instantaneous rate of change",
        choices: [
          "total area",
          "instantaneous rate of change",
          "average value only",
        ],
        visualModel: "coordinate_plane",
        visualNumbers: [2, 1, 0],
        examples: [
          {
            id: "calculus-derivative-meaning-example-1",
            explanation: "A derivative describes the slope at one point.",
            visualNumbers: [2, 1, 0],
          },
          {
            id: "calculus-derivative-meaning-example-2",
            explanation: "Slope describes rate of change.",
            visualNumbers: [2, 1, 0],
          },
          {
            id: "calculus-derivative-meaning-example-3",
            explanation:
              "So a derivative measures instantaneous rate of change.",
            visualNumbers: [2, 1, 0],
          },
        ],
      },
      {
        id: "calculus-area-accumulation",
        title: "Area As Accumulation",
        prompt:
          "A rectangle under a rate graph has width 5 and height 3. What is its area?",
        correctAnswer: "15",
        choices: ["8", "15", "30"],
        visualModel: "area_model",
        visualNumbers: [5, 3],
        examples: [
          {
            id: "calculus-area-accumulation-example-1",
            explanation:
              "Area under a rate graph can represent accumulated change.",
            visualNumbers: [5, 3],
          },
          {
            id: "calculus-area-accumulation-example-2",
            explanation: "For a rectangle, area is width times height.",
            visualNumbers: [5, 3],
          },
          {
            id: "calculus-area-accumulation-example-3",
            explanation: "5 times 3 equals 15.",
            visualNumbers: [5, 3, 15],
          },
        ],
      },
    ],
  },
} satisfies Record<
  Exclude<HighSchoolCoursePathId, "algebra-1">,
  { title: string; goal: string; lessons: SectionLesson[] }
>;
