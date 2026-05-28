import type { CurriculumSection } from "../src/features/lessons/types";

export const fourthGradeUnits: CurriculumSection[] = [
  {
    id: "grade-4-place-value",
    title: "Place Value To 1,000,000",
    goal: "Read, compare, and round multi-digit whole numbers.",
    lessons: [
      {
        id: "grade-4-ten-times-place-value",
        title: "Ten Times As Much",
        prompt:
          "In 50,000 and 5,000, how many times greater is the value of the 5 in 50,000?",
        correctAnswer: "10 times",
        choices: ["5 times", "10 times", "100 times"],
        visualModel: "place_value_chart",
        visualNumbers: [50000, 4],
        examples: [
          {
            id: "grade-4-ten-times-place-value-example-1",
            explanation: "In 5,000, the 5 is in the thousands place.",
            visualNumbers: [5000, 3],
          },
          {
            id: "grade-4-ten-times-place-value-example-2",
            explanation:
              "Move one place left to 50,000. The value is 10 times as large.",
            visualNumbers: [50000, 4],
          },
          {
            id: "grade-4-ten-times-place-value-example-3",
            explanation: "Each move left multiplies the place value by 10.",
            visualNumbers: [500000, 5],
          },
        ],
      },
      {
        id: "grade-4-expanded-form-407135",
        title: "Expanded Form",
        prompt: "Which expanded form matches 407,135?",
        correctAnswer: "400,000 + 7,000 + 100 + 30 + 5",
        choices: [
          "400,000 + 7,000 + 100 + 30 + 5",
          "40,000 + 7,000 + 100 + 30 + 5",
          "400,000 + 70,000 + 100 + 30 + 5",
        ],
        visualModel: "place_value_chart",
        visualNumbers: [407135],
        examples: [
          {
            id: "grade-4-expanded-form-407135-example-1",
            explanation: "407,135 has 4 hundred-thousands.",
            visualNumbers: [407135, 5],
          },
          {
            id: "grade-4-expanded-form-407135-example-2",
            explanation: "The zero means there are no ten-thousands.",
            visualNumbers: [407135, 4],
          },
          {
            id: "grade-4-expanded-form-407135-example-3",
            explanation:
              "Add the value of each nonzero digit to write expanded form.",
            visualNumbers: [407135],
          },
        ],
      },
      {
        id: "grade-4-round-to-nearest-thousand",
        title: "Round To The Nearest Thousand",
        prompt: "Round 38,642 to the nearest thousand.",
        correctAnswer: "39,000",
        choices: ["38,000", "39,000", "40,000"],
        visualModel: "place_value_chart",
        visualNumbers: [38642, 3],
        examples: [
          {
            id: "grade-4-round-to-nearest-thousand-example-1",
            explanation: "Find the thousands place in 38,642.",
            visualNumbers: [38642, 3],
          },
          {
            id: "grade-4-round-to-nearest-thousand-example-2",
            explanation: "The hundreds digit is 6, so round up.",
            visualNumbers: [38642, 2],
          },
          {
            id: "grade-4-round-to-nearest-thousand-example-3",
            explanation: "38,642 rounds to 39,000.",
            visualNumbers: [39000, 3],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-add-subtract",
    title: "Multi-Digit Addition And Subtraction",
    goal: "Use place value and the standard algorithm with multi-digit numbers.",
    lessons: [
      {
        id: "grade-4-add-48375-26489",
        title: "Add Multi-Digit Numbers",
        prompt: "48,375 + 26,489 = ?",
        correctAnswer: "74,864",
        choices: ["64,864", "74,864", "75,764"],
        visualModel: "place_value_chart",
        visualNumbers: [74864],
        examples: [
          {
            id: "grade-4-add-48375-26489-example-1",
            explanation: "Add ones, tens, hundreds, thousands, then regroup.",
            visualNumbers: [48375],
          },
          {
            id: "grade-4-add-48375-26489-example-2",
            explanation:
              "26,489 adds more thousands, hundreds, tens, and ones.",
            visualNumbers: [26489],
          },
          {
            id: "grade-4-add-48375-26489-example-3",
            explanation: "The sum is 74,864.",
            visualNumbers: [74864],
          },
        ],
      },
      {
        id: "grade-4-subtract-63204-18756",
        title: "Subtract With Regrouping",
        prompt: "63,204 - 18,756 = ?",
        correctAnswer: "44,448",
        choices: ["44,448", "45,552", "54,448"],
        visualModel: "place_value_chart",
        visualNumbers: [44448],
        examples: [
          {
            id: "grade-4-subtract-63204-18756-example-1",
            explanation: "Start with 63,204.",
            visualNumbers: [63204],
          },
          {
            id: "grade-4-subtract-63204-18756-example-2",
            explanation:
              "Regroup when a place does not have enough to subtract.",
            visualNumbers: [18756],
          },
          {
            id: "grade-4-subtract-63204-18756-example-3",
            explanation: "The difference is 44,448.",
            visualNumbers: [44448],
          },
        ],
      },
      {
        id: "grade-4-estimate-sum",
        title: "Estimate With Rounding",
        prompt:
          "Estimate 5,874 + 2,912 by rounding each number to the nearest thousand.",
        correctAnswer: "9,000",
        choices: ["8,000", "9,000", "10,000"],
        visualModel: "place_value_chart",
        visualNumbers: [9000],
        examples: [
          {
            id: "grade-4-estimate-sum-example-1",
            explanation: "5,874 rounds to 6,000.",
            visualNumbers: [6000, 3],
          },
          {
            id: "grade-4-estimate-sum-example-2",
            explanation: "2,912 rounds to 3,000.",
            visualNumbers: [3000, 3],
          },
          {
            id: "grade-4-estimate-sum-example-3",
            explanation: "6,000 + 3,000 = 9,000.",
            visualNumbers: [9000, 3],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-multiplication",
    title: "Multiplication With Area Models",
    goal: "Multiply larger numbers by decomposing them into easier parts.",
    lessons: [
      {
        id: "grade-4-multiply-23-by-4",
        title: "Multiply A Two-Digit Number",
        prompt: "23 x 4 = ?",
        correctAnswer: "92",
        choices: ["82", "92", "102"],
        visualModel: "area_model",
        visualNumbers: [20, 3, 4],
        examples: [
          {
            id: "grade-4-multiply-23-by-4-example-1",
            explanation: "Break 23 into 20 and 3.",
            visualNumbers: [20, 3, 4],
          },
          {
            id: "grade-4-multiply-23-by-4-example-2",
            explanation: "20 x 4 = 80 and 3 x 4 = 12.",
            visualNumbers: [20, 3, 4],
          },
          {
            id: "grade-4-multiply-23-by-4-example-3",
            explanation: "80 + 12 = 92.",
            visualNumbers: [20, 3, 4],
          },
        ],
      },
      {
        id: "grade-4-multiply-34-by-12",
        title: "Multiply Two Two-Digit Numbers",
        prompt: "34 x 12 = ?",
        correctAnswer: "408",
        choices: ["398", "408", "418"],
        visualModel: "area_model",
        visualNumbers: [30, 4, 12],
        examples: [
          {
            id: "grade-4-multiply-34-by-12-example-1",
            explanation: "Break 34 into 30 and 4.",
            visualNumbers: [30, 4, 12],
          },
          {
            id: "grade-4-multiply-34-by-12-example-2",
            explanation: "30 x 12 = 360 and 4 x 12 = 48.",
            visualNumbers: [30, 4, 12],
          },
          {
            id: "grade-4-multiply-34-by-12-example-3",
            explanation: "360 + 48 = 408.",
            visualNumbers: [30, 4, 12],
          },
        ],
      },
      {
        id: "grade-4-array-word-problem",
        title: "Multiplication Word Problems",
        prompt:
          "A garden has 18 rows with 6 plants in each row. How many plants?",
        correctAnswer: "108",
        choices: ["96", "108", "116"],
        visualModel: "area_model",
        visualNumbers: [10, 8, 6],
        examples: [
          {
            id: "grade-4-array-word-problem-example-1",
            explanation: "18 rows can be split into 10 rows and 8 rows.",
            visualNumbers: [10, 8, 6],
          },
          {
            id: "grade-4-array-word-problem-example-2",
            explanation: "10 x 6 = 60 and 8 x 6 = 48.",
            visualNumbers: [10, 8, 6],
          },
          {
            id: "grade-4-array-word-problem-example-3",
            explanation: "60 + 48 = 108 plants.",
            visualNumbers: [10, 8, 6],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-division",
    title: "Division And Remainders",
    goal: "Divide whole numbers and decide what the remainder means.",
    lessons: [
      {
        id: "grade-4-divide-156-by-7",
        title: "Divide With A Remainder",
        prompt: "156 divided by 7 = ?",
        correctAnswer: "22 R2",
        choices: ["21 R9", "22 R2", "23 R5"],
        visualModel: "division_model",
        visualNumbers: [156, 7, 22, 2],
        examples: [
          {
            id: "grade-4-divide-156-by-7-example-1",
            explanation: "7 groups of 20 use 140.",
            visualNumbers: [156, 7, 20, 16],
          },
          {
            id: "grade-4-divide-156-by-7-example-2",
            explanation: "7 groups of 22 use 154.",
            visualNumbers: [156, 7, 22, 2],
          },
          {
            id: "grade-4-divide-156-by-7-example-3",
            explanation: "2 are left over, so the answer is 22 R2.",
            visualNumbers: [156, 7, 22, 2],
          },
        ],
      },
      {
        id: "grade-4-divide-245-by-5",
        title: "Divide Without A Remainder",
        prompt: "245 divided by 5 = ?",
        correctAnswer: "49",
        choices: ["45", "49", "52"],
        visualModel: "division_model",
        visualNumbers: [245, 5, 49, 0],
        examples: [
          {
            id: "grade-4-divide-245-by-5-example-1",
            explanation: "5 groups of 40 use 200.",
            visualNumbers: [245, 5, 40, 45],
          },
          {
            id: "grade-4-divide-245-by-5-example-2",
            explanation: "5 groups of 9 use the remaining 45.",
            visualNumbers: [245, 5, 49, 0],
          },
          {
            id: "grade-4-divide-245-by-5-example-3",
            explanation: "There is no remainder, so 245 divided by 5 is 49.",
            visualNumbers: [245, 5, 49, 0],
          },
        ],
      },
      {
        id: "grade-4-interpret-remainder-vans",
        title: "Interpret The Remainder",
        prompt:
          "42 students ride in vans that hold 8 students each. How many vans are needed?",
        correctAnswer: "6 vans",
        choices: ["5 vans", "6 vans", "7 vans"],
        visualModel: "division_model",
        visualNumbers: [42, 8, 5, 2],
        examples: [
          {
            id: "grade-4-interpret-remainder-vans-example-1",
            explanation: "5 full vans hold 40 students.",
            visualNumbers: [42, 8, 5, 2],
          },
          {
            id: "grade-4-interpret-remainder-vans-example-2",
            explanation: "2 students still need seats.",
            visualNumbers: [42, 8, 5, 2],
          },
          {
            id: "grade-4-interpret-remainder-vans-example-3",
            explanation: "One more van is needed, so the answer is 6 vans.",
            visualNumbers: [42, 8, 6, 0],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-factors-patterns",
    title: "Factors, Multiples, And Patterns",
    goal: "Find factor pairs, multiples, and number patterns.",
    lessons: [
      {
        id: "grade-4-factor-pair-36",
        title: "Factor Pairs",
        prompt: "Which pair is a factor pair for 36?",
        correctAnswer: "4 x 9",
        choices: ["4 x 8", "4 x 9", "5 x 7"],
        visualModel: "area_model",
        visualNumbers: [4, 9],
        examples: [
          {
            id: "grade-4-factor-pair-36-example-1",
            explanation: "A factor pair multiplies to make a number.",
            visualNumbers: [3, 12],
          },
          {
            id: "grade-4-factor-pair-36-example-2",
            explanation: "4 rows of 9 make 36.",
            visualNumbers: [4, 9],
          },
          {
            id: "grade-4-factor-pair-36-example-3",
            explanation: "So 4 and 9 are a factor pair for 36.",
            visualNumbers: [4, 9],
          },
        ],
      },
      {
        id: "grade-4-multiples-of-6",
        title: "Multiples",
        prompt: "6, 12, 18, 24, what comes next?",
        correctAnswer: "30",
        choices: ["28", "30", "36"],
        visualModel: "skip_count",
        visualNumbers: [6, 12, 18, 24],
        examples: [
          {
            id: "grade-4-multiples-of-6-example-1",
            explanation: "Multiples of 6 are made by adding 6 each time.",
            visualNumbers: [6, 12],
          },
          {
            id: "grade-4-multiples-of-6-example-2",
            explanation: "The pattern is 6, 12, 18, 24.",
            visualNumbers: [6, 12, 18, 24],
          },
          {
            id: "grade-4-multiples-of-6-example-3",
            explanation: "Add 6 more to get 30.",
            visualNumbers: [6, 12, 18, 24, 30],
          },
        ],
      },
      {
        id: "grade-4-add-four-pattern",
        title: "Number Patterns",
        prompt: "A pattern starts at 3 and adds 4 each time: 3, 7, 11, 15, ?",
        correctAnswer: "19",
        choices: ["18", "19", "20"],
        visualModel: "skip_count",
        visualNumbers: [3, 7, 11, 15],
        examples: [
          {
            id: "grade-4-add-four-pattern-example-1",
            explanation: "Start at 3.",
            visualNumbers: [3],
          },
          {
            id: "grade-4-add-four-pattern-example-2",
            explanation: "Add 4 each time: 3, 7, 11, 15.",
            visualNumbers: [3, 7, 11, 15],
          },
          {
            id: "grade-4-add-four-pattern-example-3",
            explanation: "15 + 4 = 19.",
            visualNumbers: [3, 7, 11, 15, 19],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-fraction-equivalence",
    title: "Fraction Equivalence And Comparison",
    goal: "Use equivalent fractions and benchmarks to compare fractions.",
    lessons: [
      {
        id: "grade-4-equivalent-two-fourths",
        title: "Equivalent Fractions",
        prompt: "2/4 is equivalent to which fraction?",
        correctAnswer: "1/2",
        choices: ["1/2", "1/3", "3/4"],
        visualModel: "fraction_bar",
        visualNumbers: [2, 4, 1, 2],
        examples: [
          {
            id: "grade-4-equivalent-two-fourths-example-1",
            explanation: "Shade 2 out of 4 equal parts.",
            visualNumbers: [2, 4],
          },
          {
            id: "grade-4-equivalent-two-fourths-example-2",
            explanation: "The same amount is 1 out of 2 equal parts.",
            visualNumbers: [1, 2],
          },
          {
            id: "grade-4-equivalent-two-fourths-example-3",
            explanation: "2/4 and 1/2 name the same size.",
            visualNumbers: [2, 4, 1, 2],
          },
        ],
      },
      {
        id: "grade-4-compare-three-fourths-five-eighths",
        title: "Compare Fractions",
        prompt: "Which comparison is true?",
        correctAnswer: "3/4 > 5/8",
        choices: ["3/4 < 5/8", "3/4 = 5/8", "3/4 > 5/8"],
        visualModel: "fraction_bar",
        visualNumbers: [3, 4, 5, 8],
        examples: [
          {
            id: "grade-4-compare-three-fourths-five-eighths-example-1",
            explanation: "3/4 is the same size as 6/8.",
            visualNumbers: [3, 4, 6, 8],
          },
          {
            id: "grade-4-compare-three-fourths-five-eighths-example-2",
            explanation: "6/8 is greater than 5/8.",
            visualNumbers: [6, 8, 5, 8],
          },
          {
            id: "grade-4-compare-three-fourths-five-eighths-example-3",
            explanation: "So 3/4 is greater than 5/8.",
            visualNumbers: [3, 4, 5, 8],
          },
        ],
      },
      {
        id: "grade-4-benchmark-half",
        title: "Benchmark Fractions",
        prompt: "5/12 is best described as what?",
        correctAnswer: "less than 1/2",
        choices: ["less than 1/2", "equal to 1/2", "greater than 1/2"],
        visualModel: "fraction_bar",
        visualNumbers: [5, 12, 1, 2],
        examples: [
          {
            id: "grade-4-benchmark-half-example-1",
            explanation: "Half of 12 equal parts is 6 parts.",
            visualNumbers: [6, 12, 1, 2],
          },
          {
            id: "grade-4-benchmark-half-example-2",
            explanation: "5/12 has one fewer part than 6/12.",
            visualNumbers: [5, 12, 6, 12],
          },
          {
            id: "grade-4-benchmark-half-example-3",
            explanation: "So 5/12 is less than 1/2.",
            visualNumbers: [5, 12, 1, 2],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-fraction-operations",
    title: "Fraction Operations",
    goal: "Add, subtract, and multiply fractions using unit fractions.",
    lessons: [
      {
        id: "grade-4-add-like-denominators",
        title: "Add Fractions With Like Denominators",
        prompt: "3/8 + 2/8 = ?",
        correctAnswer: "5/8",
        choices: ["5/16", "5/8", "6/8"],
        visualModel: "fraction_bar",
        visualNumbers: [3, 8, 2, 8],
        examples: [
          {
            id: "grade-4-add-like-denominators-example-1",
            explanation: "3/8 means 3 one-eighth pieces.",
            visualNumbers: [3, 8],
          },
          {
            id: "grade-4-add-like-denominators-example-2",
            explanation: "Add 2 more one-eighth pieces.",
            visualNumbers: [3, 8, 2, 8],
          },
          {
            id: "grade-4-add-like-denominators-example-3",
            explanation: "3 eighths + 2 eighths = 5 eighths.",
            visualNumbers: [5, 8],
          },
        ],
      },
      {
        id: "grade-4-improper-to-mixed",
        title: "Mixed Numbers",
        prompt: "7/6 is equal to which mixed number?",
        correctAnswer: "1 1/6",
        choices: ["1 1/6", "1 6/7", "2 1/6"],
        visualModel: "fraction_bar",
        visualNumbers: [7, 6],
        examples: [
          {
            id: "grade-4-improper-to-mixed-example-1",
            explanation: "6/6 makes one whole.",
            visualNumbers: [6, 6],
          },
          {
            id: "grade-4-improper-to-mixed-example-2",
            explanation: "7/6 is one whole and 1/6 more.",
            visualNumbers: [7, 6],
          },
          {
            id: "grade-4-improper-to-mixed-example-3",
            explanation: "So 7/6 = 1 1/6.",
            visualNumbers: [7, 6],
          },
        ],
      },
      {
        id: "grade-4-multiply-fraction-by-whole",
        title: "Multiply A Fraction By A Whole Number",
        prompt: "3 x 2/5 = ?",
        correctAnswer: "6/5",
        choices: ["5/6", "6/5", "6/15"],
        visualModel: "fraction_bar",
        visualNumbers: [6, 5],
        examples: [
          {
            id: "grade-4-multiply-fraction-by-whole-example-1",
            explanation: "3 x 2/5 means 3 groups of 2 fifths.",
            visualNumbers: [2, 5],
          },
          {
            id: "grade-4-multiply-fraction-by-whole-example-2",
            explanation: "2 fifths + 2 fifths + 2 fifths = 6 fifths.",
            visualNumbers: [6, 5],
          },
          {
            id: "grade-4-multiply-fraction-by-whole-example-3",
            explanation: "The product is 6/5.",
            visualNumbers: [6, 5],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-decimals",
    title: "Decimal Fractions And Hundredths",
    goal: "Connect tenths and hundredths to decimal notation.",
    lessons: [
      {
        id: "grade-4-hundredths-to-decimal",
        title: "Hundredths As Decimals",
        prompt: "35/100 is written as which decimal?",
        correctAnswer: "0.35",
        choices: ["0.035", "0.35", "3.5"],
        visualModel: "fraction_bar",
        visualNumbers: [35, 100],
        examples: [
          {
            id: "grade-4-hundredths-to-decimal-example-1",
            explanation: "A hundredths fraction has 100 equal parts.",
            visualNumbers: [35, 100],
          },
          {
            id: "grade-4-hundredths-to-decimal-example-2",
            explanation: "35 hundredths is written 0.35.",
            visualNumbers: [35, 100],
          },
          {
            id: "grade-4-hundredths-to-decimal-example-3",
            explanation: "The 3 is tenths and the 5 is hundredths.",
            visualNumbers: [35, 100],
          },
        ],
      },
      {
        id: "grade-4-compare-decimals",
        title: "Compare Decimals",
        prompt: "Which comparison is true?",
        correctAnswer: "0.4 > 0.37",
        choices: ["0.4 < 0.37", "0.4 = 0.37", "0.4 > 0.37"],
        visualModel: "fraction_bar",
        visualNumbers: [40, 100, 37, 100],
        examples: [
          {
            id: "grade-4-compare-decimals-example-1",
            explanation: "0.4 is the same as 40/100.",
            visualNumbers: [40, 100],
          },
          {
            id: "grade-4-compare-decimals-example-2",
            explanation: "0.37 is the same as 37/100.",
            visualNumbers: [37, 100],
          },
          {
            id: "grade-4-compare-decimals-example-3",
            explanation: "40 hundredths is greater than 37 hundredths.",
            visualNumbers: [40, 100, 37, 100],
          },
        ],
      },
      {
        id: "grade-4-tenths-as-hundredths",
        title: "Tenths And Hundredths",
        prompt: "7/10 is the same as which decimal?",
        correctAnswer: "0.70",
        choices: ["0.07", "0.70", "7.00"],
        visualModel: "fraction_bar",
        visualNumbers: [70, 100],
        examples: [
          {
            id: "grade-4-tenths-as-hundredths-example-1",
            explanation: "One tenth is the same as ten hundredths.",
            visualNumbers: [10, 100],
          },
          {
            id: "grade-4-tenths-as-hundredths-example-2",
            explanation: "7 tenths is the same as 70 hundredths.",
            visualNumbers: [70, 100],
          },
          {
            id: "grade-4-tenths-as-hundredths-example-3",
            explanation: "70/100 is written as 0.70.",
            visualNumbers: [70, 100],
          },
        ],
      },
    ],
  },
  {
    id: "grade-4-measurement-geometry",
    title: "Measurement, Angles, And Geometry",
    goal: "Convert measurements, measure angles, and classify lines.",
    lessons: [
      {
        id: "grade-4-feet-to-inches",
        title: "Measurement Conversion",
        prompt: "3 feet equals how many inches?",
        correctAnswer: "36 inches",
        choices: ["15 inches", "30 inches", "36 inches"],
        visualModel: "measurement_conversion",
        visualNumbers: [3, 12, 36],
        examples: [
          {
            id: "grade-4-feet-to-inches-example-1",
            explanation: "1 foot equals 12 inches.",
            visualNumbers: [1, 12, 12],
          },
          {
            id: "grade-4-feet-to-inches-example-2",
            explanation: "3 feet means 3 groups of 12 inches.",
            visualNumbers: [3, 12, 36],
          },
          {
            id: "grade-4-feet-to-inches-example-3",
            explanation: "3 x 12 = 36 inches.",
            visualNumbers: [3, 12, 36],
          },
        ],
      },
      {
        id: "grade-4-add-angles",
        title: "Add Angle Measures",
        prompt:
          "An angle is split into 35 degrees and 55 degrees. What is the total?",
        correctAnswer: "90 degrees",
        choices: ["80 degrees", "90 degrees", "100 degrees"],
        visualModel: "angle_model",
        visualNumbers: [35, 55],
        examples: [
          {
            id: "grade-4-add-angles-example-1",
            explanation: "One part of the angle is 35 degrees.",
            visualNumbers: [35],
          },
          {
            id: "grade-4-add-angles-example-2",
            explanation: "The other part is 55 degrees.",
            visualNumbers: [55],
          },
          {
            id: "grade-4-add-angles-example-3",
            explanation: "35 + 55 = 90 degrees.",
            visualNumbers: [35, 55],
          },
        ],
      },
      {
        id: "grade-4-parallel-lines",
        title: "Parallel Lines",
        prompt:
          "Which term describes two lines that never cross and stay the same distance apart?",
        correctAnswer: "parallel",
        choices: ["parallel", "perpendicular", "intersecting"],
        visualModel: "line_geometry",
        visualNumbers: [0],
        examples: [
          {
            id: "grade-4-parallel-lines-example-1",
            explanation: "Parallel lines stay the same distance apart.",
            visualNumbers: [0],
          },
          {
            id: "grade-4-parallel-lines-example-2",
            explanation: "Perpendicular lines meet to make a square corner.",
            visualNumbers: [1],
          },
          {
            id: "grade-4-parallel-lines-example-3",
            explanation: "These lines are parallel because they never cross.",
            visualNumbers: [0],
          },
        ],
      },
    ],
  },
];
