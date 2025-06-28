import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    minLength: [3, "Title must contain at least 3 characters"],
    maxLength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    minLength: [3, "Description must contain at least 3 characters"],
    maxLength: [5000, "Description cannot exceed 5000 characters"],
  },
  category: {
    type: String,
    required: [true, "Project Category is required"],
    enum: [
      "AI/ML",
      "FinTech",
      "HealthTech",
      "EdTech",
      "CleanTech",
      "Enterprise",
      "Consumer",
      "Social",
      "Gaming",
      "Other",
    ],
    default: "Other",
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  media: {
    imageUrls: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    video: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  skip: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  reports: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.index(
  {
    title: "text",
    description: "text",
    tags: "text",
  },
  {
    weights: {
      title: 5,
      tags: 3,
      description: 1,
    },
  }
);

export const Project = mongoose.model("Project", projectSchema);
