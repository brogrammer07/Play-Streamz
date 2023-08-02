import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
import { AuthRequest } from "../../Types";

const getProfileAboutController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const page = parseInt(req.query.page as string) || 1;
    const { channelId } = await userModel.findById(userId, { channelId: 1 });
    if (!channelId) {
      throw new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
    }
    await channelModel
      .aggregate([
        {
          $match: {
            _id: channelId,
          },
        },
        {
          $project: {
            followerCount: { $size: "$follower" },
            videoCount: { $size: "$video" },
            followingCount: { $size: "$following" },
            likes: 1,
            views: 1,
            createdAt: 1,
          },
        },
      ])
      .then((channel) => {
        return res.status(200).json({
          status: "success",
          message: "Channel About Fetched successfully",
          data: channel[0],
        });
      })
      .catch((err) => {
        return new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
      });
  }
);

export { getProfileAboutController };
