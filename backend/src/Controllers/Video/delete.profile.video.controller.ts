import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";
import { AuthRequest } from "../../Types";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";
import mongoose from "mongoose";

const deleteProfileVideoController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { videoId } = req.query;
    const userId = req.userId;
    const { _id: channelId } = await channelModel.findOne(
      { userId },
      { _id: 1 }
    );
    if (!channelId) {
      throw new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
    }

    const deletedVideo = await videoModel.findOneAndDelete({ _id: videoId });
    if (!deletedVideo) {
      throw new AppError("Video not found", 404, "ERR_VIDEO_NOT_FOUND");
    }

    await channelModel.findByIdAndUpdate(
      channelId,
      { $pull: { video: videoId } },
      { new: true }
    );

    await channelModel.updateMany(
      {
        $or: [
          { liked: { $in: [new mongoose.Types.ObjectId(videoId as string)] } },
          { saved: { $in: [new mongoose.Types.ObjectId(videoId as string)] } },
        ],
      },
      {
        $pull: { liked: videoId, saved: videoId },
      }
    );

    return res.status(201).json({
      status: "success",
      message: "Video deleted successfully",
      data: {},
    });
  }
);

export { deleteProfileVideoController };
