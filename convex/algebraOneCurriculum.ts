import type { CurriculumSection } from "../src/features/lessons/types";

export const algebraOneUnits: CurriculumSection[] = [
  {
    id: "algebra-1-equations-inequalities",
    title: "Equations And Inequalities",
    goal: "Solve linear equations and inequalities using inverse operations.",
    lessons: [
      {
        id: "algebra-1-solve-two-step-equation",
        title: "Solve Two-Step Equations",
        prompt: "Solve 2x + 3 = 11.",
        correctAnswer: "x = 4",
        choices: ["x = 3", "x = 4", "x = 7"],
        visualModel: "equation_balance",
        visualNumbers: [2, 3, 11, 4],
        examples: [
          {
            id: "algebra-1-solve-two-step-equation-example-1",
            explanation: "Start with 2x + 3 = 11.",
            visualNumbers: [2, 3, 11, 4],
          },
          {
            id: "algebra-1-solve-two-step-equation-example-2",
            explanation: "Subtract 3 from both sides to get 2x = 8.",
            visualNumbers: [2, 0, 8, 4],
          },
          {
            id: "algebra-1-solve-two-step-equation-example-3",
            explanation: "Divide both sides by 2, so x = 4.",
            visualNumbers: [1, 0, 4, 4],
          },
        ],
      },
      {
        id: "algebra-1-solve-with-negative-constant",
        title: "Equations With Negative Constants",
        prompt: "Solve 4x - 7 = 21.",
        correctAnswer: "x = 7",
        choices: ["x = 3.5", "x = 7", "x = 14"],
        visualModel: "equation_balance",
        visualNumbers: [4, -7, 21, 7],
        examples: [
          {
            id: "algebra-1-solve-with-negative-constant-example-1",
            explanation: "Start with 4x - 7 = 21.",
            visualNumbers: [4, -7, 21, 7],
          },
          {
            id: "algebra-1-solve-with-negative-constant-example-2",
            explanation: "Add 7 to both sides to get 4x = 28.",
            visualNumbers: [4, 0, 28, 7],
          },
          {
            id: "algebra-1-solve-with-negative-constant-example-3",
            explanation: "Divide by 4, so x = 7.",
            visualNumbers: [1, 0, 7, 7],
          },
        ],
      },
      {
        id: "algebra-1-solve-linear-inequality",
        title: "Solve Linear Inequalities",
        prompt: "Solve 5x - 4 < 16.",
        correctAnswer: "x < 4",
        choices: ["x < 4", "x > 4", "x < 12"],
        visualModel: "number_line",
        visualNumbers: [0, 4],
        examples: [
          {
            id: "algebra-1-solve-linear-inequality-example-1",
            explanation: "Start with 5x - 4 < 16.",
            visualNumbers: [0, 0],
          },
          {
            id: "algebra-1-solve-linear-inequality-example-2",
            explanation: "Add 4 to both sides to get 5x < 20.",
            visualNumbers: [0, 20],
          },
          {
            id: "algebra-1-solve-linear-inequality-example-3",
            explanation: "Divide by 5, so x < 4.",
            visualNumbers: [0, 4],
          },
        ],
      },
    ],
  },
  {
    id: "algebra-1-linear-functions",
    title: "Linear Functions And Graphs",
    goal: "Connect slope, intercepts, tables, equations, and graphs.",
    lessons: [
      {
        id: "algebra-1-find-slope",
        title: "Find Slope",
        prompt: "A line rises 6 units and runs 3 units. What is its slope?",
        correctAnswer: "2",
        choices: ["1/2", "2", "3"],
        visualModel: "coordinate_plane",
        visualNumbers: [2, 1, 0],
        examples: [
          {
            id: "algebra-1-find-slope-example-1",
            explanation: "Slope compares rise to run.",
            visualNumbers: [2, 1, 0],
          },
          {
            id: "algebra-1-find-slope-example-2",
            explanation: "The rise is 6 and the run is 3.",
            visualNumbers: [6, 3, 0],
          },
          {
            id: "algebra-1-find-slope-example-3",
            explanation: "6 divided by 3 equals 2.",
            visualNumbers: [2, 1, 0],
          },
        ],
      },
      {
        id: "algebra-1-write-slope-intercept",
        title: "Write Slope-Intercept Form",
        prompt: "Which equation has slope 3 and y-intercept -2?",
        correctAnswer: "y = 3x - 2",
        choices: ["y = 3x - 2", "y = -2x + 3", "y = 3x + 2"],
        visualModel: "coordinate_plane",
        visualNumbers: [3, 1, -2],
        examples: [
          {
            id: "algebra-1-write-slope-intercept-example-1",
            explanation: "Slope-intercept form is y = mx + b.",
            visualNumbers: [3, 1, -2],
          },
          {
            id: "algebra-1-write-slope-intercept-example-2",
            explanation: "The slope m is 3.",
            visualNumbers: [3, 1, 0],
          },
          {
            id: "algebra-1-write-slope-intercept-example-3",
            explanation: "The y-intercept b is -2, so y = 3x - 2.",
            visualNumbers: [3, 1, -2],
          },
        ],
      },
      {
        id: "algebra-1-function-from-table",
        title: "Find A Rule From A Table",
        prompt:
          "A table has points (0, 1), (1, 3), and (2, 5). What is the rule?",
        correctAnswer: "y = 2x + 1",
        choices: ["y = x + 2", "y = 2x + 1", "y = 3x + 1"],
        visualModel: "coordinate_plane",
        visualNumbers: [2, 1, 1],
        examples: [
          {
            id: "algebra-1-function-from-table-example-1",
            explanation:
              "The y-values increase by 2 each time x increases by 1.",
            visualNumbers: [2, 1, 1],
          },
          {
            id: "algebra-1-function-from-table-example-2",
            explanation: "The point (0, 1) shows the y-intercept is 1.",
            visualNumbers: [0, 1],
          },
          {
            id: "algebra-1-function-from-table-example-3",
            explanation: "The rule is y = 2x + 1.",
            visualNumbers: [2, 1, 1],
          },
        ],
      },
    ],
  },
  {
    id: "algebra-1-systems",
    title: "Systems Of Linear Equations",
    goal: "Solve systems by substitution, elimination, and graphing.",
    lessons: [
      {
        id: "algebra-1-substitution",
        title: "Solve By Substitution",
        prompt: "If y = 2x + 1 and y = 7, what is x?",
        correctAnswer: "x = 3",
        choices: ["x = 2", "x = 3", "x = 4"],
        visualModel: "equation_balance",
        visualNumbers: [2, 1, 7, 3],
        examples: [
          {
            id: "algebra-1-substitution-example-1",
            explanation: "Replace y with 7 in y = 2x + 1.",
            visualNumbers: [2, 1, 7, 3],
          },
          {
            id: "algebra-1-substitution-example-2",
            explanation: "Solve 2x + 1 = 7.",
            visualNumbers: [2, 1, 7, 3],
          },
          {
            id: "algebra-1-substitution-example-3",
            explanation: "Subtract 1 and divide by 2, so x = 3.",
            visualNumbers: [1, 0, 3, 3],
          },
        ],
      },
      {
        id: "algebra-1-system-intersection",
        title: "Find An Intersection",
        prompt: "The lines y = x + 4 and y = 2x + 1 intersect at which point?",
        correctAnswer: "(3, 7)",
        choices: ["(2, 6)", "(3, 7)", "(4, 9)"],
        visualModel: "coordinate_plane",
        visualNumbers: [1, 1, 4],
        examples: [
          {
            id: "algebra-1-system-intersection-example-1",
            explanation:
              "At the intersection, both equations have the same x and y.",
            visualNumbers: [1, 1, 4],
          },
          {
            id: "algebra-1-system-intersection-example-2",
            explanation: "Set x + 4 equal to 2x + 1.",
            visualNumbers: [1, 4, 2, 1],
          },
          {
            id: "algebra-1-system-intersection-example-3",
            explanation: "Solving gives x = 3 and y = 7.",
            visualNumbers: [3, 7],
          },
        ],
      },
      {
        id: "algebra-1-elimination",
        title: "Solve By Elimination",
        prompt: "Solve x + y = 9 and x - y = 3.",
        correctAnswer: "(6, 3)",
        choices: ["(3, 6)", "(6, 3)", "(9, 3)"],
        visualModel: "expression_cards",
        visualNumbers: [9, 3, 6, 3],
        examples: [
          {
            id: "algebra-1-elimination-example-1",
            explanation: "Add the equations to eliminate y.",
            visualNumbers: [9, 3],
          },
          {
            id: "algebra-1-elimination-example-2",
            explanation: "The sum is 2x = 12.",
            visualNumbers: [2, 12],
          },
          {
            id: "algebra-1-elimination-example-3",
            explanation: "x = 6, and then y = 3.",
            visualNumbers: [6, 3],
          },
        ],
      },
    ],
  },
  {
    id: "algebra-1-exponents-radicals",
    title: "Exponents And Radicals",
    goal: "Apply exponent rules, radicals, and scientific notation.",
    lessons: [
      {
        id: "algebra-1-product-of-powers",
        title: "Product Of Powers",
        prompt: "Simplify x^3 * x^4.",
        correctAnswer: "x^7",
        choices: ["x^7", "x^12", "2x^7"],
        visualModel: "expression_cards",
        visualNumbers: [3, 4, 7],
        examples: [
          {
            id: "algebra-1-product-of-powers-example-1",
            explanation: "When bases match, add exponents.",
            visualNumbers: [3, 4],
          },
          {
            id: "algebra-1-product-of-powers-example-2",
            explanation: "3 + 4 = 7.",
            visualNumbers: [3, 4, 7],
          },
          {
            id: "algebra-1-product-of-powers-example-3",
            explanation: "x^3 * x^4 = x^7.",
            visualNumbers: [7],
          },
        ],
      },
      {
        id: "algebra-1-power-of-power",
        title: "Power Of A Power",
        prompt: "Simplify (x^2)^5.",
        correctAnswer: "x^10",
        choices: ["x^7", "x^10", "x^25"],
        visualModel: "expression_cards",
        visualNumbers: [2, 5, 10],
        examples: [
          {
            id: "algebra-1-power-of-power-example-1",
            explanation: "A power raised to a power means multiply exponents.",
            visualNumbers: [2, 5],
          },
          {
            id: "algebra-1-power-of-power-example-2",
            explanation: "2 times 5 equals 10.",
            visualNumbers: [2, 5, 10],
          },
          {
            id: "algebra-1-power-of-power-example-3",
            explanation: "(x^2)^5 = x^10.",
            visualNumbers: [10],
          },
        ],
      },
      {
        id: "algebra-1-scientific-notation",
        title: "Scientific Notation",
        prompt: "Write 3.2 x 10^5 in standard form.",
        correctAnswer: "320,000",
        choices: ["32,000", "320,000", "3,200,000"],
        visualModel: "place_value_chart",
        visualNumbers: [320000],
        examples: [
          {
            id: "algebra-1-scientific-notation-example-1",
            explanation: "10^5 means move the decimal 5 places to the right.",
            visualNumbers: [32, 0],
          },
          {
            id: "algebra-1-scientific-notation-example-2",
            explanation: "3.2 becomes 320,000 after 5 place moves.",
            visualNumbers: [320000],
          },
          {
            id: "algebra-1-scientific-notation-example-3",
            explanation: "So 3.2 x 10^5 = 320,000.",
            visualNumbers: [320000],
          },
        ],
      },
    ],
  },
  {
    id: "algebra-1-polynomials-factoring",
    title: "Polynomials And Factoring",
    goal: "Combine, multiply, and factor polynomial expressions.",
    lessons: [
      {
        id: "algebra-1-combine-like-terms",
        title: "Combine Like Terms",
        prompt: "Simplify 4x + 3 + 2x - 5.",
        correctAnswer: "6x - 2",
        choices: ["6x - 2", "6x + 8", "2x - 2"],
        visualModel: "expression_cards",
        visualNumbers: [4, 3, 2, -5, 6, -2],
        examples: [
          {
            id: "algebra-1-combine-like-terms-example-1",
            explanation: "Group x-terms together and constants together.",
            visualNumbers: [4, 2, 3, -5],
          },
          {
            id: "algebra-1-combine-like-terms-example-2",
            explanation: "4x + 2x = 6x.",
            visualNumbers: [4, 2, 6],
          },
          {
            id: "algebra-1-combine-like-terms-example-3",
            explanation: "3 - 5 = -2, so the simplified expression is 6x - 2.",
            visualNumbers: [6, -2],
          },
        ],
      },
      {
        id: "algebra-1-multiply-binomials",
        title: "Multiply Binomials",
        prompt: "Multiply (x + 3)(x + 2).",
        correctAnswer: "x^2 + 5x + 6",
        choices: ["x^2 + 6", "x^2 + 5x + 6", "x^2 + 6x + 5"],
        visualModel: "expression_cards",
        visualNumbers: [1, 3, 1, 2, 5, 6],
        examples: [
          {
            id: "algebra-1-multiply-binomials-example-1",
            explanation: "Multiply x by x to get x^2.",
            visualNumbers: [1, 1],
          },
          {
            id: "algebra-1-multiply-binomials-example-2",
            explanation: "The middle terms are 2x and 3x.",
            visualNumbers: [2, 3, 5],
          },
          {
            id: "algebra-1-multiply-binomials-example-3",
            explanation: "The constant product is 3 times 2 = 6.",
            visualNumbers: [3, 2, 6],
          },
        ],
      },
      {
        id: "algebra-1-factor-quadratic",
        title: "Factor A Quadratic",
        prompt: "Factor x^2 + 7x + 12.",
        correctAnswer: "(x + 3)(x + 4)",
        choices: ["(x + 2)(x + 6)", "(x + 3)(x + 4)", "(x - 3)(x - 4)"],
        visualModel: "expression_cards",
        visualNumbers: [3, 4, 7, 12],
        examples: [
          {
            id: "algebra-1-factor-quadratic-example-1",
            explanation: "Find two numbers that multiply to 12.",
            visualNumbers: [12],
          },
          {
            id: "algebra-1-factor-quadratic-example-2",
            explanation: "3 and 4 multiply to 12 and add to 7.",
            visualNumbers: [3, 4, 7, 12],
          },
          {
            id: "algebra-1-factor-quadratic-example-3",
            explanation: "So x^2 + 7x + 12 = (x + 3)(x + 4).",
            visualNumbers: [3, 4],
          },
        ],
      },
    ],
  },
  {
    id: "algebra-1-quadratic-functions",
    title: "Quadratic Functions",
    goal: "Interpret quadratic graphs, roots, vertices, and values.",
    lessons: [
      {
        id: "algebra-1-vertex-form",
        title: "Read Vertex Form",
        prompt: "What is the vertex of y = (x - 2)^2 + 3?",
        correctAnswer: "(2, 3)",
        choices: ["(-2, 3)", "(2, 3)", "(3, 2)"],
        visualModel: "coordinate_plane",
        visualNumbers: [0, 1, 3],
        examples: [
          {
            id: "algebra-1-vertex-form-example-1",
            explanation: "Vertex form is y = a(x - h)^2 + k.",
            visualNumbers: [0, 1, 0],
          },
          {
            id: "algebra-1-vertex-form-example-2",
            explanation: "Here h = 2 and k = 3.",
            visualNumbers: [2, 3],
          },
          {
            id: "algebra-1-vertex-form-example-3",
            explanation: "The vertex is (2, 3).",
            visualNumbers: [2, 3],
          },
        ],
      },
      {
        id: "algebra-1-find-roots",
        title: "Find Roots From Factors",
        prompt: "Solve (x - 5)(x + 1) = 0.",
        correctAnswer: "x = 5 or x = -1",
        choices: ["x = 5 or x = -1", "x = -5 or x = 1", "x = 4 or x = -1"],
        visualModel: "number_line",
        visualNumbers: [-1, 6],
        examples: [
          {
            id: "algebra-1-find-roots-example-1",
            explanation: "A product is zero when one factor is zero.",
            visualNumbers: [0, 0],
          },
          {
            id: "algebra-1-find-roots-example-2",
            explanation: "x - 5 = 0 gives x = 5.",
            visualNumbers: [0, 5],
          },
          {
            id: "algebra-1-find-roots-example-3",
            explanation: "x + 1 = 0 gives x = -1.",
            visualNumbers: [0, -1],
          },
        ],
      },
      {
        id: "algebra-1-evaluate-quadratic",
        title: "Evaluate A Quadratic",
        prompt: "For f(x) = x^2 - 4x + 1, what is f(3)?",
        correctAnswer: "-2",
        choices: ["-2", "2", "10"],
        visualModel: "expression_cards",
        visualNumbers: [3, 9, -12, 1, -2],
        examples: [
          {
            id: "algebra-1-evaluate-quadratic-example-1",
            explanation: "Substitute 3 for x.",
            visualNumbers: [3],
          },
          {
            id: "algebra-1-evaluate-quadratic-example-2",
            explanation: "3^2 - 4(3) + 1 becomes 9 - 12 + 1.",
            visualNumbers: [9, -12, 1],
          },
          {
            id: "algebra-1-evaluate-quadratic-example-3",
            explanation: "9 - 12 + 1 = -2.",
            visualNumbers: [9, -12, 1, -2],
          },
        ],
      },
    ],
  },
];
