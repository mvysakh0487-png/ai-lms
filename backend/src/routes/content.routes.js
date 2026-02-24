import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadContent,
  getInstructorContent,
  getStudentContent
} from "../controllers/content.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* STORAGE */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

/* ACCEPT ALL FILE TYPES */
const upload = multer({ storage });

router.post("/upload", protect, upload.single("file"), uploadContent);
router.get("/instructor", protect, getInstructorContent);
router.get("/student", protect, getStudentContent);

export default router;
