import express from "express";
import joiValidator from "../../Utils/joi.validator";
import { videoSchema } from "../../Utils/JoiSchemas/video.schema";
import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";
import { getPresignedUrlController } from "../../Controllers/Video/get.presigned.url.controller";
import { uploadVideoController } from "../../Controllers/Video/upload.video.controller";
import { followChannelController } from "../../Controllers/Channel/follow.channel.controller";
import { channelSchema } from "../../Utils/JoiSchemas/channel.schema";
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
  .route("/get-info")
  .get(
    isAuthenticated,
    joiValidator(channelSchema.getChannelInfo, "query"),
    getChannelInfoController
  );

// router.route("/get-videos");
export default router;
