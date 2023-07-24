import { Request, Response } from "express-serve-static-core";
import channelModel from "../../Models/channel.model";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";

const createChannelController = catchAsync(
  async (req: Request, res: Response) => {
    const { name, email, password, profileUrl, isGoogle, token } = req.body;
    const existingUser = await channelModel.findOne({ email });
    if (existingUser) return;
    new AppError("Channel already exists", 409, "ERR_Channel_ALREADY_EXISTS");

    if (isGoogle) {
      const user = await channelModel.create({
        name,
        email,
        isGoogle,
        profileUrl: profileUrl ? profileUrl : null,
      });
      await user.save();
      await firebaseAuth.verifyIdToken(token);
      return res.status(201).json({
        status: "success",
        message: "Channel created successfully",
        data: {
          email: user.email,
          name: user.name,
          profileUrl: user.profileUrl,
          _id: user._id,
          isGoogle: user.isGoogle,
        },
      });
    }

    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const user = await channelModel.create({
      userId: decodedToken.uid,
      name,
      email,
      password,
      profileUrl: profileUrl ? profileUrl : null,
      isGoogle,
    });
    await user.save();
    return res.status(201).json({
      status: "success",
      message: "Channel created successfully",
      data: {
        email: user.email,
        name: user.name,
        profileUrl: user.profileUrl,
        userId: user.userId,
        isGoogle: user.isGoogle,
      },
    });
  }
);

export { createChannelController };
