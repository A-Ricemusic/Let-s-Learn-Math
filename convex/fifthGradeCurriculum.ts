import type { CurriculumSection } from "../src/features/lessons/types";

export const fifthGradeUnits: CurriculumSection[] = [
  {
    id: "grade-5-decimal-place-value",
    title: "Decimal Place Value",
    goal: "Read, compare, and shift decimals using place value patterns.",
    lessons: [
      {
        id: "grade-5-decimal-times-ten",
        title: "Multiply decimals by 10",
        prompt: "0.6 x 10 = ?",
        correctAnswer: "6",
        choices: ["0.06", "6", "60"],
        visualModel: "expression_cards",
        visualNumbers: [0.6, 1, 10],
        examples: [
          {
            id: "grade-5-decimal-times-ten-example-1",
            explanation: "0.6 means 6 tenths.",
            visualNumbers: [0.6],
          },
          {
            id: "grade-5-decimal-times-ten-example-2",
            explanation: "Multiplying by 10 makes each tenth into one whole.",
            visualNumbers: [0.6, 1, 10],
          },
          {
            id: "grade-5-decimal-times-ten-example-3",
            explanation: "Ten groups of 0.6 make 6.",
            visualNumbers: [6],
          },
        ],
      },
      {
        id: "grade-5-decimal-divide-ten",
        title: "Divide decimals by 10",
        prompt: "4.8 / 10 = ?",
        correctAnswer: "0.48",
        choices: ["0.48", "4.08", "48"],
        visualModel: "expression_cards",
        visualNumbers: [4.8, 2, 10],
        examples: [
          {
            id: "grade-5-decimal-divide-ten-example-1",
            explanation: "4.8 has 4 ones and 8 tenths.",
            visualNumbers: [4.8],
          },
          {
            id: "grade-5-decimal-divide-ten-example-2",
            explanation:
              "Dividing by 10 makes each place worth one tenth as much.",
            visualNumbers: [4.8, 2, 10],
          },
          {
            id: "grade-5-decimal-divide-ten-example-3",
            explanation: "4.8 divided by 10 equals 0.48.",
            visualNumbers: [0.48],
          },
        ],
      },
      {
        id: "grade-5-compare-decimals",
        title: "Compare decimals to hundredths",
        prompt: "Which is greatest: 0.62, 0.7, or 0.58?",
        correctAnswer: "0.7",
        choices: ["0.62", "0.7", "0.58"],
        visualModel: "decimal_grid",
        visualNumbers: [70],
        examples: [
          {
            id: "grade-5-compare-decimals-example-1",
            explanation: "0.62 is 62 hundredths.",
            visualNumbers: [62],
          },
          {
            id: "grade-5-compare-decimals-example-2",
            explanation: "0.7 is the same as 0.70, or 70 hundredths.",
            visualNumbers: [70],
          },
          {
            id: "grade-5-compare-decimals-example-3",
            explanation:
              "70 hundredths is greater than 62 hundredths and 58 hundredths.",
            visualNumbers: [70],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-whole-number-operations",
    title: "Whole Number Multiplication And Division",
    goal: "Use standard algorithms and place value to multiply and divide multi-digit whole numbers.",
    lessons: [
      {
        id: "grade-5-multiply-by-one-digit",
        title: "Multiply by a one-digit number",
        prompt: "423 x 6 = ?",
        correctAnswer: "2538",
        choices: ["2468", "2538", "2638"],
        visualModel: "expression_cards",
        visualNumbers: [423, 1, 6],
        examples: [
          {
            id: "grade-5-multiply-by-one-digit-example-1",
            explanation: "Break 423 into 400 + 20 + 3.",
            visualNumbers: [400, 3, 20, 3, 3],
          },
          {
            id: "grade-5-multiply-by-one-digit-example-2",
            explanation: "Multiply each place by 6: 2400, 120, and 18.",
            visualNumbers: [2400, 3, 120, 3, 18],
          },
          {
            id: "grade-5-multiply-by-one-digit-example-3",
            explanation: "Add the partial products to get 2538.",
            visualNumbers: [2400, 3, 120, 3, 18, 5, 2538],
          },
        ],
      },
      {
        id: "grade-5-multiply-two-digit",
        title: "Multiply two two-digit numbers",
        prompt: "48 x 32 = ?",
        correctAnswer: "1536",
        choices: ["1436", "1536", "1632"],
        visualModel: "expression_cards",
        visualNumbers: [48, 1, 32],
        examples: [
          {
            id: "grade-5-multiply-two-digit-example-1",
            explanation: "Think of 32 as 30 + 2.",
            visualNumbers: [30, 3, 2],
          },
          {
            id: "grade-5-multiply-two-digit-example-2",
            explanation: "48 x 30 = 1440 and 48 x 2 = 96.",
            visualNumbers: [1440, 3, 96],
          },
          {
            id: "grade-5-multiply-two-digit-example-3",
            explanation: "1440 + 96 = 1536.",
            visualNumbers: [1440, 3, 96, 5, 1536],
          },
        ],
      },
      {
        id: "grade-5-divide-two-digit-divisor",
        title: "Divide by a two-digit number",
        prompt: "936 / 12 = ?",
        correctAnswer: "78",
        choices: ["68", "78", "86"],
        visualModel: "expression_cards",
        visualNumbers: [936, 2, 12],
        examples: [
          {
            id: "grade-5-divide-two-digit-divisor-example-1",
            explanation: "12 x 70 = 840.",
            visualNumbers: [12, 1, 70, 5, 840],
          },
          {
            id: "grade-5-divide-two-digit-divisor-example-2",
            explanation: "936 - 840 leaves 96.",
            visualNumbers: [936, 4, 840, 5, 96],
          },
          {
            id: "grade-5-divide-two-digit-divisor-example-3",
            explanation: "12 x 8 = 96, so 936 / 12 = 78.",
            visualNumbers: [70, 3, 8, 5, 78],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-decimal-operations",
    title: "Decimal Operations",
    goal: "Add, subtract, multiply, and divide decimals to hundredths.",
    lessons: [
      {
        id: "grade-5-add-decimals",
        title: "Add decimals",
        prompt: "3.45 + 2.6 = ?",
        correctAnswer: "6.05",
        choices: ["5.51", "6.05", "6.45"],
        visualModel: "expression_cards",
        visualNumbers: [3.45, 3, 2.6],
        examples: [
          {
            id: "grade-5-add-decimals-example-1",
            explanation: "Write 2.6 as 2.60 so hundredths line up.",
            visualNumbers: [2.6, 5, 2.6],
          },
          {
            id: "grade-5-add-decimals-example-2",
            explanation: "Add hundredths, tenths, then ones.",
            visualNumbers: [3.45, 3, 2.6],
          },
          {
            id: "grade-5-add-decimals-example-3",
            explanation: "3.45 + 2.60 = 6.05.",
            visualNumbers: [3.45, 3, 2.6, 5, 6.05],
          },
        ],
      },
      {
        id: "grade-5-subtract-decimals",
        title: "Subtract decimals",
        prompt: "8.2 - 3.47 = ?",
        correctAnswer: "4.73",
        choices: ["4.73", "5.27", "4.83"],
        visualModel: "expression_cards",
        visualNumbers: [8.2, 4, 3.47],
        examples: [
          {
            id: "grade-5-subtract-decimals-example-1",
            explanation: "Write 8.2 as 8.20 so the places line up.",
            visualNumbers: [8.2, 5, 8.2],
          },
          {
            id: "grade-5-subtract-decimals-example-2",
            explanation: "Subtract hundredths, tenths, then ones.",
            visualNumbers: [8.2, 4, 3.47],
          },
          {
            id: "grade-5-subtract-decimals-example-3",
            explanation: "8.20 - 3.47 = 4.73.",
            visualNumbers: [8.2, 4, 3.47, 5, 4.73],
          },
        ],
      },
      {
        id: "grade-5-multiply-decimals",
        title: "Multiply decimals",
        prompt: "1.2 x 0.4 = ?",
        correctAnswer: "0.48",
        choices: ["0.048", "0.48", "4.8"],
        visualModel: "decimal_grid",
        visualNumbers: [48],
        examples: [
          {
            id: "grade-5-multiply-decimals-example-1",
            explanation: "1.2 x 0.4 has one decimal place in each factor.",
            visualNumbers: [12],
          },
          {
            id: "grade-5-multiply-decimals-example-2",
            explanation: "12 x 4 = 48.",
            visualNumbers: [48],
          },
          {
            id: "grade-5-multiply-decimals-example-3",
            explanation: "Two decimal places in the factors means 0.48.",
            visualNumbers: [48],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-fraction-addition",
    title: "Add And Subtract Fractions",
    goal: "Use equivalent fractions to add and subtract fractions with unlike denominators.",
    lessons: [
      {
        id: "grade-5-add-unlike-fractions",
        title: "Add unlike fractions",
        prompt: "1/2 + 1/3 = ?",
        correctAnswer: "5/6",
        choices: ["2/5", "5/6", "2/6"],
        visualModel: "fraction_bar",
        visualNumbers: [1, 2, 1, 3],
        examples: [
          {
            id: "grade-5-add-unlike-fractions-example-1",
            explanation: "Rename 1/2 as 3/6.",
            visualNumbers: [3, 6],
          },
          {
            id: "grade-5-add-unlike-fractions-example-2",
            explanation: "Rename 1/3 as 2/6.",
            visualNumbers: [2, 6],
          },
          {
            id: "grade-5-add-unlike-fractions-example-3",
            explanation: "3/6 + 2/6 = 5/6.",
            visualNumbers: [5, 6],
          },
        ],
      },
      {
        id: "grade-5-subtract-mixed-number",
        title: "Subtract from a mixed number",
        prompt: "2 1/4 - 1/2 = ?",
        correctAnswer: "1 3/4",
        choices: ["1 1/4", "1 3/4", "2 3/4"],
        visualModel: "fraction_bar",
        visualNumbers: [1, 4, 1, 2],
        examples: [
          {
            id: "grade-5-subtract-mixed-number-example-1",
            explanation: "Rename 1/2 as 2/4.",
            visualNumbers: [2, 4],
          },
          {
            id: "grade-5-subtract-mixed-number-example-2",
            explanation: "2 1/4 needs regrouping before subtracting 2/4.",
            visualNumbers: [1, 4],
          },
          {
            id: "grade-5-subtract-mixed-number-example-3",
            explanation: "After regrouping, the difference is 1 3/4.",
            visualNumbers: [3, 4],
          },
        ],
      },
      {
        id: "grade-5-fraction-word-problem",
        title: "Fraction word problems",
        prompt:
          "A walk is 3/4 mile on Monday and 2/3 mile on Tuesday. How far is that altogether?",
        correctAnswer: "1 5/12 miles",
        choices: ["5/7 mile", "1 5/12 miles", "1 1/12 miles"],
        visualModel: "fraction_bar",
        visualNumbers: [3, 4, 2, 3],
        examples: [
          {
            id: "grade-5-fraction-word-problem-example-1",
            explanation: "Rename 3/4 as 9/12.",
            visualNumbers: [9, 12],
          },
          {
            id: "grade-5-fraction-word-problem-example-2",
            explanation: "Rename 2/3 as 8/12.",
            visualNumbers: [8, 12],
          },
          {
            id: "grade-5-fraction-word-problem-example-3",
            explanation: "9/12 + 8/12 = 17/12, or 1 5/12.",
            visualNumbers: [5, 12],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-fraction-multiplication",
    title: "Multiply Fractions",
    goal: "Use area models and scaling to multiply fractions and whole numbers.",
    lessons: [
      {
        id: "grade-5-multiply-two-fractions",
        title: "Multiply two fractions",
        prompt: "2/3 x 3/4 = ?",
        correctAnswer: "1/2",
        choices: ["5/7", "1/2", "6/7"],
        visualModel: "area_model",
        visualNumbers: [2, 3, 3, 4],
        examples: [
          {
            id: "grade-5-multiply-two-fractions-example-1",
            explanation: "Make thirds in one direction.",
            visualNumbers: [2, 3, 0, 4],
          },
          {
            id: "grade-5-multiply-two-fractions-example-2",
            explanation: "Make fourths in the other direction.",
            visualNumbers: [2, 3, 3, 4],
          },
          {
            id: "grade-5-multiply-two-fractions-example-3",
            explanation: "The overlap is 6 of 12 parts, which is 1/2.",
            visualNumbers: [2, 3, 3, 4],
          },
        ],
      },
      {
        id: "grade-5-whole-number-times-fraction",
        title: "Whole number times a fraction",
        prompt: "5 x 3/8 = ?",
        correctAnswer: "1 7/8",
        choices: ["8/13", "1 7/8", "15/40"],
        visualModel: "fraction_bar",
        visualNumbers: [3, 8],
        examples: [
          {
            id: "grade-5-whole-number-times-fraction-example-1",
            explanation: "5 x 3/8 means 5 groups of 3/8.",
            visualNumbers: [3, 8],
          },
          {
            id: "grade-5-whole-number-times-fraction-example-2",
            explanation: "5 groups of 3 eighths makes 15 eighths.",
            visualNumbers: [7, 8],
          },
          {
            id: "grade-5-whole-number-times-fraction-example-3",
            explanation: "15/8 is 1 7/8.",
            visualNumbers: [7, 8],
          },
        ],
      },
      {
        id: "grade-5-fraction-area",
        title: "Fraction area",
        prompt: "A rectangle is 1/2 yard by 3/5 yard. What is the area?",
        correctAnswer: "3/10 square yard",
        choices: ["4/7 square yard", "3/10 square yard", "3/5 square yard"],
        visualModel: "area_model",
        visualNumbers: [1, 2, 3, 5],
        examples: [
          {
            id: "grade-5-fraction-area-example-1",
            explanation: "Split one side into halves.",
            visualNumbers: [1, 2, 0, 5],
          },
          {
            id: "grade-5-fraction-area-example-2",
            explanation: "Split the other side into fifths.",
            visualNumbers: [1, 2, 3, 5],
          },
          {
            id: "grade-5-fraction-area-example-3",
            explanation: "The overlap is 3 of 10 equal parts.",
            visualNumbers: [1, 2, 3, 5],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-fraction-division",
    title: "Divide With Unit Fractions",
    goal: "Divide unit fractions by whole numbers and whole numbers by unit fractions.",
    lessons: [
      {
        id: "grade-5-unit-fraction-divided-by-whole",
        title: "Unit fraction divided by a whole number",
        prompt: "1/3 / 4 = ?",
        correctAnswer: "1/12",
        choices: ["4/3", "1/7", "1/12"],
        visualModel: "fraction_bar",
        visualNumbers: [1, 3],
        examples: [
          {
            id: "grade-5-unit-fraction-divided-by-whole-example-1",
            explanation: "Start with one third.",
            visualNumbers: [1, 3],
          },
          {
            id: "grade-5-unit-fraction-divided-by-whole-example-2",
            explanation: "Split that third into 4 equal pieces.",
            visualNumbers: [1, 12],
          },
          {
            id: "grade-5-unit-fraction-divided-by-whole-example-3",
            explanation: "Each piece is 1/12 of the whole.",
            visualNumbers: [1, 12],
          },
        ],
      },
      {
        id: "grade-5-whole-divided-by-unit-fraction",
        title: "Whole number divided by a unit fraction",
        prompt: "6 / 1/3 = ?",
        correctAnswer: "18",
        choices: ["2", "9", "18"],
        visualModel: "fraction_bar",
        visualNumbers: [6, 1, 1, 3],
        examples: [
          {
            id: "grade-5-whole-divided-by-unit-fraction-example-1",
            explanation: "Ask how many one-thirds fit in 6 wholes.",
            visualNumbers: [1, 3],
          },
          {
            id: "grade-5-whole-divided-by-unit-fraction-example-2",
            explanation: "Each whole has 3 one-third pieces.",
            visualNumbers: [6, 1, 1, 3],
          },
          {
            id: "grade-5-whole-divided-by-unit-fraction-example-3",
            explanation: "6 wholes have 18 one-third pieces.",
            visualNumbers: [18, 3],
          },
        ],
      },
      {
        id: "grade-5-unit-fraction-halved",
        title: "Split a unit fraction in half",
        prompt: "1/5 / 2 = ?",
        correctAnswer: "1/10",
        choices: ["1/10", "2/5", "1/7"],
        visualModel: "fraction_bar",
        visualNumbers: [1, 5],
        examples: [
          {
            id: "grade-5-unit-fraction-halved-example-1",
            explanation: "Start with one fifth.",
            visualNumbers: [1, 5],
          },
          {
            id: "grade-5-unit-fraction-halved-example-2",
            explanation: "Cut that fifth into 2 equal parts.",
            visualNumbers: [1, 10],
          },
          {
            id: "grade-5-unit-fraction-halved-example-3",
            explanation: "Each half is 1/10 of the whole.",
            visualNumbers: [1, 10],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-measurement-volume",
    title: "Measurement Conversion And Volume",
    goal: "Convert measurement units and use multiplication to find volume.",
    lessons: [
      {
        id: "grade-5-convert-meters-centimeters",
        title: "Convert metric units",
        prompt: "5 meters = ? centimeters",
        correctAnswer: "500 centimeters",
        choices: ["50 centimeters", "500 centimeters", "5000 centimeters"],
        visualModel: "measurement_conversion",
        visualNumbers: [5, 100, 500],
        examples: [
          {
            id: "grade-5-convert-meters-centimeters-example-1",
            explanation: "1 meter equals 100 centimeters.",
            visualNumbers: [1, 100, 100],
          },
          {
            id: "grade-5-convert-meters-centimeters-example-2",
            explanation: "Multiply meters by 100 to get centimeters.",
            visualNumbers: [5, 100, 500],
          },
          {
            id: "grade-5-convert-meters-centimeters-example-3",
            explanation: "5 meters equals 500 centimeters.",
            visualNumbers: [5, 100, 500],
          },
        ],
      },
      {
        id: "grade-5-rectangular-prism-volume",
        title: "Volume of a rectangular prism",
        prompt:
          "A prism is 4 units long, 3 units wide, and 2 units high. What is the volume?",
        correctAnswer: "24 cubic units",
        choices: ["9 cubic units", "24 cubic units", "32 cubic units"],
        visualModel: "volume_model",
        visualNumbers: [4, 3, 2],
        examples: [
          {
            id: "grade-5-rectangular-prism-volume-example-1",
            explanation: "The base has 4 x 3, or 12, unit cubes.",
            visualNumbers: [4, 3, 1],
          },
          {
            id: "grade-5-rectangular-prism-volume-example-2",
            explanation: "There are 2 layers.",
            visualNumbers: [4, 3, 2],
          },
          {
            id: "grade-5-rectangular-prism-volume-example-3",
            explanation:
              "12 cubes per layer for 2 layers makes 24 cubic units.",
            visualNumbers: [4, 3, 2],
          },
        ],
      },
      {
        id: "grade-5-composite-volume",
        title: "Add volumes",
        prompt:
          "One prism is 3 x 3 x 2 and another is 2 x 3 x 2. What is the total volume?",
        correctAnswer: "30 cubic units",
        choices: ["18 cubic units", "30 cubic units", "36 cubic units"],
        visualModel: "volume_model",
        visualNumbers: [5, 3, 2],
        examples: [
          {
            id: "grade-5-composite-volume-example-1",
            explanation: "3 x 3 x 2 = 18 cubic units.",
            visualNumbers: [3, 3, 2],
          },
          {
            id: "grade-5-composite-volume-example-2",
            explanation: "2 x 3 x 2 = 12 cubic units.",
            visualNumbers: [2, 3, 2],
          },
          {
            id: "grade-5-composite-volume-example-3",
            explanation: "18 + 12 = 30 cubic units.",
            visualNumbers: [5, 3, 2],
          },
        ],
      },
    ],
  },
  {
    id: "grade-5-coordinate-geometry",
    title: "Coordinate Plane And Geometry",
    goal: "Graph points in the first quadrant and classify shapes by their attributes.",
    lessons: [
      {
        id: "grade-5-read-coordinate",
        title: "Read ordered pairs",
        prompt: "In the point (4, 3), what is the x-coordinate?",
        correctAnswer: "4",
        choices: ["3", "4", "7"],
        visualModel: "coordinate_plane",
        visualNumbers: [4, 3],
        examples: [
          {
            id: "grade-5-read-coordinate-example-1",
            explanation: "Start at the origin.",
            visualNumbers: [0, 0],
          },
          {
            id: "grade-5-read-coordinate-example-2",
            explanation: "Move 4 units right for the x-coordinate.",
            visualNumbers: [4, 0],
          },
          {
            id: "grade-5-read-coordinate-example-3",
            explanation: "Move 3 units up for the y-coordinate.",
            visualNumbers: [4, 3],
          },
        ],
      },
      {
        id: "grade-5-move-on-coordinate-plane",
        title: "Move on the coordinate plane",
        prompt: "Point A is (2, 5). Move 2 units right. What is the new point?",
        correctAnswer: "(4, 5)",
        choices: ["(2, 7)", "(4, 5)", "(5, 4)"],
        visualModel: "coordinate_plane",
        visualNumbers: [2, 5],
        examples: [
          {
            id: "grade-5-move-on-coordinate-plane-example-1",
            explanation: "Point A starts at (2, 5).",
            visualNumbers: [2, 5],
          },
          {
            id: "grade-5-move-on-coordinate-plane-example-2",
            explanation: "Moving right changes the x-coordinate.",
            visualNumbers: [4, 5],
          },
          {
            id: "grade-5-move-on-coordinate-plane-example-3",
            explanation: "The new point is (4, 5).",
            visualNumbers: [4, 5],
          },
        ],
      },
      {
        id: "grade-5-classify-quadrilateral",
        title: "Classify quadrilaterals",
        prompt: "A shape has 4 equal sides and 4 right angles. What is it?",
        correctAnswer: "square",
        choices: ["rhombus", "square", "trapezoid"],
        visualModel: "shape_sort",
        visualNumbers: [4],
        examples: [
          {
            id: "grade-5-classify-quadrilateral-example-1",
            explanation: "A quadrilateral has 4 sides.",
            visualNumbers: [4],
          },
          {
            id: "grade-5-classify-quadrilateral-example-2",
            explanation: "A rectangle has 4 right angles.",
            visualNumbers: [4],
          },
          {
            id: "grade-5-classify-quadrilateral-example-3",
            explanation: "A square has 4 equal sides and 4 right angles.",
            visualNumbers: [4],
          },
        ],
      },
    ],
  },
] satisfies CurriculumSection[];
