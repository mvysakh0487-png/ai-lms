import User from "../models/User.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";

/* ===========================
   ADMIN: SYSTEM ANALYTICS
=========================== */
export const systemAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalInstructors = await User.countDocuments({ role: "instructor" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalCourses = await Course.countDocuments();

    const avgEngagement = await User.aggregate([
      { $group: { _id: null, avg: { $avg: "$engagementScore" } } }
    ]);

    res.json({
      users: {
        total: totalUsers,
        students: totalStudents,
        instructors: totalInstructors,
        admins: totalAdmins
      },
      courses: totalCourses,
      avgEngagement: avgEngagement[0]?.avg || 0
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics error", error });
  }
};

/* ===========================
   ADMIN: GET ALL USERS
=========================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* ===========================
   STUDENT: PERSONAL ANALYTICS
=========================== */
export const studentAnalytics = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id });

    const completed = progress.filter(p => p.completionPercent === 100).length;

    const avgScore =
      progress.reduce((sum, p) => sum + (p.quizScore || 0), 0) /
      (progress.length || 1);

    res.json({
      totalCourses: progress.length,
      completedCourses: completed,
      avgScore: Math.round(avgScore)
    });
  } catch (error) {
    res.status(500).json({ message: "Student analytics error" });
  }
};

/* ===========================
   INSTRUCTOR: COURSE ANALYTICS
=========================== */
export const instructorAnalytics = async (req, res) => {
  try {
    const courses = await Course.find({ instructorId: req.user.id });

    const courseIds = courses.map(c => c._id);

    const progress = await Progress.find({
      courseId: { $in: courseIds }
    });

    res.json({
      totalCourses: courses.length,
      totalEnrollments: progress.length
    });
  } catch (error) {
    res.status(500).json({ message: "Instructor analytics error" });
  }
};
