import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Video interface
interface IVideo extends Document {
  link: string;
  title: string;
  description: string;
  channelId: { type: mongoose.Types.ObjectId };
  views: string;
  likes: string;
  dislikes: string;
  tags: string[];
  thumbnail: string;
  comment: { type: mongoose.Types.ObjectId }[];
  searchableParams: string;
  likedBy: { type: mongoose.Types.ObjectId };
  savedBy: { type: mongoose.Types.ObjectId };
}

// Define the VideoSchema
const videoSchema: Schema<IVideo> = new Schema(
  {
    link: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    channelId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
    likes: { type: String, default: "0" },
    views: { type: String, default: "0" },
    dislikes: { type: String, default: "0" },
    tags: { type: [String], default: [] },
    thumbnail: { type: String, default: "", required: true },
    comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likedBy: [{ type: mongoose.Types.ObjectId, ref: "Channel" }],
    savedBy: [{ type: mongoose.Types.ObjectId, ref: "Channel" }],
    searchableParams: { type: String, default: "" },
  },
  { timestamps: true }
);

// Create and export the VideoModel
const videoModel: Model<IVideo> = mongoose.model<IVideo>("Video", videoSchema);

export default videoModel;
