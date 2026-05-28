import type { CurriculumSection } from "../src/features/lessons/types";

export const eighthGradeUnits: CurriculumSection[] = [
  {
    id: "grade-8-real-number-system",
    title: "Real Numbers And Irrational Numbers",
    goal: "Classify rational and irrational numbers, then estimate irrational values on a number line.",
    lessons: [
      {
        id: "grade-8-repeating-decimal-to-fraction",
        title: "Convert A Repeating Decimal",
        prompt: "0.333... is equal to which fraction?",
        correctAnswer: "1/3",
        choices: ["1/3", "3/10", "3/100"],
        visualModel: "fraction_bar",
        visualNumbers: [1, 3],
        examples: [
          {
            id: "grade-8-repeating-decimal-to-fraction-example-1",
            explanation:
              "A repeating decimal has a digit pattern that keeps going.",
            visualNumbers: [3, 10],
          },
          {
            id: "grade-8-repeating-decimal-to-fraction-example-2",
            explanation: "One third is 0.333... when written as a decimal.",
            visualNumbers: [1, 3],
          },
          {
            id: "grade-8-repeating-decimal-to-fraction-example-3",
            explanation: "So 0.333... equals 1/3.",
            visualNumbers: [1, 3],
          },
        ],
      },
      {
        id: "grade-8-estimate-square-root-fifty",
        title: "Estimate An Irrational Square Root",
        prompt: "Which whole numbers is sqrt(50) between?",
        correctAnswer: "7 and 8",
        choices: ["6 and 7", "7 and 8", "8 and 9"],
        visualModel: "skip_count",
        visualNumbers: [36, 49, 50, 64, 81],
        examples: [
          {
            id: "grade-8-estimate-square-root-fifty-example-1",
            explanation: "Look for perfect squares near 50.",
            visualNumbers: [36, 49, 64],
          },
          {
            id: "grade-8-estimate-square-root-fifty-example-2",
            explanation: "49 is 7 squared and 64 is 8 squared.",
            visualNumbers: [49, 50, 64],
          },
          {
            id: "grade-8-estimate-square-root-fifty-example-3",
            explanation:
              "Because 50 is between 49 and 64, sqrt(50) is between 7 and 8.",
            visualNumbers: [7, 8],
          },
        ],
      },
      {
        id: "grade-8-compare-pi-and-fraction",
        title: "Compare Rational And Irrational Numbers",
        prompt: "Which is greater: pi or 22/7?",
        correctAnswer: "22/7",
        choices: ["pi", "22/7", "They are equal"],
        visualModel: "skip_count",
        visualNumbers: [3.14, 3.141, 3.142],
        examples: [
          {
            id: "grade-8-compare-pi-and-fraction-example-1",
            explanation: "pi is about 3.14159.",
            visualNumbers: [3.14, 3.14159],
          },
          {
            id: "grade-8-compare-pi-and-fraction-example-2",
            explanation: "22/7 is about 3.142857.",
            visualNumbers: [3.142, 3.143],
          },
          {
            id: "grade-8-compare-pi-and-fraction-example-3",
            explanation: "22/7 is slightly greater than pi.",
            visualNumbers: [3.14159, 3.142857],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-exponents-scientific-notation",
    title: "Exponents And Scientific Notation",
    goal: "Apply exponent rules, roots, and scientific notation to very large and very small quantities.",
    lessons: [
      {
        id: "grade-8-multiply-powers-same-base",
        title: "Multiply Powers With The Same Base",
        prompt: "2^3 x 2^4 = ?",
        correctAnswer: "2^7",
        choices: ["2^7", "2^12", "4^7"],
        visualModel: "skip_count",
        visualNumbers: [2, 4, 8, 16, 32, 64, 128],
        examples: [
          {
            id: "grade-8-multiply-powers-same-base-example-1",
            explanation: "When powers have the same base, keep the base.",
            visualNumbers: [2, 3, 4],
          },
          {
            id: "grade-8-multiply-powers-same-base-example-2",
            explanation: "Add the exponents: 3 + 4 = 7.",
            visualNumbers: [3, 4, 7],
          },
          {
            id: "grade-8-multiply-powers-same-base-example-3",
            explanation: "So 2^3 x 2^4 equals 2^7.",
            visualNumbers: [2, 7],
          },
        ],
      },
      {
        id: "grade-8-cube-root-sixty-four",
        title: "Find A Cube Root",
        prompt: "What is the cube root of 64?",
        correctAnswer: "4",
        choices: ["3", "4", "8"],
        visualModel: "base_ten",
        visualNumbers: [4, 0],
        examples: [
          {
            id: "grade-8-cube-root-sixty-four-example-1",
            explanation: "A cube root asks what number cubed makes the value.",
            visualNumbers: [4, 0],
          },
          {
            id: "grade-8-cube-root-sixty-four-example-2",
            explanation: "4 x 4 x 4 equals 64.",
            visualNumbers: [4, 4],
          },
          {
            id: "grade-8-cube-root-sixty-four-example-3",
            explanation: "The cube root of 64 is 4.",
            visualNumbers: [4],
          },
        ],
      },
      {
        id: "grade-8-scientific-notation-distance",
        title: "Compute With Scientific Notation",
        prompt: "(3 x 10^5) x (2 x 10^3) = ?",
        correctAnswer: "6 x 10^8",
        choices: ["5 x 10^8", "6 x 10^8", "6 x 10^15"],
        visualModel: "place_value_chart",
        visualNumbers: [600000000, 8],
        examples: [
          {
            id: "grade-8-scientific-notation-distance-example-1",
            explanation: "Multiply the leading numbers: 3 x 2 = 6.",
            visualNumbers: [6, 0],
          },
          {
            id: "grade-8-scientific-notation-distance-example-2",
            explanation: "For powers of 10, add exponents: 5 + 3 = 8.",
            visualNumbers: [10, 8],
          },
          {
            id: "grade-8-scientific-notation-distance-example-3",
            explanation: "The product is 6 x 10^8.",
            visualNumbers: [600000000, 8],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-linear-equations-slope",
    title: "Linear Equations And Slope",
    goal: "Use slope, intercepts, and multi-step equations to represent and solve linear relationships.",
    lessons: [
      {
        id: "grade-8-slope-from-two-points",
        title: "Find Slope From Two Points",
        prompt: "What is the slope of the line through (2, 5) and (6, 13)?",
        correctAnswer: "2",
        choices: ["1/2", "2", "8"],
        visualModel: "number_line",
        visualNumbers: [5, 8],
        examples: [
          {
            id: "grade-8-slope-from-two-points-example-1",
            explanation: "Slope is change in y divided by change in x.",
            visualNumbers: [2, 6],
          },
          {
            id: "grade-8-slope-from-two-points-example-2",
            explanation:
              "The y-values change by 8 and the x-values change by 4.",
            visualNumbers: [8, 4],
          },
          {
            id: "grade-8-slope-from-two-points-example-3",
            explanation: "8 divided by 4 equals 2.",
            visualNumbers: [2, 0],
          },
        ],
      },
      {
        id: "grade-8-identify-y-intercept",
        title: "Interpret Slope-Intercept Form",
        prompt: "In y = 3x + 7, what is the y-intercept?",
        correctAnswer: "7",
        choices: ["3", "7", "10"],
        visualModel: "skip_count",
        visualNumbers: [7, 10, 13, 16],
        examples: [
          {
            id: "grade-8-identify-y-intercept-example-1",
            explanation: "Slope-intercept form is y = mx + b.",
            visualNumbers: [3, 7],
          },
          {
            id: "grade-8-identify-y-intercept-example-2",
            explanation: "The b-value is where the line crosses the y-axis.",
            visualNumbers: [7],
          },
          {
            id: "grade-8-identify-y-intercept-example-3",
            explanation: "In y = 3x + 7, the y-intercept is 7.",
            visualNumbers: [7, 0],
          },
        ],
      },
      {
        id: "grade-8-solve-multistep-equation",
        title: "Solve A Multi-Step Equation",
        prompt: "Solve 3x + 5 = 20. What is x?",
        correctAnswer: "5",
        choices: ["5", "8", "15"],
        visualModel: "skip_count",
        visualNumbers: [5, 10, 15, 20],
        examples: [
          {
            id: "grade-8-solve-multistep-equation-example-1",
            explanation: "Subtract 5 from both sides to get 3x = 15.",
            visualNumbers: [20, 5, 15],
          },
          {
            id: "grade-8-solve-multistep-equation-example-2",
            explanation: "Divide both sides by 3.",
            visualNumbers: [15, 3],
          },
          {
            id: "grade-8-solve-multistep-equation-example-3",
            explanation: "15 divided by 3 equals 5, so x = 5.",
            visualNumbers: [5],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-systems-of-equations",
    title: "Systems Of Linear Equations",
    goal: "Solve pairs of linear equations by substitution, elimination, and graph interpretation.",
    lessons: [
      {
        id: "grade-8-system-substitution",
        title: "Solve By Substitution",
        prompt: "If y = x + 2 and y = 8, what is x?",
        correctAnswer: "6",
        choices: ["4", "6", "10"],
        visualModel: "number_line",
        visualNumbers: [2, 6],
        examples: [
          {
            id: "grade-8-system-substitution-example-1",
            explanation: "Substitute 8 for y in y = x + 2.",
            visualNumbers: [8, 2],
          },
          {
            id: "grade-8-system-substitution-example-2",
            explanation: "The equation becomes 8 = x + 2.",
            visualNumbers: [2, 6],
          },
          {
            id: "grade-8-system-substitution-example-3",
            explanation: "Subtract 2, so x = 6.",
            visualNumbers: [6, 0],
          },
        ],
      },
      {
        id: "grade-8-system-elimination",
        title: "Solve By Elimination",
        prompt: "Solve x + y = 10 and x - y = 2. What is x?",
        correctAnswer: "6",
        choices: ["4", "6", "8"],
        visualModel: "skip_count",
        visualNumbers: [2, 6, 10],
        examples: [
          {
            id: "grade-8-system-elimination-example-1",
            explanation: "Add the equations so y and -y cancel.",
            visualNumbers: [10, 2],
          },
          {
            id: "grade-8-system-elimination-example-2",
            explanation: "The result is 2x = 12.",
            visualNumbers: [2, 12],
          },
          {
            id: "grade-8-system-elimination-example-3",
            explanation: "Divide by 2 to get x = 6.",
            visualNumbers: [6],
          },
        ],
      },
      {
        id: "grade-8-system-intersection",
        title: "Interpret The Intersection",
        prompt:
          "The lines y = x + 1 and y = -x + 5 intersect at (2, 3). What does the y-value of the solution equal?",
        correctAnswer: "3",
        choices: ["2", "3", "5"],
        visualModel: "line_geometry",
        visualNumbers: [2],
        examples: [
          {
            id: "grade-8-system-intersection-example-1",
            explanation: "The solution to a system is where the lines meet.",
            visualNumbers: [2],
          },
          {
            id: "grade-8-system-intersection-example-2",
            explanation: "The point is written as (x, y).",
            visualNumbers: [2, 3],
          },
          {
            id: "grade-8-system-intersection-example-3",
            explanation: "For (2, 3), the y-value is 3.",
            visualNumbers: [3],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-functions",
    title: "Functions",
    goal: "Identify, compare, and interpret functions represented by rules, tables, graphs, and stories.",
    lessons: [
      {
        id: "grade-8-function-input-output-rule",
        title: "Use A Function Rule",
        prompt: "For the rule y = 2x + 1, what is y when x = 4?",
        correctAnswer: "9",
        choices: ["7", "8", "9"],
        visualModel: "skip_count",
        visualNumbers: [1, 3, 5, 7, 9],
        examples: [
          {
            id: "grade-8-function-input-output-rule-example-1",
            explanation: "A function rule gives one output for each input.",
            visualNumbers: [4, 0],
          },
          {
            id: "grade-8-function-input-output-rule-example-2",
            explanation: "Replace x with 4: y = 2 x 4 + 1.",
            visualNumbers: [2, 4, 1],
          },
          {
            id: "grade-8-function-input-output-rule-example-3",
            explanation: "2 x 4 + 1 equals 9.",
            visualNumbers: [9],
          },
        ],
      },
      {
        id: "grade-8-compare-rates-of-change",
        title: "Compare Rates Of Change",
        prompt:
          "Function A has slope 3. Function B increases 10 units when x increases 5 units. Which has the greater rate of change?",
        correctAnswer: "Function A",
        choices: ["Function A", "Function B", "They are equal"],
        visualModel: "skip_count",
        visualNumbers: [0, 3, 6, 9, 10],
        examples: [
          {
            id: "grade-8-compare-rates-of-change-example-1",
            explanation: "Function A has rate of change 3.",
            visualNumbers: [3],
          },
          {
            id: "grade-8-compare-rates-of-change-example-2",
            explanation: "Function B has rate 10 divided by 5, which is 2.",
            visualNumbers: [10, 5, 2],
          },
          {
            id: "grade-8-compare-rates-of-change-example-3",
            explanation: "3 is greater than 2, so Function A is greater.",
            visualNumbers: [3, 2],
          },
        ],
      },
      {
        id: "grade-8-linear-or-nonlinear",
        title: "Identify Linear And Nonlinear Functions",
        prompt: "Which rule is linear?",
        correctAnswer: "y = 4x - 2",
        choices: ["y = x^2", "y = 4x - 2", "y = 2^x"],
        visualModel: "line_geometry",
        visualNumbers: [0],
        examples: [
          {
            id: "grade-8-linear-or-nonlinear-example-1",
            explanation: "A linear function has a constant rate of change.",
            visualNumbers: [0, 4, 8, 12],
          },
          {
            id: "grade-8-linear-or-nonlinear-example-2",
            explanation: "Rules in the form y = mx + b are linear.",
            visualNumbers: [4, 2],
          },
          {
            id: "grade-8-linear-or-nonlinear-example-3",
            explanation: "The rule y = 4x - 2 is linear.",
            visualNumbers: [4, 2],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-transformations-angles",
    title: "Transformations And Angle Relationships",
    goal: "Use rigid motions, similarity, and angle relationships to reason about figures.",
    lessons: [
      {
        id: "grade-8-translation-coordinates",
        title: "Translate A Point",
        prompt:
          "Point A(2, 3) is translated 4 units right and 1 unit down. What is the new point?",
        correctAnswer: "(6, 2)",
        choices: ["(6, 2)", "(4, 4)", "(-2, 2)"],
        visualModel: "number_line",
        visualNumbers: [2, 4],
        examples: [
          {
            id: "grade-8-translation-coordinates-example-1",
            explanation: "A translation slides every point the same distance.",
            visualNumbers: [2, 3],
          },
          {
            id: "grade-8-translation-coordinates-example-2",
            explanation: "Move the x-coordinate 4 right: 2 + 4 = 6.",
            visualNumbers: [2, 4],
          },
          {
            id: "grade-8-translation-coordinates-example-3",
            explanation: "Move the y-coordinate 1 down: 3 - 1 = 2.",
            visualNumbers: [6, 2],
          },
        ],
      },
      {
        id: "grade-8-similar-triangles-scale-factor",
        title: "Find A Scale Factor",
        prompt:
          "A triangle side grows from 5 units to 15 units. What is the scale factor?",
        correctAnswer: "3",
        choices: ["2", "3", "10"],
        visualModel: "area_model",
        visualNumbers: [5, 3],
        examples: [
          {
            id: "grade-8-similar-triangles-scale-factor-example-1",
            explanation: "Similar figures keep the same shape but change size.",
            visualNumbers: [5, 15],
          },
          {
            id: "grade-8-similar-triangles-scale-factor-example-2",
            explanation: "Divide new length by original length: 15 / 5.",
            visualNumbers: [15, 5],
          },
          {
            id: "grade-8-similar-triangles-scale-factor-example-3",
            explanation: "15 divided by 5 equals 3.",
            visualNumbers: [3],
          },
        ],
      },
      {
        id: "grade-8-angle-sum-triangle",
        title: "Use Triangle Angle Sum",
        prompt:
          "A triangle has angles 35 degrees and 65 degrees. What is the third angle?",
        correctAnswer: "80 degrees",
        choices: ["70 degrees", "80 degrees", "100 degrees"],
        visualModel: "angle_model",
        visualNumbers: [35, 65],
        examples: [
          {
            id: "grade-8-angle-sum-triangle-example-1",
            explanation: "Angles in a triangle add to 180 degrees.",
            visualNumbers: [180],
          },
          {
            id: "grade-8-angle-sum-triangle-example-2",
            explanation: "35 + 65 equals 100.",
            visualNumbers: [35, 65],
          },
          {
            id: "grade-8-angle-sum-triangle-example-3",
            explanation: "180 - 100 equals 80 degrees.",
            visualNumbers: [80],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-pythagorean-volume",
    title: "Pythagorean Theorem And Volume",
    goal: "Apply the Pythagorean Theorem and volume formulas to solve geometry problems.",
    lessons: [
      {
        id: "grade-8-pythagorean-hypotenuse",
        title: "Find A Hypotenuse",
        prompt: "A right triangle has legs 6 and 8. What is the hypotenuse?",
        correctAnswer: "10",
        choices: ["10", "14", "100"],
        visualModel: "area_model",
        visualNumbers: [6, 8],
        examples: [
          {
            id: "grade-8-pythagorean-hypotenuse-example-1",
            explanation: "Use a^2 + b^2 = c^2 for a right triangle.",
            visualNumbers: [6, 8],
          },
          {
            id: "grade-8-pythagorean-hypotenuse-example-2",
            explanation: "6^2 + 8^2 equals 36 + 64 = 100.",
            visualNumbers: [36, 64],
          },
          {
            id: "grade-8-pythagorean-hypotenuse-example-3",
            explanation: "sqrt(100) is 10.",
            visualNumbers: [10],
          },
        ],
      },
      {
        id: "grade-8-distance-between-points",
        title: "Find Distance On A Coordinate Plane",
        prompt: "What is the distance between (1, 2) and (4, 6)?",
        correctAnswer: "5",
        choices: ["5", "7", "25"],
        visualModel: "number_line",
        visualNumbers: [1, 3],
        examples: [
          {
            id: "grade-8-distance-between-points-example-1",
            explanation: "The horizontal change is 3.",
            visualNumbers: [1, 3],
          },
          {
            id: "grade-8-distance-between-points-example-2",
            explanation: "The vertical change is 4.",
            visualNumbers: [2, 4],
          },
          {
            id: "grade-8-distance-between-points-example-3",
            explanation: "A 3-4-5 right triangle gives distance 5.",
            visualNumbers: [3, 4, 5],
          },
        ],
      },
      {
        id: "grade-8-volume-cylinder",
        title: "Find Cylinder Volume",
        prompt:
          "Using pi as 3.14, what is the volume of a cylinder with radius 3 and height 5?",
        correctAnswer: "141.3",
        choices: ["47.1", "94.2", "141.3"],
        visualModel: "measurement_conversion",
        visualNumbers: [28, 5, 140],
        examples: [
          {
            id: "grade-8-volume-cylinder-example-1",
            explanation: "Cylinder volume is pi x radius squared x height.",
            visualNumbers: [3, 5],
          },
          {
            id: "grade-8-volume-cylinder-example-2",
            explanation: "3.14 x 3 x 3 equals 28.26 for the base area.",
            visualNumbers: [28, 1],
          },
          {
            id: "grade-8-volume-cylinder-example-3",
            explanation: "28.26 x 5 equals 141.3.",
            visualNumbers: [28, 5, 141],
          },
        ],
      },
    ],
  },
  {
    id: "grade-8-bivariate-data",
    title: "Bivariate Data",
    goal: "Interpret scatter plots, linear models, and two-way tables to describe associations.",
    lessons: [
      {
        id: "grade-8-positive-association",
        title: "Identify Association In A Scatter Plot",
        prompt:
          "If larger study time usually matches larger test scores, what association is shown?",
        correctAnswer: "positive association",
        choices: [
          "positive association",
          "negative association",
          "no association",
        ],
        visualModel: "skip_count",
        visualNumbers: [1, 3, 5, 7, 9],
        examples: [
          {
            id: "grade-8-positive-association-example-1",
            explanation:
              "In a positive association, both quantities tend to increase together.",
            visualNumbers: [1, 3, 5, 7],
          },
          {
            id: "grade-8-positive-association-example-2",
            explanation:
              "More study time matching higher scores is an increasing pattern.",
            visualNumbers: [2, 4, 6, 8],
          },
          {
            id: "grade-8-positive-association-example-3",
            explanation: "That pattern is a positive association.",
            visualNumbers: [1, 3, 5, 7, 9],
          },
        ],
      },
      {
        id: "grade-8-linear-model-prediction",
        title: "Use A Linear Model",
        prompt: "A model says y = 2x + 5. What does it predict when x = 6?",
        correctAnswer: "17",
        choices: ["12", "17", "30"],
        visualModel: "skip_count",
        visualNumbers: [5, 7, 9, 11, 13, 15, 17],
        examples: [
          {
            id: "grade-8-linear-model-prediction-example-1",
            explanation: "Substitute x = 6 into the model.",
            visualNumbers: [6],
          },
          {
            id: "grade-8-linear-model-prediction-example-2",
            explanation: "2 x 6 + 5 equals 12 + 5.",
            visualNumbers: [12, 5],
          },
          {
            id: "grade-8-linear-model-prediction-example-3",
            explanation: "The prediction is 17.",
            visualNumbers: [17],
          },
        ],
      },
      {
        id: "grade-8-two-way-table-relative-frequency",
        title: "Interpret A Two-Way Table",
        prompt:
          "In a table, 18 out of 30 students who play an instrument also sing. What relative frequency is this?",
        correctAnswer: "60%",
        choices: ["30%", "60%", "90%"],
        visualModel: "fraction_bar",
        visualNumbers: [18, 30],
        examples: [
          {
            id: "grade-8-two-way-table-relative-frequency-example-1",
            explanation: "Relative frequency compares a part to a total.",
            visualNumbers: [18, 30],
          },
          {
            id: "grade-8-two-way-table-relative-frequency-example-2",
            explanation: "18 out of 30 is 18/30.",
            visualNumbers: [18, 30],
          },
          {
            id: "grade-8-two-way-table-relative-frequency-example-3",
            explanation: "18/30 equals 0.6, or 60%.",
            visualNumbers: [60, 100],
          },
        ],
      },
    ],
  },
];
