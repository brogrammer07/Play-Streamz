import mongoose, { Document, Schema, Model, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../Utils/app.error.handle";
import globals from "../Config/globals.config";

// Define the Channel interface
interface IChannel extends Document {
  name: string;
  email: string;
  password: string;
  profileUrl: string;
  isGoogle: boolean;
  userId: string;
  follower: {
    type: mongoose.Types.ObjectId;
  }[];
  following: {
    type: mongoose.Types.ObjectId;
  }[];
  video: {
    type: mongoose.Types.ObjectId;
  }[];
  liked: {
    type: mongoose.Types.ObjectId;
  }[];
  saved: {
    type: mongoose.Types.ObjectId;
  }[];
  views: string;
  likes: string;
  searchableParams: string;
}
interface IChannelDocument extends IChannel, Document {
  comparePassword: (password: string) => Promise<boolean>;
}
// Define the ChannelSchema
const channelSchema: Schema<IChannelDocument> = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileUrl: { type: String, required: false },
    isGoogle: { type: Boolean, required: true, default: false },
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    video: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    views: { type: String, default: "0" },
    likes: { type: String, default: "0" },
    searchableParams: { type: String, default: "" },
  },
  { timestamps: true }
);

// Pre-save hook to hash the Channel's password before saving
channelSchema.pre<IChannel>("save", async function (next) {
  console.log("name", this.name);
  if (this.isGoogle) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(new AppError(error.message, 500, "ERR_UKN"));
  }
});

// Method to compare the Channel's password with the provided password
channelSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new AppError(error.message, 500, "ERR_UKN");
  }
};

// Create and export the ChannelModel
const channelModel: Model<IChannelDocument> = mongoose.model<IChannelDocument>(
  "Channel",
  channelSchema
);

export default channelModel;
