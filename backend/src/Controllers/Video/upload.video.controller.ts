import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import { AuthRequest } from "../../Types";
import videoModel from "../../Models/video.model";
import channelModel from "../../Models/channel.model";

const uploadVideoController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { link, thumbnail, title, description, tags } = req.body;
    const userId = req.userId;
    const channel = await channelModel.findOne(
      { userId },
      { _id: 1, searchableParams: 1, video: 1 }
    );
    if (!channel) {
      throw new AppError("Channel not found", 404, "ERR_CHANNEL_NOT_FOUND");
    }
    var searchableParams: string = channel.searchableParams;
    for (let i = 0; i < tags.length; i++) {
      searchableParams += " " + tags[i];
    }
    searchableParams += " " + title;
    const video = await videoModel.create({
      link,
      thumbnail,
      title,
      description,
      tags,
      channelId: channel._id,
      searchableParams,
    });
    channel.video.push(video._id);
    await channel.save();
    await video.save();
    return res.status(201).json({
      status: "success",
      message: "Video Uploaded successfully",
      data: video,
    });
  }
);

export { uploadVideoController };
