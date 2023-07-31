import express from "express";
import authRoutes from "./Auth/auth.routes";
import videoRoutes from "./Video/video.routes";
import channelRoutes from "./Channel/channel.routes";
const router = express.Router();
router.use(authRoutes);
router.use("/video", videoRoutes);
router.use("/channel", channelRoutes);

export default router;
