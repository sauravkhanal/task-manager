import {
    IAPIResponse,
    ILoginResponse,
    IUserDetails,
    IUserLoginData,
    IUserRegisterData,
} from "@/types";
import axiosInstance from "./axiosInstance";

const userAPI = {
    async createUser(userData: IUserRegisterData) {
        try {
            const response = await axiosInstance.post("/users", userData);
            return response.data as IAPIResponse<Partial<IUserRegisterData>>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<
                Partial<IUserRegisterData>
            >;
        }
    },

    async login(userData: IUserLoginData) {
        try {
            const response = await axiosInstance.post("/auth", userData);
            return response.data as IAPIResponse<ILoginResponse>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<Partial<IUserLoginData>>;
        }
    },

    async verifyOTP(OTP: string) {
        try {
            const response = await axiosInstance.post(`/auth/verify/${OTP}`);
            return response.data as IAPIResponse<{}>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<{}>;
        }
    },

    async getAllUsers() {
        try {
            const response = await axiosInstance.get("/users");
            return response.data as IAPIResponse<IUserDetails[]>;
        } catch (error: any) {
            // return error.response.data as IAPIResponse<unknown>;
            console.log("Get all users error: ", error);
            // return null;
            throw error;
        }
    },

    async getUserByUsername(username: string) {
        try {
            const response = await axiosInstance.get(`/users/${username}`);
            return response.data as IAPIResponse<IUserDetails>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<Partial<unknown>>;
        }
    },

    async sendPasswordResetRequest(usernameOrEmail: string) {
        try {
            const response = await axiosInstance.post(
                `/auth/forgot-password/${usernameOrEmail}`,
            );
            return response.data as IAPIResponse<unknown>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<Partial<unknown>>;
        }
    },

    async resetPassword(data: { resetToken: string; newPassword: string }) {
        try {
            const response = await axiosInstance.patch(
                `/auth/reset-password`,
                data,
            );
            return response.data as IAPIResponse<unknown>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<Partial<unknown>>;
        }
    },
};

export default userAPI;
