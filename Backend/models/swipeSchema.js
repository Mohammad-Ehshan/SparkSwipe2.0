import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  action: {
    type: String,
    enum: ["like", "dislike", "skip"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

swipeSchema.index({ userId: 1, projectId: 1 }, { unique: true });

export const Swipe = mongoose.model("Swipe", swipeSchema);
