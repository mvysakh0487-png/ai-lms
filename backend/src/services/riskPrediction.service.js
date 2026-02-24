export const predictRisk = (progress) => {
  if (progress.quizScore < 30 && progress.timeSpent < 20) return "High Risk";
  if (progress.quizScore < 60) return "Medium Risk";
  return "Low Risk";
};
