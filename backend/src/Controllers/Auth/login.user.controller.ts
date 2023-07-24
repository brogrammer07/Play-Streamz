import { Request, Response } from "express-serve-static-core";
import channelModel from "../../Models/channel.model";
import catchAsync from "../../Utils/catch.async";
import { AppError } from "../../Utils/app.error.handle";
import firebaseAuth from "../../Config/firebase.auth.config";
import { AuthRequest } from "../../Types";

const loginUserController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const user = await channelModel.findOne({ userId: req.userId });
    return res.status(201).json({
      status: "success",
      message: "User data",
      data: user,
    });
  }
);

export { loginUserController };
