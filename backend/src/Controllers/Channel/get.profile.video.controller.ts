import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
import { AuthRequest } from "../../Types";
const videosPerPage = 5;
const getProfileVideoController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const page = parseInt(req.query.page as string) || 1;
    const { channelId } = await userModel.findById(userId, { channelId: 1 });
    if (!channelId) {
      throw new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
    }

    await videoModel
      .aggregate([
        {
          $match: {
            channelId: channelId,
          },
        },
        {
          $lookup: {
            from: "channels",
            localField: "channelId",
            foreignField: "_id",
            as: "channelData",
          },
        },
        {
          $unwind: "$channelData",
        },
        // Project only the desired fields from the videos
        {
          $project: {
            _id: 1,
            title: 1,
            createdAt: 1,
            thumbnail: 1,
            views: 1,
            "channelData.channelName": 1,
          },
        },
        // Sort videos by descending order of creation date (recent videos first)
        { $sort: { createdAt: -1 } },
        // Skip videos for previous pages
        { $skip: (page - 1) * videosPerPage },
        // Limit the result to the current page
        { $limit: videosPerPage + 1 },
      ])
      .then((videos) => {
        var payload: { page: number; videos: Object | null } = {
          page: -1,
          videos: [],
        };
        if (videos.length > 0) {
          if (videos.length < videosPerPage + 1) {
            payload.page = -1;
          } else {
            videos.pop();
            payload.page = page;
          }
          payload.videos = videos;
        }

        return res.status(200).json({
          status: "success",
          message: "Videos Fetched successfully",
          data: payload,
        });
      })
      .catch((error) => {
        new AppError(error, 500, "ERR_VIDEOS_FETCH_FAILED");
      });
  }
);

export { getProfileVideoController };
