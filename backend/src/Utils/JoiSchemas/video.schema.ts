import Joi from "joi";
const videoSchema = {
  getPresignedUrl: Joi.object().keys({
    filename: Joi.string().required(),
  }),
  uploadVideo: Joi.object().keys({
    link: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    thumbnail: Joi.string().required(),
    durations: Joi.number().required(),
  }),
};
export { videoSchema };
