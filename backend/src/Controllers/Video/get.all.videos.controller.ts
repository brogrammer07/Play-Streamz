import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";
import { AuthRequest } from "../../Types";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import userModel from "../../Models/user.model";
const videosPerPage = 3;
const getAllVideosController = catchAsync(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  try {
    const videos = await videoModel.aggregate([
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
      // Sort videos by descending order of creation date (recent videos first)
      { $sort: { createdAt: -1 } },
      // Skip videos for previous pages
      { $skip: (page - 1) * videosPerPage },
      // Limit the result to the current page
      { $limit: videosPerPage + 1 },
    ]);

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
  } catch (error) {
    new AppError(error, 500, "ERR_VIDEOS_FETCH_FAILED");
  }
});

export { getAllVideosController };
