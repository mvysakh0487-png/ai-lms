import express from "express";
import {
  createCourse,
  getInstructorCourses,
  uploadCourseContent,
  getAllCourses
} from "../controllers/course.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("instructor"), createCourse);
router.get("/instructor", protect, authorize("instructor"), getInstructorCourses);
router.post("/:id/content", protect, authorize("instructor"), uploadCourseContent);
router.get("/", protect, getAllCourses);

export default router;
