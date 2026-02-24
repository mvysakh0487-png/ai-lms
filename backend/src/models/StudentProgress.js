import mongoose from "mongoose";

const studentProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    completedContent: [
      {
        contentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Content"
        },
        completedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    progressPercentage: {
      type: Number,
      default: 0
    },

    totalHoursSpent: {
      type: Number,
      default: 0
    },

    lastAccessed: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentProgress", studentProgressSchema);