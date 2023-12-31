import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
import { AuthRequest } from "../../Types";

const getProfileInfoController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const user = await userModel.aggregate([
      {
        $match: {
          _id: req.userId,
        },
      },
      {
        $lookup: {
          from: "channels",
          localField: "channelId",
          foreignField: "_id",
          as: "channel",
        },
      },
      {
        $unwind: "$channel",
      },
      {
        $project: {
          channel: {
            _id: 1,
            channelName: 1,
            channelProfile: 1,
            followerCount: { $size: "$channel.follower" },
            videoCount: { $size: "$channel.video" },
          },
        },
      },
    ]);

    if (user.length === 0) {
      throw new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
    }
    const channelData = user[0].channel;
    return res.status(200).json({
      status: "success",
      message: "Channel Info Fetched successfully",
      data: channelData,
    });
  }
);

export { getProfileInfoController };
