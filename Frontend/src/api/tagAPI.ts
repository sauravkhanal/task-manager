import { IAPIResponse, ITag } from "@/types";
import axiosInstance from "./axiosInstance";

const tagAPI = {
    async getAllTags() {
        try {
            const response = await axiosInstance.get("/tags");
            return response.data as IAPIResponse<ITag[]>;
        } catch (error: any) {
            // return error.response.data as IAPIResponse<unknown>;
            // console.log("Get all tags error: ", error);
            // return null;
            throw error;
        }
    },

    async createTag({ title, description, color }: Partial<ITag>) {
        try {
            const response = await axiosInstance.post("/tags", {
                title,
                description,
                color,
            });
            return response.data as IAPIResponse<ITag>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<Partial<ITag>>;
        }
    },

    async addTasksToTag(data: { tagId: string; tasksIDs: string[] }) {
        try {
            const response = await axiosInstance.post("/tags", data);
            return response.data as IAPIResponse<ITag>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    async removeTasksFromTag(data: { tagId: string; tasksIDs: string[] }) {
        try {
            const response = await axiosInstance.post("/tags", data);
            return response.data as IAPIResponse<ITag>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
};

export default tagAPI;
