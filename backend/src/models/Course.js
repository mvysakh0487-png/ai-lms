import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["pdf", "video", "link", "text"],
    required: true
  },
  title: String,
  url: String,
  text: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    contents: [contentSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
