import Content from "../models/Content.js";
import StudentProgress from "../models/StudentProgress.js";

export const getStudentProgress = async (req, res) => {
  try {
    const studentId = req.user.id;

    const progress = await StudentProgress.find({ studentId })
      .populate("contentId");

    let totalCourses = new Set();
    let completedCourses = new Set();
    let totalHours = 0;

    progress.forEach(p => {
      totalCourses.add(p.course);
      totalHours += p.timeSpent || 0;
      if (p.completed) completedCourses.add(p.course);
    });

    const avgProgress =
      progress.length === 0
        ? 0
        : Math.round(
            progress.reduce((a, b) => a + b.progress, 0) /
              progress.length
          );

    res.json({
      avgProgress,
      completedCount: completedCourses.size,
      totalHours,
      dayStreak: 15, // can be auto-calculated later
      weeklyStudy: [2, 3, 1, 4, 2, 3, 2],
      completionTrend: [2, 3, 4, 5, 6, 8],
      completedCourses: [...completedCourses]
    });
  } catch (err) {
    res.status(500).json({ message: "Progress error" });
  }
};
