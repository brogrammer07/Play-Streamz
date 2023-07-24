import express from "express";
import authRoutes from "./Auth/auth.routes";
import videoRoutes from "./Video/video.routes";
const router = express.Router();
router.use(authRoutes);
router.use("/video", videoRoutes);

export default router;
