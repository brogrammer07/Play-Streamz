import express from "express";
import joiValidator from "../../Utils/joi.validator";
import { videoSchema } from "../../Utils/JoiSchemas/video.schema";
import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";
import { getPresignedUrlController } from "../../Controllers/Video/get.presigned.url.controller";
import { uploadVideoController } from "../../Controllers/Video/upload.video.controller";
const router = express.Router();
router
  .route("/get-presigned-url")
  .get(
    isAuthenticated,
    joiValidator(videoSchema.getPresignedUrl, "query"),
    getPresignedUrlController
  );
router
  .route("/upload")
  .post(
    isAuthenticated,
    joiValidator(videoSchema.uploadVideo, "body"),
    uploadVideoController
  );

// router.route("/get-videos");
export default router;
