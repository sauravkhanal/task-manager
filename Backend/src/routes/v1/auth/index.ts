import { Router } from "express";
import authController from "./auth.controller";
import requireLogin from "../../../middleware/requireLogin";

const authRouter = Router();

authRouter.post("/", authController.login);
authRouter.post("/refresh", requireLogin, authController.refreshAccessToken);
authRouter.post("/verify/:OTP", authController.verifyOTP);
authRouter.get("/regenerate/:email", authController.regenerateOTP);
authRouter.post("/forgot-password/:emailOrUsername", authController.generateResetPasswordToken);
authRouter.patch("/reset-password", authController.resetPassword);

export default authRouter;
