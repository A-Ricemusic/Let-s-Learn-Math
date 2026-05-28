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

export type SectionQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
  visualModel: VisualModel;
  visualNumbers: number[];
};

export type SectionExample = {
  id: string;
  explanation: string;
  visualModel: VisualModel;
  visualNumbers: number[];
};

export type SectionLesson = {
  id: string;
  title: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
  visualModel: VisualModel;
  visualNumbers: number[];
  examples: Array<{
    id: string;
    explanation: string;
    visualNumbers: number[];
  }>;
};

export type CurriculumSection = {
  id: string;
  title: string;
  goal: string;
  lessons: SectionLesson[];
};

export type SectionPlan = {
  examples: Array<{
    example: SectionExample;
    practice: SectionQuestion[];
  }>;
  quiz: SectionQuestion[];
};
