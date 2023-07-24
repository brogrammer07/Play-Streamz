import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Comment interface
interface IComment extends Document {
  by: { type: mongoose.Types.ObjectId };
  comment: string;
  likes: string;
  dislikes: string;
}

// Define the commentSchema
const commentSchema: Schema<IComment> = new Schema(
  {
    by: { type: mongoose.Types.ObjectId, required: true, ref: "Channel" },
    likes: { type: String, default: "" },
    dislikes: { type: String, default: "" },
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);

// Create and export the commentModel
const commentModel: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  commentSchema
);

export default commentModel;
