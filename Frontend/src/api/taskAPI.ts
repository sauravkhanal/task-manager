import { IAPIResponse, ILoginResponse, ITask, IUserLoginData } from "@/types";
import axiosInstance from "./axiosInstance";

const taskAPI = {
    async CreateTask(taskData: ITask) {
        try {
            const response = await axiosInstance.post("/tasks", taskData);
            return response.data as IAPIResponse<Partial<ITask>>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<Partial<ITask>>;
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
};

export default taskAPI;
