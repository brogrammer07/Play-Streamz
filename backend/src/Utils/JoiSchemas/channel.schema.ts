import Joi from "joi";
const channelSchema = {
  followChannel: Joi.object().keys({
    channelId: Joi.string().required(),
  }),
  getChannelInfo: Joi.object().keys({
    channelId: Joi.string(),
  }),
};
export { channelSchema };
