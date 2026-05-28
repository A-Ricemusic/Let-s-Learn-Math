import type { CurriculumSection } from "../src/features/lessons/types";

export const sixthGradeUnits: CurriculumSection[] = [
  {
    id: "grade-6-ratios-rates-percent",
    title: "Ratios, Rates, And Percent",
    goal: "Use ratio language, unit rates, and percent models to compare quantities.",
    lessons: [
      {
        id: "ratio-blue-orange-tiles",
        title: "Reason With Equivalent Ratios",
        prompt:
          "The ratio of blue tiles to orange tiles is 2 to 3. If there are 4 blue tiles, how many orange tiles are there?",
        correctAnswer: "6",
        choices: ["5", "6", "8"],
        visualModel: "object_groups",
        visualNumbers: [2, 3],
        examples: [
          {
            id: "ratio-blue-orange-tiles-example-1",
            explanation: "Start with 2 blue tiles for every 3 orange tiles.",
            visualNumbers: [2, 3],
          },
          {
            id: "ratio-blue-orange-tiles-example-2",
            explanation:
              "Doubling the blue tiles means doubling the orange tiles too.",
            visualNumbers: [4, 6],
          },
          {
            id: "ratio-blue-orange-tiles-example-3",
            explanation: "The equivalent ratio is 4 to 6.",
            visualNumbers: [4, 6],
          },
        ],
      },
      {
        id: "unit-rate-laps",
        title: "Find A Unit Rate",
        prompt:
          "A runner completes 24 laps in 6 days at the same pace. How many laps is that per day?",
        correctAnswer: "4",
        choices: ["3", "4", "6"],
        visualModel: "skip_count",
        visualNumbers: [4, 8, 12, 16, 20, 24],
        examples: [
          {
            id: "unit-rate-laps-example-1",
            explanation: "A unit rate tells how much for 1.",
            visualNumbers: [4],
          },
          {
            id: "unit-rate-laps-example-2",
            explanation: "Split 24 laps into 6 equal days.",
            visualNumbers: [4, 8, 12, 16, 20, 24],
          },
          {
            id: "unit-rate-laps-example-3",
            explanation: "Each day has 4 laps.",
            visualNumbers: [4],
          },
        ],
      },
      {
        id: "percent-of-eighty",
        title: "Find A Percent Of A Quantity",
        prompt: "What is 25% of 80?",
        correctAnswer: "20",
        choices: ["20", "25", "40"],
        visualModel: "decimal_grid",
        visualNumbers: [25],
        examples: [
          {
            id: "percent-of-eighty-example-1",
            explanation: "25% means one fourth of the whole.",
            visualNumbers: [25],
          },
          {
            id: "percent-of-eighty-example-2",
            explanation: "One fourth of 80 is 20.",
            visualNumbers: [25],
          },
          {
            id: "percent-of-eighty-example-3",
            explanation: "So 25% of 80 is 20.",
            visualNumbers: [25],
          },
        ],
      },
    ],
  },
  {
    id: "grade-6-fraction-decimal-operations",
    title: "Fraction And Decimal Operations",
    goal: "Divide fractions and compute with multi-digit decimals accurately.",
    lessons: [
      {
        id: "divide-three-by-half",
        title: "Divide By A Unit Fraction",
        prompt: "How many 1/2-size pieces are in 3 wholes?",
        correctAnswer: "6",
        choices: ["3", "6", "8"],
        visualModel: "fraction_bar",
        visualNumbers: [3, 1, 6, 2],
        examples: [
          {
            id: "divide-three-by-half-example-1",
            explanation: "Each whole has two 1/2-size pieces.",
            visualNumbers: [1, 1, 2, 2],
          },
          {
            id: "divide-three-by-half-example-2",
            explanation: "Three wholes have six half-size pieces.",
            visualNumbers: [3, 1, 6, 2],
          },
          {
            id: "divide-three-by-half-example-3",
            explanation: "3 divided by 1/2 equals 6.",
            visualNumbers: [3, 1, 6, 2],
          },
        ],
      },
      {
        id: "add-decimals-475-260",
        title: "Add Decimals",
        prompt: "What is 4.75 + 2.60?",
        correctAnswer: "7.35",
        choices: ["6.35", "7.35", "7.75"],
        visualModel: "number_line",
        visualNumbers: [4.75, 2.6],
        examples: [
          {
            id: "add-decimals-475-260-example-1",
            explanation: "Line up decimal points before adding.",
            visualNumbers: [4.75, 0],
          },
          {
            id: "add-decimals-475-260-example-2",
            explanation: "Add 2.60 to 4.75.",
            visualNumbers: [4.75, 2.6],
          },
          {
            id: "add-decimals-475-260-example-3",
            explanation: "The sum is 7.35.",
            visualNumbers: [7.35, 0],
          },
        ],
      },
      {
        id: "divide-decimals-72-09",
        title: "Divide Decimals",
        prompt: "What is 7.2 divided by 0.9?",
        correctAnswer: "8",
        choices: ["0.8", "8", "80"],
        visualModel: "skip_count",
        visualNumbers: [0.9, 1.8, 2.7, 3.6, 4.5, 5.4, 6.3, 7.2],
        examples: [
          {
            id: "divide-decimals-72-09-example-1",
            explanation: "Count groups of 0.9 until you reach 7.2.",
            visualNumbers: [0.9, 1.8, 2.7],
          },
          {
            id: "divide-decimals-72-09-example-2",
            explanation: "Eight groups of 0.9 make 7.2.",
            visualNumbers: [0.9, 1.8, 2.7, 3.6, 4.5, 5.4, 6.3, 7.2],
          },
          {
            id: "divide-decimals-72-09-example-3",
            explanation: "So 7.2 divided by 0.9 is 8.",
            visualNumbers: [8],
          },
        ],
      },
    ],
  },
  {
    id: "grade-6-rational-numbers",
    title: "Rational Numbers And Integers",
    goal: "Place positive and negative numbers on number lines and compare their values.",
    lessons: [
      {
        id: "compare-negative-three-negative-seven",
        title: "Compare Negative Integers",
        prompt: "Which integer is greater: -3 or -7?",
        correctAnswer: "-3",
        choices: ["-7", "-3", "0"],
        visualModel: "number_line",
        visualNumbers: [-7, 4],
        examples: [
          {
            id: "compare-negative-three-negative-seven-example-1",
            explanation: "Numbers farther right on a number line are greater.",
            visualNumbers: [-7, 0],
          },
          {
            id: "compare-negative-three-negative-seven-example-2",
            explanation: "-3 is 4 spaces to the right of -7.",
            visualNumbers: [-7, 4],
          },
          {
            id: "compare-negative-three-negative-seven-example-3",
            explanation: "So -3 is greater than -7.",
            visualNumbers: [-3, 0],
          },
        ],
      },
      {
        id: "absolute-value-negative-six",
        title: "Understand Absolute Value",
        prompt: "What is the absolute value of -6?",
        correctAnswer: "6",
        choices: ["-6", "0", "6"],
        visualModel: "number_line",
        visualNumbers: [-6, 6],
        examples: [
          {
            id: "absolute-value-negative-six-example-1",
            explanation: "Absolute value is distance from 0.",
            visualNumbers: [-6, 0],
          },
          {
            id: "absolute-value-negative-six-example-2",
            explanation: "-6 is 6 spaces from 0.",
            visualNumbers: [-6, 6],
          },
          {
            id: "absolute-value-negative-six-example-3",
            explanation: "The absolute value of -6 is 6.",
            visualNumbers: [6, 0],
          },
        ],
      },
      {
        id: "order-rational-numbers",
        title: "Order Rational Numbers",
        prompt: "Which number is least: -2, -0.5, or 1.5?",
        correctAnswer: "-2",
        choices: ["-2", "-0.5", "1.5"],
        visualModel: "skip_count",
        visualNumbers: [-2, -0.5, 1.5],
        examples: [
          {
            id: "order-rational-numbers-example-1",
            explanation: "Least means farthest left on the number line.",
            visualNumbers: [-2, -0.5, 1.5],
          },
          {
            id: "order-rational-numbers-example-2",
            explanation: "-2 is left of -0.5.",
            visualNumbers: [-2, -0.5],
          },
          {
            id: "order-rational-numbers-example-3",
            explanation: "The least number is -2.",
            visualNumbers: [-2],
          },
        ],
      },
    ],
  },
  {
    id: "grade-6-expressions-equations",
    title: "Expressions, Equations, And Inequalities",
    goal: "Evaluate expressions, solve one-step equations, and interpret inequalities.",
    lessons: [
      {
        id: "evaluate-three-x-plus-four",
        title: "Evaluate An Expression",
        prompt: "What is 3x + 4 when x = 5?",
        correctAnswer: "19",
        choices: ["15", "19", "24"],
        visualModel: "expression_cards",
        visualNumbers: [3, 5, 4, 19],
        examples: [
          {
            id: "evaluate-three-x-plus-four-example-1",
            explanation: "Replace x with 5.",
            visualNumbers: [3, 5],
          },
          {
            id: "evaluate-three-x-plus-four-example-2",
            explanation: "3 x 5 equals 15.",
            visualNumbers: [15],
          },
          {
            id: "evaluate-three-x-plus-four-example-3",
            explanation: "15 + 4 equals 19.",
            visualNumbers: [15, 4],
          },
        ],
      },
      {
        id: "solve-y-divided-by-four",
        title: "Solve A One-Step Equation",
        prompt: "Solve y / 4 = 6. What is y?",
        correctAnswer: "24",
        choices: ["10", "24", "32"],
        visualModel: "skip_count",
        visualNumbers: [4, 8, 12, 16, 20, 24],
        examples: [
          {
            id: "solve-y-divided-by-four-example-1",
            explanation: "Undo division by multiplying by 4.",
            visualNumbers: [4],
          },
          {
            id: "solve-y-divided-by-four-example-2",
            explanation: "6 groups of 4 make 24.",
            visualNumbers: [4, 8, 12, 16, 20, 24],
          },
          {
            id: "solve-y-divided-by-four-example-3",
            explanation: "So y equals 24.",
            visualNumbers: [24],
          },
        ],
      },
      {
        id: "solve-inequality-x-plus-five",
        title: "Interpret An Inequality",
        prompt: "Which values make x + 5 > 12 true?",
        correctAnswer: "x > 7",
        choices: ["x > 7", "x < 7", "x = 7"],
        visualModel: "number_line",
        visualNumbers: [7, 5],
        examples: [
          {
            id: "solve-inequality-x-plus-five-example-1",
            explanation: "Subtract 5 from both sides.",
            visualNumbers: [12, -5],
          },
          {
            id: "solve-inequality-x-plus-five-example-2",
            explanation: "12 - 5 equals 7.",
            visualNumbers: [12, -5],
          },
          {
            id: "solve-inequality-x-plus-five-example-3",
            explanation: "The solution is all numbers greater than 7.",
            visualNumbers: [7, 5],
          },
        ],
      },
    ],
  },
  {
    id: "grade-6-geometry-measurement",
    title: "Geometry And Measurement",
    goal: "Find area, surface area, and volume from measurements and formulas.",
    lessons: [
      {
        id: "area-triangle-eight-five",
        title: "Area Of A Triangle",
        prompt:
          "A triangle has base 8 units and height 5 units. What is its area?",
        correctAnswer: "20",
        choices: ["13", "20", "40"],
        visualModel: "shape_sort",
        visualNumbers: [8, 5],
        examples: [
          {
            id: "area-triangle-eight-five-example-1",
            explanation: "Triangle area is one half times base times height.",
            visualNumbers: [8, 5],
          },
          {
            id: "area-triangle-eight-five-example-2",
            explanation: "8 x 5 equals 40.",
            visualNumbers: [8, 5],
          },
          {
            id: "area-triangle-eight-five-example-3",
            explanation: "Half of 40 is 20 square units.",
            visualNumbers: [20],
          },
        ],
      },
      {
        id: "volume-prism-three-four-five",
        title: "Volume Of A Rectangular Prism",
        prompt:
          "A rectangular prism is 3 units by 4 units by 5 units. What is its volume?",
        correctAnswer: "60",
        choices: ["12", "47", "60"],
        visualModel: "volume_model",
        visualNumbers: [3, 4, 5],
        examples: [
          {
            id: "volume-prism-three-four-five-example-1",
            explanation: "Volume is length times width times height.",
            visualNumbers: [3, 4, 5],
          },
          {
            id: "volume-prism-three-four-five-example-2",
            explanation: "3 x 4 gives a base area of 12.",
            visualNumbers: [3, 4, 1],
          },
          {
            id: "volume-prism-three-four-five-example-3",
            explanation: "12 x 5 equals 60 cubic units.",
            visualNumbers: [3, 4, 5],
          },
        ],
      },
      {
        id: "surface-area-cube-four",
        title: "Surface Area Of A Cube",
        prompt: "A cube has side length 4 units. What is its surface area?",
        correctAnswer: "96",
        choices: ["16", "64", "96"],
        visualModel: "shape_sort",
        visualNumbers: [4],
        examples: [
          {
            id: "surface-area-cube-four-example-1",
            explanation: "Each face has area 4 x 4.",
            visualNumbers: [4],
          },
          {
            id: "surface-area-cube-four-example-2",
            explanation: "Each face has area 16 square units.",
            visualNumbers: [16],
          },
          {
            id: "surface-area-cube-four-example-3",
            explanation: "A cube has 6 faces, so 6 x 16 equals 96.",
            visualNumbers: [6, 16],
          },
        ],
      },
    ],
  },
  {
    id: "grade-6-statistics-data",
    title: "Statistics And Data",
    goal: "Describe data with center, spread, and displays.",
    lessons: [
      {
        id: "mean-four-six-eight-ten",
        title: "Find The Mean",
        prompt: "What is the mean of 4, 6, 8, and 10?",
        correctAnswer: "7",
        choices: ["6", "7", "8"],
        visualModel: "skip_count",
        visualNumbers: [4, 6, 8, 10],
        examples: [
          {
            id: "mean-four-six-eight-ten-example-1",
            explanation: "Add the data values.",
            visualNumbers: [4, 6, 8, 10],
          },
          {
            id: "mean-four-six-eight-ten-example-2",
            explanation: "4 + 6 + 8 + 10 equals 28.",
            visualNumbers: [28],
          },
          {
            id: "mean-four-six-eight-ten-example-3",
            explanation: "28 divided by 4 equals 7.",
            visualNumbers: [7],
          },
        ],
      },
      {
        id: "median-three-five-seven-eleven-fourteen",
        title: "Find The Median",
        prompt: "What is the median of 3, 5, 7, 11, and 14?",
        correctAnswer: "7",
        choices: ["5", "7", "11"],
        visualModel: "skip_count",
        visualNumbers: [3, 5, 7, 11, 14],
        examples: [
          {
            id: "median-three-five-seven-eleven-fourteen-example-1",
            explanation: "Put the data in order.",
            visualNumbers: [3, 5, 7, 11, 14],
          },
          {
            id: "median-three-five-seven-eleven-fourteen-example-2",
            explanation: "The median is the middle value.",
            visualNumbers: [5, 7, 11],
          },
          {
            id: "median-three-five-seven-eleven-fourteen-example-3",
            explanation: "The middle value is 7.",
            visualNumbers: [7],
          },
        ],
      },
      {
        id: "iqr-data-set",
        title: "Find The Interquartile Range",
        prompt:
          "A data set has Q1 = 4 and Q3 = 10. What is the interquartile range?",
        correctAnswer: "6",
        choices: ["4", "6", "10"],
        visualModel: "skip_count",
        visualNumbers: [2, 4, 5, 8, 10, 12],
        examples: [
          {
            id: "iqr-data-set-example-1",
            explanation: "The interquartile range is Q3 minus Q1.",
            visualNumbers: [4, 10],
          },
          {
            id: "iqr-data-set-example-2",
            explanation: "Subtract 4 from 10.",
            visualNumbers: [10, 4],
          },
          {
            id: "iqr-data-set-example-3",
            explanation: "The interquartile range is 6.",
            visualNumbers: [6],
          },
        ],
      },
    ],
  },
];
