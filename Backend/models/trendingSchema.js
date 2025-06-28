import mongoose from "mongoose";

const trendingSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  swipeLikes: {
    type: Number,
    default: 0,
  },
  timeWindow: {
    type: String,
    required: true,
  },
  calculatedScore: {
    type: Number,
    required: true,
    default: 0,
  },
} , { timestamps: true } );

trendingSchema.index({ projectId: 1, timeWindow: 1 }, { unique: true });

export const Trending = mongoose.model("Trending", trendingSchema);
