export const recommendContent = (progress) => {
  if (progress.quizScore < 40) return "Beginner Lessons";
  if (progress.quizScore > 80) return "Advanced Lessons";
  return "Intermediate Lessons";
};
