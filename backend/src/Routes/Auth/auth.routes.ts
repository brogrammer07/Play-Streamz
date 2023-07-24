import express from "express";
import joiValidator from "../../Utils/joi.validator";
import { authChannelSchema } from "../../Utils/JoiSchemas/auth.channel.schema";
import { createChannelController } from "../../Controllers/Auth/create.channel.controller";
import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";
import { loginUserController } from "../../Controllers/Auth/login.user.controller";

const router = express.Router();
router
  .route("/sign-up")
  .post(
    joiValidator(authChannelSchema.createChannel, "body"),
    createChannelController
  );
router.route("/sign-in").post(isAuthenticated, loginUserController);
export default router;
