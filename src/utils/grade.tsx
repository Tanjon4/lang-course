export const getMention = (score: number, total: number) => {
  const percentage = (score / total) * 100;

  if (percentage >= 90) return "Outstanding ";
  if (percentage >= 75) return "Very Good ";
  if (percentage >= 60) return "Good ";
  if (percentage >= 45) return "Needs Improvement";
  return "Try Again 🔁 — Study the lesson and attempt the quiz once more.";
};
