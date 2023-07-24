import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Video interface
interface IVideo extends Document {
  link: string;
  title: string;
  description: string;
  by: { type: mongoose.Types.ObjectId };
  likes: string;
  dislikes: string;
  tags: string[];
  thumbnail: string;
  duration: number;
  comment: { type: mongoose.Types.ObjectId }[];
  searchableParams: string;
}

// Define the VideoSchema
const videoSchema: Schema<IVideo> = new Schema(
  {
    link: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    by: { type: mongoose.Types.ObjectId, required: true, ref: "Channel" },
    likes: { type: String, default: "" },
    dislikes: { type: String, default: "" },
    tags: { type: [String], default: [] },
    thumbnail: { type: String, default: "", required: true },
    duration: { type: Number, default: 0, required: true },
    comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    searchableParams: { type: String, default: "" },
  },
  { timestamps: true }
);

// Create and export the VideoModel
const videoModel: Model<IVideo> = mongoose.model<IVideo>("Video", videoSchema);

export default videoModel;
