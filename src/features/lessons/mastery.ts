export type LessonProgressStatus = "not_started" | "in_progress" | "mastered";

export type LessonMastery = {
  status: LessonProgressStatus;
  correctCount: number;
  attemptCount: number;
  masteryScore: number;
};

export function calculateLessonMastery({
  previousCorrect,
  previousAttempts,
  isCorrect,
}: {
  previousCorrect: number;
  previousAttempts: number;
  isCorrect: boolean;
}): LessonMastery {
  const correctCount = previousCorrect + (isCorrect ? 1 : 0);
  const attemptCount = previousAttempts + 1;
  const masteryScore = Math.round((correctCount / attemptCount) * 100);
  const status =
    masteryScore >= 80 && attemptCount >= 3 ? "mastered" : "in_progress";

  return {
    status,
    correctCount,
    attemptCount,
    masteryScore,
  };
}
