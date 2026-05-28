export type VisualModel =
  | "ten_frame"
  | "object_groups"
  | "take_away"
  | "number_line"
  | "base_ten"
  | "skip_count"
  | "measurement_units"
  | "clock"
  | "shape_sort"
  | "place_value_chart"
  | "area_model"
  | "division_model"
  | "fraction_bar"
  | "decimal_grid"
  | "volume_model"
  | "coordinate_plane"
  | "expression_cards"
  | "measurement_conversion"
  | "angle_model"
  | "line_geometry"
  | "ratio_table"
  | "percent_bar"
  | "equation_balance"
  | "circle_measure"
  | "probability_model"
  | "data_distribution";

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
  examples: SectionExample[];
  practice: SectionQuestion[];
  quiz: SectionQuestion[];
};
