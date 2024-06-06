import {
    IAPIResponse,
    IAllTask,
    IComment,
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

    async bulkDelete(ids: string[]) {
        try {
            const response = await axiosInstance.post("/tasks/bulk-delete", {
                ids,
            });
            return response.data as IAPIResponse<unknown>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },

    async getAllComments(commentIDs: string[]) {
        try {
            const response = await axiosInstance.post(
                "/comments/get-comments",
                {
                    commentIDs,
                },
            );
            return response.data as IAPIResponse<IComment[]>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    // async createComment(description: string) {
    //     try {
    //         const response = await axiosInstance.post("/comments", {
    //             description,
    //         });

    //         return response.data as IAPIResponse<IComment>;
    //     } catch (error: any) {
    //         return error.response.data as IAPIResponse<unknown>;
    //     }
    // },
    // async deleteComment(commentID: string) {
    //     try {
    //         const response = await axiosInstance.delete(
    //             `/comments/${commentID}`,
    //         );
    //         return response.data as IAPIResponse<IComment>;
    //     } catch (error: any) {
    //         return error.response.data as IAPIResponse<unknown>;
    //     }
    // },
    // async deleteComment(commentID: string) {
    //     try {
    //         const response = await axiosInstance.delete(
    //             `/comments/${commentID}`,
    //         );
    //         return response.data as IAPIResponse<IComment>;
    //     } catch (error: any) {
    //         return error.response.data as IAPIResponse<unknown>;
    //     }
    // },

    async createComment(taskID: string, description: string) {
        try {
            const response = await axiosInstance.post(
                `/tasks/${taskID}/comments`,
                {
                    description,
                },
            );

            return response.data as IAPIResponse<IComment>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    async deleteComment(taskID: string, commentID: string) {
        try {
            const response = await axiosInstance.delete(
                `/comments/${taskID}/${commentID}`,
            );

            return response.data as IAPIResponse<IComment>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
    async updateComment(commentID: string, description: string) {
        try {
            const response = await axiosInstance.patch(
                `/comments/${commentID}`,
                { description },
            );

            return response.data as IAPIResponse<IComment>;
        } catch (error: any) {
            return error.response.data as IAPIResponse<unknown>;
        }
    },
};

export default taskAPI;
