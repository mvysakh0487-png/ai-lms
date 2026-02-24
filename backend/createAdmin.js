import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config(); // 🔥 THIS WAS MISSING

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@admin.com",
    password: hashed,
    role: "admin"
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();
