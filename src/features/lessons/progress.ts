export function getLessonProgressPercent(progressSeconds: number, durationMinutes: number) {
  if (durationMinutes <= 0 || progressSeconds <= 0) {
    return 0;
  }

  const durationSeconds = durationMinutes * 60;
  return Math.min(100, Math.round((progressSeconds / durationSeconds) * 100));
}
