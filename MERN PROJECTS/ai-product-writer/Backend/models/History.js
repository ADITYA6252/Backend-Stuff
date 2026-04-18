import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    email: String,
    description: String,
    caption: String,
    hashtags: String,
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);