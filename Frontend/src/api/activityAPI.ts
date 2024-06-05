import { IAPIResponse, IActivityDocument } from "@/types";
import axiosInstance from "./axiosInstance";

const activityAPI = {
    async getActivities(activityIDs: string[]) {
        try {
            const response = await axiosInstance.post("/activities/", {
                activityIDs,
            });
            return response.data as IAPIResponse<IActivityDocument[]>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
};

export default activityAPI;
