import express from "express";
import joiValidator from "../../Utils/joi.validator";
import { authChannelSchema } from "../../Utils/JoiSchemas/auth.channel.schema";
import { createUserController } from "../../Controllers/Auth/create.user.controller";
import { isAuthenticated } from "../../Utils/Auth/is.auth.helper";
import { loginUserController } from "../../Controllers/Auth/login.user.controller";

const router = express.Router();
router
  .route("/sign-up")
  .post(
    joiValidator(authChannelSchema.createChannel, "body"),
    createUserController
  );
router.route("/sign-in").post(isAuthenticated, loginUserController);
export default router;
