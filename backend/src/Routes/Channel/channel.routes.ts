import express from "express";
import joiValidator from "../../Utils/joi.validator";

import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";

import { followChannelController } from "../../Controllers/Channel/follow.channel.controller";
import { channelSchema } from "../../Utils/JoiSchemas/channel.schema";

import { getProfileVideoController } from "../../Controllers/Channel/get.profile.video.controller";
import { getProfileFollowerController } from "../../Controllers/Channel/get.profile.follower.controller";
import { getProfileFollowingController } from "../../Controllers/Channel/get.profile.following.controller";
import { getProfileAboutController } from "../../Controllers/Channel/get.profile.about.controller";
import { getProfileInfoController } from "../../Controllers/Channel/get.profile.info.controller";
import { getChannelInfoController } from "../../Controllers/Channel/get.channel.info.controller";
const router = express.Router();
router
  .route("/follow")
  .patch(
    isAuthenticated,
    joiValidator(channelSchema.followChannel, "query"),
    followChannelController
  );
router
  .route("/get-profile-info")
  .get(isAuthenticated, getProfileInfoController);
router
  .route("/get-channel-info")
  .get(
    joiValidator(channelSchema.getChannelInfo, "query"),
    getChannelInfoController
  );

router
  .route("/get-profile-video")
  .get(
    isAuthenticated,
    joiValidator(channelSchema.getProfileVideo, "query"),
    getProfileVideoController
  );
router
  .route("/get-channel-following")
  .get(
    isAuthenticated,
    joiValidator(channelSchema.getChannelFollowing, "query"),
    getProfileFollowingController
  );
router
  .route("/get-channel-follower")
  .get(
    isAuthenticated,
    joiValidator(channelSchema.getChannelFollower, "query"),
    getProfileFollowerController
  );
router
  .route("/get-profile-about")
  .get(isAuthenticated, getProfileAboutController);

export default router;
