import Joi from "joi";
const channelSchema = {
  followChannel: Joi.object().keys({
    channelId: Joi.string().required(),
  }),
  getChannelInfo: Joi.object().keys({
    channelId: Joi.string().required(),
  }),
  getProfileVideo: Joi.object().keys({
    page: Joi.string().required(),
  }),
  getChannelFollowing: Joi.object().keys({
    page: Joi.string().required(),
  }),
  getChannelFollower: Joi.object().keys({
    page: Joi.string().required(),
  }),
};
export { channelSchema };
