import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  createdAt: { type: Date, default: Date.now }
});
export const View = mongoose.model('View', viewSchema);