import type {
  CurriculumSection,
  SectionLesson,
} from "../src/features/lessons/types";

type ExampleStep = {
  explanation: string;
  visualNumbers: number[];
};

type LessonInput = Omit<SectionLesson, "examples"> & {
  exampleSteps: ExampleStep[];
};

function lesson(input: LessonInput) {
  const { exampleSteps, ...lessonDetails } = input;

  return {
    ...lessonDetails,
    examples: exampleSteps.map((example, index) => ({
      id: `${input.id}-example-${index + 1}`,
      explanation: example.explanation,
      visualNumbers: example.visualNumbers,
    })),
  };
}

export const seventhGradeUnits: CurriculumSection[] = [
  {
    id: "grade-7-proportional-relationships",
    title: "Proportional Relationships",
    goal: "Use tables, unit rates, and constants of proportionality to solve real problems.",
    lessons: [
      lesson({
        id: "grade-7-unit-rate-notebooks",
        title: "Find A Unit Rate",
        prompt: "3 notebooks cost $12. What is the cost for 1 notebook?",
        correctAnswer: "$4",
        choices: ["$3", "$4", "$6"],
        visualModel: "ratio_table",
        visualNumbers: [1, 4, 3, 12, 6, 24],
        exampleSteps: [
          {
            explanation: "A unit rate tells the cost for 1 notebook.",
            visualNumbers: [1, 4],
          },
          {
            explanation: "3 notebooks cost $12, so divide both numbers by 3.",
            visualNumbers: [1, 4, 3, 12],
          },
          {
            explanation: "The unit price is $4 per notebook.",
            visualNumbers: [1, 4, 3, 12, 6, 24],
          },
        ],
      }),
      lesson({
        id: "grade-7-recipe-batches",
        title: "Scale A Ratio",
        prompt:
          "3 batches use 6 cups of oats. How many cups are needed for 5 batches?",
        correctAnswer: "10 cups",
        choices: ["8 cups", "10 cups", "12 cups"],
        visualModel: "ratio_table",
        visualNumbers: [1, 2, 3, 6, 5, 10],
        exampleSteps: [
          {
            explanation: "Find cups per batch first.",
            visualNumbers: [1, 2],
          },
          {
            explanation: "3 batches use 6 cups, so each batch uses 2 cups.",
            visualNumbers: [1, 2, 3, 6],
          },
          {
            explanation: "5 batches need 5 x 2 = 10 cups.",
            visualNumbers: [1, 2, 3, 6, 5, 10],
          },
        ],
      }),
      lesson({
        id: "grade-7-constant-of-proportionality",
        title: "Use A Constant Of Proportionality",
        prompt: "In the relationship y = 3x, what is y when x = 7?",
        correctAnswer: "21",
        choices: ["10", "21", "24"],
        visualModel: "coordinate_plane",
        visualNumbers: [7, 21],
        exampleSteps: [
          {
            explanation: "The constant of proportionality is 3.",
            visualNumbers: [1, 3],
          },
          {
            explanation: "Each x-value is multiplied by 3.",
            visualNumbers: [4, 12],
          },
          {
            explanation: "When x is 7, y is 7 x 3 = 21.",
            visualNumbers: [7, 21],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-percent-problems",
    title: "Percent Problems",
    goal: "Solve percent of, discount, tax, markup, and percent change problems.",
    lessons: [
      lesson({
        id: "grade-7-percent-of-quantity",
        title: "Find Percent Of A Quantity",
        prompt: "What is 30% of 80?",
        correctAnswer: "24",
        choices: ["18", "24", "30"],
        visualModel: "percent_bar",
        visualNumbers: [30, 80],
        exampleSteps: [
          {
            explanation: "30% means 30 out of every 100 equal parts.",
            visualNumbers: [30, 100],
          },
          {
            explanation: "Find 10% of 80 first: 8.",
            visualNumbers: [10, 80],
          },
          {
            explanation: "30% is 3 groups of 10%, so 3 x 8 = 24.",
            visualNumbers: [30, 80],
          },
        ],
      }),
      lesson({
        id: "grade-7-discount-sale-price",
        title: "Find A Sale Price",
        prompt: "A $60 jacket is 25% off. What is the sale price?",
        correctAnswer: "$45",
        choices: ["$35", "$45", "$55"],
        visualModel: "percent_bar",
        visualNumbers: [25, 60],
        exampleSteps: [
          {
            explanation: "The discount is 25% of the original price.",
            visualNumbers: [25, 60],
          },
          {
            explanation: "25% of 60 is 15.",
            visualNumbers: [25, 60],
          },
          {
            explanation: "Subtract the discount: 60 - 15 = 45.",
            visualNumbers: [75, 60],
          },
        ],
      }),
      lesson({
        id: "grade-7-percent-increase",
        title: "Find Percent Increase",
        prompt: "A value of 40 increases by 10%. What is the new value?",
        correctAnswer: "44",
        choices: ["42", "44", "50"],
        visualModel: "percent_bar",
        visualNumbers: [10, 40],
        exampleSteps: [
          {
            explanation: "The increase is 10% of 40.",
            visualNumbers: [10, 40],
          },
          {
            explanation: "10% of 40 is 4.",
            visualNumbers: [10, 40],
          },
          {
            explanation: "Add the increase: 40 + 4 = 44.",
            visualNumbers: [110, 40],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-rational-number-operations",
    title: "Rational Number Operations",
    goal: "Add, subtract, multiply, and divide positive and negative rational numbers.",
    lessons: [
      lesson({
        id: "grade-7-add-integers-cross-zero",
        title: "Add Integers Across Zero",
        prompt: "-6 + 9 = ?",
        correctAnswer: "3",
        choices: ["-15", "3", "15"],
        visualModel: "number_line",
        visualNumbers: [-6, 9],
        exampleSteps: [
          {
            explanation: "Start at -6 on the number line.",
            visualNumbers: [-6, 0],
          },
          {
            explanation: "Adding 9 means move 9 spaces to the right.",
            visualNumbers: [-6, 9],
          },
          {
            explanation: "You land at 3.",
            visualNumbers: [3, 0],
          },
        ],
      }),
      lesson({
        id: "grade-7-subtract-integers-cross-zero",
        title: "Subtract Integers Across Zero",
        prompt: "4 - 11 = ?",
        correctAnswer: "-7",
        choices: ["-7", "7", "15"],
        visualModel: "number_line",
        visualNumbers: [4, -11],
        exampleSteps: [
          {
            explanation: "Start at 4.",
            visualNumbers: [4, 0],
          },
          {
            explanation: "Subtracting 11 means move 11 spaces left.",
            visualNumbers: [4, -11],
          },
          {
            explanation: "You land at -7.",
            visualNumbers: [-7, 0],
          },
        ],
      }),
      lesson({
        id: "grade-7-multiply-negative-integers",
        title: "Multiply With A Negative Factor",
        prompt: "-3 x 5 = ?",
        correctAnswer: "-15",
        choices: ["-15", "-8", "15"],
        visualModel: "number_line",
        visualNumbers: [0, -15],
        exampleSteps: [
          {
            explanation: "Think of -3 x 5 as five groups of -3.",
            visualNumbers: [0, -3],
          },
          {
            explanation: "Five groups of -3 move 15 spaces left.",
            visualNumbers: [0, -15],
          },
          {
            explanation: "The product is -15.",
            visualNumbers: [-15, 0],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-expressions-equations",
    title: "Expressions, Equations, And Inequalities",
    goal: "Write equivalent expressions and solve two-step equations and inequalities.",
    lessons: [
      lesson({
        id: "grade-7-combine-like-terms",
        title: "Combine Like Terms",
        prompt: "Simplify 3x + 2x + 4.",
        correctAnswer: "5x + 4",
        choices: ["5x + 4", "6x + 4", "5x + 8"],
        visualModel: "equation_balance",
        visualNumbers: [5, 4, 0],
        exampleSteps: [
          {
            explanation: "3x and 2x are like terms.",
            visualNumbers: [3, 0, 0],
          },
          {
            explanation: "Add the coefficients: 3x + 2x = 5x.",
            visualNumbers: [5, 0, 0],
          },
          {
            explanation: "Keep the constant term, so the expression is 5x + 4.",
            visualNumbers: [5, 4, 0],
          },
        ],
      }),
      lesson({
        id: "grade-7-solve-two-step-equation",
        title: "Solve A Two-Step Equation",
        prompt: "3x + 5 = 26. What is x?",
        correctAnswer: "7",
        choices: ["5", "7", "9"],
        visualModel: "equation_balance",
        visualNumbers: [3, 5, 26],
        exampleSteps: [
          {
            explanation: "Start with 3x + 5 = 26.",
            visualNumbers: [3, 5, 26],
          },
          {
            explanation: "Subtract 5 from both sides to get 3x = 21.",
            visualNumbers: [3, 0, 21],
          },
          {
            explanation: "Divide by 3, so x = 7.",
            visualNumbers: [1, 0, 7],
          },
        ],
      }),
      lesson({
        id: "grade-7-solve-inequality",
        title: "Solve A Two-Step Inequality",
        prompt: "4x + 3 < 19. Which statement is true?",
        correctAnswer: "x < 4",
        choices: ["x < 4", "x > 4", "x < 16"],
        visualModel: "equation_balance",
        visualNumbers: [4, 3, 19],
        exampleSteps: [
          {
            explanation: "Start with 4x + 3 < 19.",
            visualNumbers: [4, 3, 19],
          },
          {
            explanation: "Subtract 3 from both sides to get 4x < 16.",
            visualNumbers: [4, 0, 16],
          },
          {
            explanation: "Divide by 4, so x < 4.",
            visualNumbers: [1, 0, 4],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-geometry-measurement",
    title: "Geometry And Measurement",
    goal: "Use area, circumference, scale drawings, and composite figures to solve measurement problems.",
    lessons: [
      lesson({
        id: "grade-7-circle-area-radius",
        title: "Area Of A Circle",
        prompt: "A circle has radius 4. What is its area in terms of pi?",
        correctAnswer: "16pi",
        choices: ["8pi", "16pi", "64pi"],
        visualModel: "circle_measure",
        visualNumbers: [4],
        exampleSteps: [
          {
            explanation: "Use the area formula A = pi x r x r.",
            visualNumbers: [4],
          },
          {
            explanation: "The radius is 4, so square 4.",
            visualNumbers: [4],
          },
          {
            explanation: "4 x 4 = 16, so the area is 16pi.",
            visualNumbers: [4, 16],
          },
        ],
      }),
      lesson({
        id: "grade-7-circle-circumference-diameter",
        title: "Circumference From Diameter",
        prompt:
          "A circle has diameter 10. What is its circumference in terms of pi?",
        correctAnswer: "10pi",
        choices: ["5pi", "10pi", "20pi"],
        visualModel: "circle_measure",
        visualNumbers: [5, 10],
        exampleSteps: [
          {
            explanation: "Circumference can be found with C = pi x d.",
            visualNumbers: [5, 10],
          },
          {
            explanation: "The diameter is 10.",
            visualNumbers: [5, 10],
          },
          {
            explanation: "C = pi x 10, or 10pi.",
            visualNumbers: [5, 10],
          },
        ],
      }),
      lesson({
        id: "grade-7-scale-drawing-distance",
        title: "Use A Scale Drawing",
        prompt:
          "A scale drawing uses 1 cm for 6 m. How many meters does 4 cm represent?",
        correctAnswer: "24 m",
        choices: ["10 m", "24 m", "30 m"],
        visualModel: "ratio_table",
        visualNumbers: [1, 6, 4, 24, 6, 36],
        exampleSteps: [
          {
            explanation: "The scale says 1 cm represents 6 m.",
            visualNumbers: [1, 6],
          },
          {
            explanation: "Multiply both quantities by 4.",
            visualNumbers: [1, 6, 4, 24],
          },
          {
            explanation: "4 cm represents 24 m.",
            visualNumbers: [1, 6, 4, 24, 6, 36],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-angles-triangles",
    title: "Angles And Triangles",
    goal: "Use angle relationships to find missing angle measures.",
    lessons: [
      lesson({
        id: "grade-7-supplementary-angle",
        title: "Supplementary Angles",
        prompt: "An angle is 116 degrees. Its supplement is how many degrees?",
        correctAnswer: "64",
        choices: ["54", "64", "74"],
        visualModel: "angle_model",
        visualNumbers: [116, 64],
        exampleSteps: [
          {
            explanation: "Supplementary angles add to 180 degrees.",
            visualNumbers: [116, 0],
          },
          {
            explanation: "Write 116 + x = 180.",
            visualNumbers: [116, 64],
          },
          {
            explanation: "180 - 116 = 64.",
            visualNumbers: [116, 64],
          },
        ],
      }),
      lesson({
        id: "grade-7-triangle-missing-angle",
        title: "Missing Triangle Angle",
        prompt:
          "A triangle has angles 40 degrees and 75 degrees. What is the third angle?",
        correctAnswer: "65",
        choices: ["55", "65", "75"],
        visualModel: "angle_model",
        visualNumbers: [40, 75],
        exampleSteps: [
          {
            explanation: "Triangle angle measures add to 180 degrees.",
            visualNumbers: [40, 75],
          },
          {
            explanation: "40 + 75 = 115.",
            visualNumbers: [40, 75],
          },
          {
            explanation: "180 - 115 = 65.",
            visualNumbers: [115, 65],
          },
        ],
      }),
      lesson({
        id: "grade-7-vertical-angles",
        title: "Vertical Angles",
        prompt:
          "One vertical angle is 132 degrees. What is the opposite angle?",
        correctAnswer: "132",
        choices: ["48", "90", "132"],
        visualModel: "angle_model",
        visualNumbers: [132, 0],
        exampleSteps: [
          {
            explanation:
              "Vertical angles are opposite angles made by crossing lines.",
            visualNumbers: [132, 0],
          },
          {
            explanation: "Opposite vertical angles are congruent.",
            visualNumbers: [132, 0],
          },
          {
            explanation: "So the opposite angle is also 132 degrees.",
            visualNumbers: [132, 0],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-probability",
    title: "Probability",
    goal: "Find theoretical probabilities and use them to predict outcomes.",
    lessons: [
      lesson({
        id: "grade-7-simple-probability",
        title: "Simple Probability",
        prompt: "A bag has 3 red tiles out of 10 total tiles. P(red) = ?",
        correctAnswer: "3/10",
        choices: ["3/10", "7/10", "10/3"],
        visualModel: "probability_model",
        visualNumbers: [3, 10],
        exampleSteps: [
          {
            explanation:
              "Probability compares favorable outcomes to total outcomes.",
            visualNumbers: [3, 10],
          },
          {
            explanation: "There are 3 red tiles and 10 total tiles.",
            visualNumbers: [3, 10],
          },
          {
            explanation: "P(red) = 3/10.",
            visualNumbers: [3, 10],
          },
        ],
      }),
      lesson({
        id: "grade-7-compound-probability",
        title: "Compound Probability",
        prompt: "A coin is flipped and a die is rolled. P(heads and even) = ?",
        correctAnswer: "1/4",
        choices: ["1/2", "1/4", "3/4"],
        visualModel: "probability_model",
        visualNumbers: [3, 12],
        exampleSteps: [
          {
            explanation: "There are 2 coin outcomes and 6 die outcomes.",
            visualNumbers: [0, 12],
          },
          {
            explanation:
              "Heads with an even die roll has 3 favorable outcomes.",
            visualNumbers: [3, 12],
          },
          {
            explanation: "3/12 simplifies to 1/4.",
            visualNumbers: [3, 12],
          },
        ],
      }),
      lesson({
        id: "grade-7-expected-outcomes",
        title: "Expected Outcomes",
        prompt: "If P(win) = 2/5, how many wins are expected in 30 tries?",
        correctAnswer: "12",
        choices: ["10", "12", "15"],
        visualModel: "probability_model",
        visualNumbers: [2, 5],
        exampleSteps: [
          {
            explanation:
              "Use the probability to predict part of a larger number of tries.",
            visualNumbers: [2, 5],
          },
          {
            explanation:
              "2/5 of 30 is the same as 30 divided by 5, then times 2.",
            visualNumbers: [2, 5],
          },
          {
            explanation: "30 / 5 = 6, and 6 x 2 = 12.",
            visualNumbers: [12, 30],
          },
        ],
      }),
    ],
  },
  {
    id: "grade-7-statistics-sampling",
    title: "Statistics And Sampling",
    goal: "Use measures of center, variability, and samples to compare data.",
    lessons: [
      lesson({
        id: "grade-7-median-data-set",
        title: "Find The Median",
        prompt: "Find the median of 6, 8, 10, 12, 14.",
        correctAnswer: "10",
        choices: ["8", "10", "12"],
        visualModel: "data_distribution",
        visualNumbers: [6, 8, 10, 12, 14],
        exampleSteps: [
          {
            explanation: "Order the data from least to greatest.",
            visualNumbers: [6, 8, 10, 12, 14],
          },
          {
            explanation: "The median is the middle value.",
            visualNumbers: [6, 8, 10, 12, 14],
          },
          {
            explanation: "The middle value is 10.",
            visualNumbers: [10],
          },
        ],
      }),
      lesson({
        id: "grade-7-mean-absolute-deviation",
        title: "Mean Absolute Deviation",
        prompt: "The data 4, 6, 8, 10, 12 has mean 8. What is the MAD?",
        correctAnswer: "2.4",
        choices: ["2", "2.4", "8"],
        visualModel: "data_distribution",
        visualNumbers: [4, 6, 8, 10, 12],
        exampleSteps: [
          {
            explanation: "Find distances from the mean 8: 4, 2, 0, 2, 4.",
            visualNumbers: [4, 2, 0, 2, 4],
          },
          {
            explanation: "Add the distances: 4 + 2 + 0 + 2 + 4 = 12.",
            visualNumbers: [4, 2, 0, 2, 4],
          },
          {
            explanation: "Divide by 5 data values: 12 / 5 = 2.4.",
            visualNumbers: [2.4],
          },
        ],
      }),
      lesson({
        id: "grade-7-compare-sample-means",
        title: "Compare Sample Means",
        prompt:
          "Sample A mean is 82 and Sample B mean is 76. How much higher is A?",
        correctAnswer: "6",
        choices: ["4", "6", "8"],
        visualModel: "data_distribution",
        visualNumbers: [76, 82],
        exampleSteps: [
          {
            explanation: "Compare the two sample means.",
            visualNumbers: [76, 82],
          },
          {
            explanation: "Subtract the smaller mean from the larger mean.",
            visualNumbers: [76, 82],
          },
          {
            explanation: "82 - 76 = 6.",
            visualNumbers: [6],
          },
        ],
      }),
    ],
  },
];
