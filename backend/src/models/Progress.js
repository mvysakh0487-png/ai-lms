import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  quizScore: Number,
  timeSpent: Number,
  completionPercent: Number,
  riskLevel: String
});

export default mongoose.model("Progress", progressSchema);
