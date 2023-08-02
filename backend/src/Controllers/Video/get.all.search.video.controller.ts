import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
import { AuthRequest } from "../../Types";

const getAllSearchVideoController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { searchQuery } = req.query;

    await videoModel
      .aggregate([
        // Perform text search on the searchableParams field
        {
          $search: {
            index: "video",
            text: {
              query: searchQuery,
              path: "searchableParams",
            },
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
            description: 1,
            thumbnail: 1,
            title: 1,
            views: 1,
            createdAt: 1,
            channelId: 1,
            channelData: {
              channelName: 1,
              channelprofile: 1,
              followersCount: { $size: "$channelData.follower" },
              // isFollowing: false,
            },
          },
        },
        // Skip videos for previous pages
        //   {
        //     $skip: (page - 1) * videosPerPage,
        //   },
        //   // Limit the result to the current page
        //   {
        //     $limit: videosPerPage,
        //   },
      ])
      .then((result) => {
        return res.status(200).json({
          status: "success",
          message: "Videos Fetched successfully",
          data: result,
        });
      })
      .catch((error) => {
        new AppError(error, 500, "ERR_VIDEOS_FETCH_FAILED");
      });
  }
);

export { getAllSearchVideoController };
