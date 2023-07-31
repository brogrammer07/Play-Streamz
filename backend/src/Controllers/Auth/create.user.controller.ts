import { Request, Response } from "express-serve-static-core";
import userModel from "../../Models/user.model";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";
import channelModel from "../../Models/channel.model";

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, profileUrl, isGoogle, token } = req.body;
  const decodedToken = await firebaseAuth.verifyIdToken(token);
  const existingUser = await userModel.findById(decodedToken.uid);
  if (existingUser) return;
  new AppError("User already exists", 409, "ERR_USER_ALREADY_EXISTS");
  if (isGoogle) {
    const user = await userModel.create({
      _id: decodedToken.uid,
      name,
      email,
      profileUrl: profileUrl ? profileUrl : null,
      isGoogle,
    });
    const searchableParams: string = name;
    const channel = await channelModel.create({
      userId: user._id,
      searchableParams,
      channelName: name,
      channelProfile: profileUrl ? profileUrl : null,
    });
    user.channelId = channel._id;
    await user.save();
    await channel.save();
    return res.status(201).json({
      status: "success",
      message: "Channel created successfully",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        profileUrl: user.profileUrl,
        isGoogle: user.isGoogle,
      },
    });
  } else {
    const user = await userModel.create({
      _id: decodedToken.uid,
      name,
      email,
      password,
      profileUrl: profileUrl ? profileUrl : null,
      isGoogle,
    });
    const searchableParams: string = name;
    const channel = await channelModel.create({
      userId: user._id,
      searchableParams,
      channelName: name,
      channelProfile: profileUrl ? profileUrl : null,
    });
    user.channelId = channel._id;
    await user.save();
    await channel.save();
    return res.status(201).json({
      status: "success",
      message: "Channel created successfully",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        profileUrl: user.profileUrl,
        isGoogle: user.isGoogle,
      },
    });
  }
});

export { createUserController };
