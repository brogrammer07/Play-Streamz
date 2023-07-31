import { Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";

import { AuthRequest } from "../../Types";
import userModel from "../../Models/user.model";
import { AppError } from "../../Utils/app.error.handle";
import channelModel from "../../Models/channel.model";

const followChannelController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    try {
      const { channelId } = req.query;
      const { channelId: currentUserchannelId } = await userModel.findById(
        req.userId,
        { channelId: 1 }
      );
      if (!currentUserchannelId)
        throw new AppError(
          "Current Channel not found",
          404,
          "ERR_CHANNEL_NOT_FOUND"
        );
      const channel = await channelModel.findById(channelId, {
        _id: 1,
        follower: 1,
      });

      if (!channel) {
        throw new AppError(
          "Target Channel not found",
          404,
          "ERR_CHANNEL_NOT_FOUND"
        );
      }

      const isFollowing = channel.follower.includes(currentUserchannelId);
      if (isFollowing) {
        // Unfollow the channel
        await channelModel.updateOne(
          { _id: channelId },
          { $pull: { follower: currentUserchannelId } }
        );

        await channelModel.updateOne(
          { _id: currentUserchannelId },
          { $pull: { following: channelId } }
        );
        console.log("Unfollowed the channel.");
        return res.status(200).json({
          status: "success",
          message: "Channel unfollowed successfully",
          data: {},
        });
      } else {
        // Follow the channel
        await channelModel.updateOne(
          { _id: channelId },
          { $addToSet: { follower: currentUserchannelId } }
        );

        await channelModel.updateOne(
          { _id: currentUserchannelId },
          { $addToSet: { following: channelId } }
        );
        console.log("Followed the channel.");
        return res.status(200).json({
          status: "success",
          message: "Channel followed successfully",
          data: {},
        });
      }
    } catch (error) {
      throw new AppError(error, 500, "ERR_WHILE_UPDATING_CHANNEL");
    }
  }
);

export { followChannelController };
