import { IAPIResponse, IAllTask, ITask } from "@/types";
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

    async getAllTasks() {
        try {
            const response = await axiosInstance.get("/tasks");
            return response.data as IAPIResponse<IAllTask[]>;
        } catch (error: any) {
            return null;
        }
    },
    async getTask(id: string) {
        try {
            const response = await axiosInstance.get(`/tasks/${id}`);
            return response.data as IAPIResponse<ITask>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    async deleteTask(id: string) {
        try {
            const response = await axiosInstance.delete(`/tasks/${id}`);
            return response.data as IAPIResponse<ITask>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    async updateTask({
        id,
        taskDetails,
    }: {
        id: string;
        taskDetails: Partial<ITask>;
    }) {
        try {
            const response = await axiosInstance.post(
                `/tasks/${id}`,
                taskDetails,
            );
            return response.data as IAPIResponse<ITask>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
};

export default taskAPI;
