import express from "express";
import { login, createUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/login", login);

/* ADMIN CREATE USER */
router.post(
  "/create-user",
  protect,
  authorize("admin"),
  createUser
);


export default router;
