import express from "express";
import joiValidator from "../../Utils/joi.validator";
import { videoSchema } from "../../Utils/JoiSchemas/video.schema";
import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";
import { getPresignedUrlController } from "../../Controllers/Video/get.presigned.url.controller";
import { uploadVideoController } from "../../Controllers/Video/upload.video.controller";
import { deleteProfileVideoController } from "../../Controllers/Video/delete.profile.video.controller";
import { getVideosController } from "../../Controllers/Video/get.videos.controller";
import { getAllVideosController } from "../../Controllers/Video/get.all.videos.controller";
import { getSearchVideoController } from "../../Controllers/Video/get.search.video.controller";
import { getAllSearchVideoController } from "../../Controllers/Video/get.all.search.video.controller";
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
    getVideosController
  );

router
  .route("/get-all-videos")
  .get(joiValidator(videoSchema.getVideos, "query"), getAllVideosController);
router
  .route("/get-search-video")
  .get(
    isAuthenticated,
    joiValidator(videoSchema.getSearchVideo, "query"),
    getSearchVideoController
  );
router
  .route("/get-all-search-video")
  .get(
    joiValidator(videoSchema.getSearchVideo, "query"),
    getAllSearchVideoController
  );

router
  .route("/delete-profile-video")
  .post(
    isAuthenticated,
    joiValidator(videoSchema.deleteProfileVideo, "query"),
    deleteProfileVideoController
  );
export default router;
