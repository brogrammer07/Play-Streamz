import express from "express";
import joiValidator from "../../Utils/joi.validator";
import { videoSchema } from "../../Utils/JoiSchemas/video.schema";
import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";
import { getPresignedUrlController } from "../../Controllers/Video/get.presigned.url.controller";
import { uploadVideoController } from "../../Controllers/Video/upload.video.controller";
import { getVideos } from "../../Controllers/Video/get.videos.controller";
import { getSearchVideo } from "../../Controllers/Video/get.search.video.controller";
import { getAllVideos } from "../../Controllers/Video/get.all.videos.controller";
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

router
  .route("/get-videos")
  .get(
    isAuthenticated,
    joiValidator(videoSchema.getVideos, "query"),
    getVideos
  );

router
  .route("/get-all-videos")
  .get(joiValidator(videoSchema.getVideos, "query"), getAllVideos);
router
  .route("/get-search-video")
  .get(
    isAuthenticated,
    joiValidator(videoSchema.getSearchVideo, "query"),
    getSearchVideo
  );
router
  .route("/video/get-channel-video")
  .get(
    isAuthenticated,
    joiValidator(videoSchema.getSearchVideo, "query"),
    getSearchVideo
  );
export default router;
