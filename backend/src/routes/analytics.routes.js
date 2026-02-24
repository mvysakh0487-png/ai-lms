import express from "express";
import User from "../models/User.js";
import Content from "../models/Content.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= ADMIN ANALYTICS ================= */
router.get("/admin", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.find();
  const students = users.filter(u => u.role === "student").length;
  const instructors = users.filter(u => u.role === "instructor").length;
  const admins = users.filter(u => u.role === "admin").length;
  const contents = await Content.countDocuments();

  res.json({
    users: {
      total: users.length,
      students,
      instructors,
      admins
    },
    courses: contents,
    avgEngagement: 0
  });
});

/* ================= INSTRUCTOR ANALYTICS ================= */
router.get("/instructor", protect, async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied" });
  }

  const totalContent = await Content.countDocuments({
    instructor: req.user._id
  });

  const totalStudents = await User.countDocuments({ role: "student" });

  res.json({
    totalContent,
    totalStudents
  });
});

export default router;