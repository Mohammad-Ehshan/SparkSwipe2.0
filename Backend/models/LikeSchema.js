import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  createdAt: { type: Date, default: Date.now }
});
export const Like = mongoose.model('Like', likeSchema);
