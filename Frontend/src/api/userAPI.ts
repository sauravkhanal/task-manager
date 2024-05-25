import { IAPIResponse, IUserRegisterData } from "@/types";
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
};

export default userAPI;
