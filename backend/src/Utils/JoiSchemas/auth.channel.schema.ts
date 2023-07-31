import Joi from "joi";
const authChannelSchema = {
  createChannel: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string(),
    profileUrl: Joi.string(),
    isGoogle: Joi.boolean().required(),
    token: Joi.string().required(),
  }),
};
export { authChannelSchema };
