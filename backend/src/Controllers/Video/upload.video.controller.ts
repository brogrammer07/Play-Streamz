import { Request, Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";
import { AuthRequest } from "../../Types";
import videoModel from "../../Models/video.model";

const uploadVideoController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { link, thumbnail, title, description, duration } = req.body;
    const userId = req.userId;
    const video = await videoModel.create({
      link,
      thumbnail,
      title,
      description,
      duration,
    });
    await video.save();
    return res.status(201).json({
      status: "success",
      message: "Video Uploaded successfully",
      data: video,
    });
  }
);

export { uploadVideoController };
