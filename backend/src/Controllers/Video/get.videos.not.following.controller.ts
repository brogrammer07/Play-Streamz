import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";
import { AuthRequest } from "../../Types";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";

const getVideosNotFollowing = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const { channelId } = await userModel.findById(userId, { channelId: 1 });

    // await channelModel
    //   .aggregate([
    //     // Match channels that you are not following
    //     {
    //       $match: {
    //         _id: { $ne: channelId },
    //         following: { $not: { $in: [channelId] } },
    //       },
    //     },
    //     // Lookup videos for each channel
    //     {
    //       $lookup: {
    //         from: "videos",
    //         localField: "video",
    //         foreignField: "_id",
    //         as: "video",
    //       },
    //     },
    //     // Deconstruct the videosData array
    //     {
    //       $unwind: "$video",
    //     },
    //     // Project only the desired fields from videosData
    //     {
    //       $project: {
    //         "video.views": 1,
    //         "video.thumbnail": 1,
    //         "video.title": 1,
    //         "video.createdAt": 1,
    //         "video._id": 1,
    //         channelName: 1,
    //       },
    //     },
    //   ])
    videoModel
      .aggregate([
        // Match videos from channels that you are not following
        {
          $lookup: {
            from: "channels",
            localField: "channelId",
            foreignField: "_id",
            as: "channelData",
          },
        },
        // Unwind the channelData array
        {
          $unwind: "$channelData",
        },
        // Match videos from channels that you are not following
        {
          $match: {
            "channelData._id": { $ne: channelId },
            "channelData.follower": { $not: { $in: [channelId] } },
          },
        },
        // Project only the desired fields from the videos
        {
          $project: {
            _id: 1, // Exclude the _id field from the result
            createdAt: 1,
            thumbnail: 1,
            title: 1,
            views: 1,
            "channelData.channelName": 1,
          },
        },
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

export { getVideosNotFollowing };
