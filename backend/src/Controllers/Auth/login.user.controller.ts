import { Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";

import { AuthRequest } from "../../Types";
import userModel from "../../Models/user.model";

const loginUserController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const user = await userModel.findById(req.userId);
    return res.status(201).json({
      status: "success",
      message: "User data",
      data: user,
    });
  }
);

export { loginUserController };
