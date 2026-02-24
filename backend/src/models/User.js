import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student"
  },
  engagementScore: { type: Number, default: 0 },
  badges: [String]
});

export default mongoose.model("User", userSchema);
