import mongoose, { Document, Schema, Model, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../Utils/app.error.handle";
import globals from "../Config/globals.config";

// Define the Channel interface
interface IChannel extends Document {
  userId: string;
  channelName: string;
  channelProfile: string;
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

// Define the ChannelSchema
const channelSchema: Schema<IChannel> = new Schema(
  {
    userId: { type: String, ref: "User", required: true, unique: true },
    channelName: { type: String, required: true },
    channelProfile: { type: String, default: null },
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

// Create and export the ChannelModel
const channelModel: Model<IChannel> = mongoose.model<IChannel>(
  "Channel",
  channelSchema
);

export default channelModel;
