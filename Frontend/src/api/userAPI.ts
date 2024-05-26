import {
    IAPIResponse,
    ILoginResponse,
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
};

export default userAPI;
