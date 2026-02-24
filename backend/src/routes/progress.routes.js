import express from "express";
import auth from "../middleware/auth.js";
import { getStudentProgress } from "../controllers/progress.controller.js";

const router = express.Router();

router.get("/student", auth, getStudentProgress);

export default router;
