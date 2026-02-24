import express from "express";
import User from "../models/User.js";
import Content from "../models/Content.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================= USERS ================= */

/* GET ALL USERS */
router.get("/users", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.find().select("-password");
  res.json(users);
});

/* UPDATE USER ROLE */
router.put("/users/:id/role", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { role } = req.body;

  if (!["student", "instructor", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

/* DELETE USER */
router.delete("/users/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Optional safety: prevent deleting yourself
  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: "Cannot delete yourself" });
  }

  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
});

/* ================= DASHBOARD ================= */
router.get("/dashboard", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const totalUsers = await User.countDocuments();
  const students = await User.countDocuments({ role: "student" });
  const instructors = await User.countDocuments({ role: "instructor" });
  const admins = await User.countDocuments({ role: "admin" });
  const contents = await Content.countDocuments();

  res.json({
    totalUsers,
    students,
    instructors,
    admins,
    contents
  });
});

/* ================= ANALYTICS ================= */
router.get("/analytics", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const roleStats = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);

  res.json({ roleStats });
});

export default router;