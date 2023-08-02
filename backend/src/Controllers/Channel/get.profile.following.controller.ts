import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
import { AuthRequest } from "../../Types";
const channelPerPage = 10;
const getProfileFollowingController = catchAsync(
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
          $lookup: {
            from: "channels",
            localField: "following",
            foreignField: "_id",
            as: "followingData",
          },
        },
        {
          $unwind: "$followingData",
        },

        // Project only the desired fields from the videos
        {
          $project: {
            _id: "$followingData._id",
            channelProfile: "$followingData.channelProfile",
            channelName: "$followingData.channelName",
            followerCount: { $size: "$followingData.follower" },
          },
        },
        // Skip videos for previous pages
        { $skip: (page - 1) * channelPerPage },
        // Limit the result to the current page
        { $limit: channelPerPage + 1 },
      ])
      .then((channels) => {
        var payload: { page: number; channels: Object | null } = {
          page: -1,
          channels: [],
        };
        if (channels.length > 0) {
          if (channels.length < channelPerPage + 1) {
            payload.page = -1;
          } else {
            channels.pop();
            payload.page = page;
          }
          payload.channels = channels;
        }

        return res.status(200).json({
          status: "success",
          message: "Channel's Following Fetched successfully",
          data: payload,
        });
      })
      .catch((error) => {
        new AppError(error, 500, "ERR_VIDEOS_FETCH_FAILED");
      });
  }
);

export { getProfileFollowingController };
