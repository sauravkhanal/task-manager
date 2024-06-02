import {
    IAPIResponse,
    IAllTask,
    ITask,
    ITaskWithDetails,
    ITasksGroupedByWorkFlowStage,
    WorkflowStage,
} from "@/types";
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
            return response.data as IAPIResponse<ITaskWithDetails[]>;
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
    async recoverTask(id: string) {
        try {
            const response = await axiosInstance.patch(`/tasks/${id}/recover`);
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
            const response = await axiosInstance.patch(
                `/tasks/${id}`,
                taskDetails,
            );
            return response.data as IAPIResponse<ITask>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    async ChangeWorkflowStage({
        id,
        currentWorkflowStage,
        newWorkflowStage,
    }: {
        id: string;
        currentWorkflowStage: WorkflowStage;
        newWorkflowStage: WorkflowStage;
    }) {
        try {
            const response = await axiosInstance.patch(
                `/tasks/${id}/workflow`,
                { currentWorkflowStage, newWorkflowStage },
            );
            return response.data as IAPIResponse<ITask>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },

    async getTasksAssignedToMe() {
        try {
            const response = await axiosInstance.get(`tasks/assigned-to-me`);
            return response.data as IAPIResponse<ITasksGroupedByWorkFlowStage>;
        } catch (error: any) {
            return error.response
                .data as IAPIResponse<ITasksGroupedByWorkFlowStage>;
        }
    },
    async getTasksAssignedByMe() {
        try {
            const response = await axiosInstance.get(`tasks/assigned-by-me`);
            return response.data as IAPIResponse<ITasksGroupedByWorkFlowStage>;
        } catch (error: any) {
            return error.response
                .data as IAPIResponse<ITasksGroupedByWorkFlowStage>;
        }
    },
};

export default taskAPI;
