import Joi from "joi";
const videoSchema = {
  getPresignedUrl: Joi.object().keys({
    videoFileName: Joi.string().required(),
    videoFileType: Joi.string().required(),
    imageFileName: Joi.string().required(),
    imageFileType: Joi.string().required(),
  }),
  uploadVideo: Joi.object().keys({
    link: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    thumbnail: Joi.string().required(),
  }),
  getVideosForUser: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  getSearchVideo: Joi.object().keys({
    searchQuery: Joi.string().required(),
  }),
  getVideos: Joi.object().keys({
    page: Joi.string(),
  }),
  deleteProfileVideo: Joi.object().keys({
    videoId: Joi.string().required(),
  }),
};
export { videoSchema };
