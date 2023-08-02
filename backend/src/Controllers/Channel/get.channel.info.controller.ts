import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
import { AuthRequest } from "../../Types";
import mongoose from "mongoose";

const getChannelInfoController = catchAsync(
  async (req: Request, res: Response) => {
    const { channelId } = req.query;
    console.log(channelId);

    const channel = await channelModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(channelId as string),
        },
      },
      {
        $project: {
          _id: 1,
          channelName: 1,
          channelProfile: 1,
          followerCount: { $size: "$follower" },
          videoCount: { $size: "$video" },
        },
      },
    ]);

    if (channel.length === 0) {
      throw new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
    }

    return res.status(200).json({
      status: "success",
      message: "Channel Info Fetched successfully",
      data: channel[0],
    });
  }
);

export { getChannelInfoController };
