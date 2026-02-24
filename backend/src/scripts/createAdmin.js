import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@lms.com";
  const password = "admin123";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: "System Admin",
    email,
    password: hashedPassword,
    role: "admin"
  });

  console.log("✅ Admin created");
  process.exit();
};

createAdmin();
