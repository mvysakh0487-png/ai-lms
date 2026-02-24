import express from "express";
import { analyzeLearner } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/analyze", protect, analyzeLearner);

export default router;
