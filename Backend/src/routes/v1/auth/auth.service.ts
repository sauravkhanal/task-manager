import { IUserDocument } from "../../../models/userModel";
import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import comparePassword, { hashPassword } from "../../../utils/bcrypt";
import { checkToken, signJWT } from "../../../utils/jwt";
import { sendPasswordResetMail } from "../../../utils/mail";
import userRepository from "../users/user.repository";

const authService = {
    async login(emailOrUsername: string, password: string) {
        const user = await userRepository.findUserByUsernameOrEmail(emailOrUsername);
        if (user) {
            const match = await comparePassword(password, user.password);
            if (match) {
                const {
                    _id,
                    firstName,
                    middleName,
                    lastName,
                    emailVerified,
                    username,
                    email,
                    role,
                    deleted,
                    deactivated,
                    profilePicture,
                } = user;
                const accessToken = signJWT({ _id, username, email, role }, "accessToken");
                const refreshToken = signJWT({ _id, username, email }, "refreshToken");
                return {
                    accessToken,
                    refreshToken,
                    userDetails: {
                        _id,
                        firstName,
                        middleName,
                        lastName,
                        username,
                        email,
                        emailVerified,
                        role,
                        deactivated,
                        deleted,
                        profilePicture,
                    },
                };
            }
        }
        throw new CustomError(404, messages.auth.invalid_account);
    },

    async refreshAccessToken(refreshToken: string) {
        const userData = checkToken(refreshToken, "refreshToken") as IUserDocument;
        if (!userData) throw new CustomError(400, messages.token.invalid_token);

        const { _id, username, email } = userData;
        const user = await userRepository.findUserByData({ _id, username, email });
        if (!user) throw new CustomError(400, messages.auth.invalid_account);

        const accessToken = signJWT(
            { _id: user?._id, username: user?.username, email: user?.email, role: user?.role },
            "accessToken",
        );
        return { accessToken };
    },

    async generateResetPasswordToken(emailOrUsername: string) {
        const userDetails = await userRepository.findUserByUsernameOrEmail(emailOrUsername);
        if (userDetails) {
            const { _id, email, username } = userDetails;
            const resetToken = signJWT({ _id, email, username }, "accessToken", { expiresIn: "5m" });
            await sendPasswordResetMail(email, resetToken);
        }
        return;
    },

    async resetPassword(resetToken: string, newPassword: string) {
        try {
            const userDetails = checkToken(resetToken) as { _id: string; email: string; username: string };
            const hashedPassword = await hashPassword(newPassword);
            const result = await userRepository.resetPassword(userDetails._id, (newPassword = hashedPassword));
            if (result) return true;
            return false;
        } catch (error) {
            throw error;
        }
    },
};

export default authService;
