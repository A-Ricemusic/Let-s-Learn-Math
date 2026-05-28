export type VisualModel =
  | "ten_frame"
  | "object_groups"
  | "take_away"
  | "number_line"
  | "base_ten"
  | "skip_count"
  | "measurement_units"
  | "clock"
  | "shape_sort";

export type FirstGradeLesson = {
  id: string;
  unitId: string;
  title: string;
  concept: string;
  explanation: string;
  visualModel: VisualModel;
  masteryTarget: number;
  prompt: string;
  correctAnswer: string;
  choices: string[];
  visualNumbers: number[];
};

export type LessonExample = {
  id: string;
  explanation: string;
  visualNumbers: number[];
};

export type FirstGradeUnit = {
  id: string;
  title: string;
  goal: string;
  lessons: FirstGradeLesson[];
};

export const firstGradeUnits: FirstGradeUnit[] = [
  {
    id: "making-ten",
    title: "Making Ten",
    goal: "Use ten frames to see pairs that make 10.",
    lessons: [
      {
        id: "make-ten-7-3",
        unitId: "making-ten",
        title: "7 and 3 make 10",
        concept: "Making ten",
        explanation: "A ten frame helps us see 10. Fill the empty spots.",
        visualModel: "ten_frame",
        masteryTarget: 80,
        prompt: "There are 7 dots. How many more make 10?",
        correctAnswer: "3",
        choices: ["2", "3", "4"],
        visualNumbers: [7, 3],
      },
      {
        id: "make-ten-6-4",
        unitId: "making-ten",
        title: "6 and 4 make 10",
        concept: "Making ten",
        explanation: "When all 10 spaces are full, we made 10.",
        visualModel: "ten_frame",
        masteryTarget: 80,
        prompt: "There are 6 dots. How many more make 10?",
        correctAnswer: "4",
        choices: ["3", "4", "5"],
        visualNumbers: [6, 4],
      },
      {
        id: "make-ten-8-2",
        unitId: "making-ten",
        title: "8 and 2 make 10",
        concept: "Making ten",
        explanation: "Count the empty spaces to find the missing part.",
        visualModel: "ten_frame",
        masteryTarget: 80,
        prompt: "There are 8 dots. How many more make 10?",
        correctAnswer: "2",
        choices: ["1", "2", "3"],
        visualNumbers: [8, 2],
      },
    ],
  },
  {
    id: "addition-within-ten",
    title: "Addition Within 10",
    goal: "Put groups together and count the total.",
    lessons: [
      {
        id: "add-4-5",
        unitId: "addition-within-ten",
        title: "Add 4 + 5",
        concept: "Addition",
        explanation: "Add means put together. Count both groups.",
        visualModel: "object_groups",
        masteryTarget: 80,
        prompt: "4 stars and 5 stars make how many stars?",
        correctAnswer: "9",
        choices: ["8", "9", "10"],
        visualNumbers: [4, 5],
      },
      {
        id: "add-2-6",
        unitId: "addition-within-ten",
        title: "Add 2 + 6",
        concept: "Addition",
        explanation: "Two small groups can become one bigger group.",
        visualModel: "object_groups",
        masteryTarget: 80,
        prompt: "2 cubes and 6 cubes make how many cubes?",
        correctAnswer: "8",
        choices: ["7", "8", "9"],
        visualNumbers: [2, 6],
      },
    ],
  },
  {
    id: "subtraction-within-ten",
    title: "Subtraction Within 10",
    goal: "Take away objects and count what is left.",
    lessons: [
      {
        id: "subtract-8-3",
        unitId: "subtraction-within-ten",
        title: "Take away 3",
        concept: "Subtraction",
        explanation: "Subtract means take away. Count what stays.",
        visualModel: "take_away",
        masteryTarget: 80,
        prompt: "8 apples. 3 go away. How many are left?",
        correctAnswer: "5",
        choices: ["4", "5", "6"],
        visualNumbers: [8, 3],
      },
      {
        id: "subtract-10-6",
        unitId: "subtraction-within-ten",
        title: "Take away 6",
        concept: "Subtraction",
        explanation: "Cross out the ones that go away.",
        visualModel: "take_away",
        masteryTarget: 80,
        prompt: "10 dots. 6 go away. How many are left?",
        correctAnswer: "4",
        choices: ["3", "4", "5"],
        visualNumbers: [10, 6],
      },
    ],
  },
  {
    id: "within-twenty",
    title: "Add And Subtract Within 20",
    goal: "Use number lines and make-ten thinking for bigger numbers.",
    lessons: [
      {
        id: "add-8-5",
        unitId: "within-twenty",
        title: "Add 8 + 5",
        concept: "Addition within 20",
        explanation: "Jump forward on the number line to add.",
        visualModel: "number_line",
        masteryTarget: 80,
        prompt: "Start at 8. Jump 5 more. Where do you land?",
        correctAnswer: "13",
        choices: ["12", "13", "14"],
        visualNumbers: [8, 5],
      },
      {
        id: "subtract-15-7",
        unitId: "within-twenty",
        title: "Subtract 15 - 7",
        concept: "Subtraction within 20",
        explanation: "Jump back on the number line to subtract.",
        visualModel: "number_line",
        masteryTarget: 80,
        prompt: "Start at 15. Jump back 7. Where do you land?",
        correctAnswer: "8",
        choices: ["7", "8", "9"],
        visualNumbers: [15, -7],
      },
    ],
  },
  {
    id: "place-value",
    title: "Place Value",
    goal: "See tens and ones in two-digit numbers.",
    lessons: [
      {
        id: "place-value-34",
        unitId: "place-value",
        title: "34 has tens and ones",
        concept: "Place value",
        explanation: "10 ones make 1 ten. 34 means 3 tens and 4 ones.",
        visualModel: "base_ten",
        masteryTarget: 80,
        prompt: "How many tens are in 34?",
        correctAnswer: "3",
        choices: ["3", "4", "7"],
        visualNumbers: [3, 4],
      },
      {
        id: "place-value-52",
        unitId: "place-value",
        title: "52 has tens and ones",
        concept: "Place value",
        explanation: "The first digit tells tens. The second digit tells ones.",
        visualModel: "base_ten",
        masteryTarget: 80,
        prompt: "How many ones are in 52?",
        correctAnswer: "2",
        choices: ["2", "5", "7"],
        visualNumbers: [5, 2],
      },
    ],
  },
  {
    id: "skip-counting",
    title: "Counting Patterns",
    goal: "Count by 1, 2, 3, 5, and 10.",
    lessons: [
      {
        id: "count-by-fives",
        unitId: "skip-counting",
        title: "Count by 5s",
        concept: "Skip counting",
        explanation: "Skip counting jumps by the same number each time.",
        visualModel: "skip_count",
        masteryTarget: 80,
        prompt: "5, 10, 15, what comes next?",
        correctAnswer: "20",
        choices: ["18", "20", "25"],
        visualNumbers: [5, 10, 15],
      },
      {
        id: "count-by-tens",
        unitId: "skip-counting",
        title: "Count by 10s",
        concept: "Skip counting",
        explanation: "Counting by 10s moves to the next ten.",
        visualModel: "skip_count",
        masteryTarget: 80,
        prompt: "10, 20, 30, what comes next?",
        correctAnswer: "40",
        choices: ["35", "40", "50"],
        visualNumbers: [10, 20, 30],
      },
    ],
  },
  {
    id: "measurement",
    title: "Measurement",
    goal: "Measure length by repeating the same unit.",
    lessons: [
      {
        id: "paper-clip-pencil",
        unitId: "measurement",
        title: "Measure with paper clips",
        concept: "Length",
        explanation: "Use the same unit again and again. Do not leave gaps.",
        visualModel: "measurement_units",
        masteryTarget: 80,
        prompt: "The pencil is 5 paper clips long. How many clips?",
        correctAnswer: "5",
        choices: ["4", "5", "6"],
        visualNumbers: [5],
      },
    ],
  },
  {
    id: "time",
    title: "Tell Time",
    goal: "Read and write time on clocks.",
    lessons: [
      {
        id: "time-three",
        unitId: "time",
        title: "3 o'clock",
        concept: "Time",
        explanation:
          "The short hand tells the hour. The long hand at 12 means o'clock.",
        visualModel: "clock",
        masteryTarget: 80,
        prompt:
          "The clock shows the short hand at 3 and long hand at 12. What time is it?",
        correctAnswer: "3:00",
        choices: ["2:00", "3:00", "3:30"],
        visualNumbers: [3, 0],
      },
    ],
  },
  {
    id: "shapes",
    title: "Shapes",
    goal: "Reason with shapes and their attributes.",
    lessons: [
      {
        id: "four-sides",
        unitId: "shapes",
        title: "Shapes with 4 sides",
        concept: "Shape attributes",
        explanation: "An attribute tells about a shape, like sides or corners.",
        visualModel: "shape_sort",
        masteryTarget: 80,
        prompt: "Which shape has 4 sides?",
        correctAnswer: "square",
        choices: ["triangle", "square", "circle"],
        visualNumbers: [4],
      },
    ],
  },
];

export function getLessonExamples(lesson: FirstGradeLesson): LessonExample[] {
  const [first = 0, second = 0] = lesson.visualNumbers;

  if (lesson.visualModel === "ten_frame") {
    if (lesson.unitId === "making-ten" && lesson.id === "make-ten-7-3") {
      return [
        {
          id: `${lesson.id}-example-1`,
          explanation: "Start with 1 dot.",
          visualNumbers: [1],
        },
        {
          id: `${lesson.id}-example-2`,
          explanation:
            "Add 9 more dots to fill the ten frame. 1 and 9 make 10.",
          visualNumbers: [1, 9],
        },
        {
          id: `${lesson.id}-example-3`,
          explanation: "2 and 8 make 10.",
          visualNumbers: [2, 8],
        },
      ];
    }

    if (lesson.unitId === "making-ten" && lesson.id === "make-ten-6-4") {
      return [
        {
          id: `${lesson.id}-example-1`,
          explanation: "3 and 7 make 10.",
          visualNumbers: [3, 7],
        },
        {
          id: `${lesson.id}-example-2`,
          explanation: "4 and 6 make 10.",
          visualNumbers: [4, 6],
        },
        {
          id: `${lesson.id}-example-3`,
          explanation: "5 and 5 make 10.",
          visualNumbers: [5, 5],
        },
      ];
    }

    return [
      {
        id: `${lesson.id}-example-1`,
        explanation: `${first} dots are already in the frame.`,
        visualNumbers: [first],
      },
      {
        id: `${lesson.id}-example-2`,
        explanation: `${10 - first} empty spaces are left.`,
        visualNumbers: [first],
      },
      {
        id: `${lesson.id}-example-3`,
        explanation: `${first} and ${10 - first} make 10.`,
        visualNumbers: [first, 10 - first],
      },
    ];
  }

  if (lesson.visualModel === "object_groups") {
    return [
      {
        id: `${lesson.id}-example-1`,
        explanation: `Start with ${first}.`,
        visualNumbers: [first, 0],
      },
      {
        id: `${lesson.id}-example-2`,
        explanation: `Add ${second} more.`,
        visualNumbers: [first, second],
      },
      {
        id: `${lesson.id}-example-3`,
        explanation: `Count them all to get ${first + second}.`,
        visualNumbers: [first + second, 0],
      },
    ];
  }

  if (lesson.visualModel === "take_away") {
    return [
      {
        id: `${lesson.id}-example-1`,
        explanation: `Start with ${first}.`,
        visualNumbers: [first, 0],
      },
      {
        id: `${lesson.id}-example-2`,
        explanation: `Take away ${second}.`,
        visualNumbers: [first, second],
      },
      {
        id: `${lesson.id}-example-3`,
        explanation: `${first - second} are left.`,
        visualNumbers: [first - second, 0],
      },
    ];
  }

  if (lesson.visualModel === "number_line") {
    return [
      {
        id: `${lesson.id}-example-1`,
        explanation: `Put your finger on ${first}.`,
        visualNumbers: [first, 0],
      },
      {
        id: `${lesson.id}-example-2`,
        explanation: `${second > 0 ? "Jump forward" : "Jump back"} ${Math.abs(second)} spaces.`,
        visualNumbers: [first, second],
      },
      {
        id: `${lesson.id}-example-3`,
        explanation: `You land on ${first + second}.`,
        visualNumbers: [first + second, 0],
      },
    ];
  }

  if (lesson.visualModel === "base_ten") {
    return [
      {
        id: `${lesson.id}-example-1`,
        explanation: `The tens place shows ${first} tens.`,
        visualNumbers: [first, 0],
      },
      {
        id: `${lesson.id}-example-2`,
        explanation: `The ones place shows ${second} ones.`,
        visualNumbers: [0, second],
      },
      {
        id: `${lesson.id}-example-3`,
        explanation: `${first} tens and ${second} ones make ${first}${second}.`,
        visualNumbers: [first, second],
      },
    ];
  }

  return [
    {
      id: `${lesson.id}-example-1`,
      explanation: "Look at the picture.",
      visualNumbers: lesson.visualNumbers,
    },
    {
      id: `${lesson.id}-example-2`,
      explanation: "Say what you notice.",
      visualNumbers: lesson.visualNumbers,
    },
    {
      id: `${lesson.id}-example-3`,
      explanation: "Use the picture to answer.",
      visualNumbers: lesson.visualNumbers,
    },
  ];
}
