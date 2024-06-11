import { NextFunction, Request, Response } from "express";
import authRepository from "./auth.service";
import { failureResponse, successResponse } from "../../../utils/ApiResponse";
import { messages } from "../../../utils/Messages";
import authService from "./auth.service";
import OTPModel from "../../../models/OTPModel";

const authController = {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userDetails: { emailOrUsername: string; password: string } = { ...req.body };
            const result = await authRepository.login(userDetails.emailOrUsername, userDetails.password);
            return successResponse(res, 200, messages.auth.login_success, result);
        } catch (error) {
            next(error);
        }
    },

    async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");
            const accessToken = await authService.refreshAccessToken(refreshToken);
            return successResponse(res, 200, messages.token.renew_success, accessToken);
        } catch (error) {
            next(error);
        }
    },

    async verifyOTP(req: Request, res: Response, next: NextFunction) {
        try {
            const { OTP } = req.params;
            const result = await OTPModel.verifyOTP(parseInt(OTP));
            if (result) {
                return successResponse(res, 200, messages.OTP.verification_success);
            } else return failureResponse(res, 400, messages.OTP.invalid_otp);
        } catch (error) {
            next(error);
        }
    },

    async regenerateOTP(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;
            const status = await OTPModel.regenerateOTP(email);

            if (status) return successResponse(res, 200, messages.OTP.regeneration_success);
            else return failureResponse(res, 400, messages.OTP.regeneration_failed);
        } catch (error) {
            next(error);
        }
    },

    async generateResetPasswordToken(
        req: Request<{ emailOrUsername: string }, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { emailOrUsername } = req.params;
            await authService.generateResetPasswordToken(emailOrUsername);
            return successResponse(res, 200, messages.auth.passwordResetMailSent);
        } catch (error) {
            next(error);
        }
    },

    async resetPassword(
        req: Request<unknown, unknown, { resetToken: string; newPassword: string }, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { resetToken, newPassword } = req.body;
            const result = await authService.resetPassword(resetToken, newPassword);
            if (result) return successResponse(res, 200, messages.success("reset", "password"));
            return failureResponse(res, 500, messages.failure("resetting", "password"));
        } catch (error) {
            next(error);
        }
    },
};
export default authController;
