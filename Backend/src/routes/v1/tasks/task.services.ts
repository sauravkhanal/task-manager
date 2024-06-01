import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import commentServices from "../comments/comment.services";
import { IComment } from "../comments/types";
import { WorkflowStage } from "../workflowStage/types";
import validateTransition from "../workflowStage/workflowRule";
import taskRepository from "./task.repository";
import ITask, { ITaskGroupedByWorkflowStage } from "./types";

const taskServices = {
    createNewTask(taskDetails: Partial<ITask>): Promise<ITask> {
        console.log(taskDetails.tagIDs);
        return taskRepository.createNewTask(taskDetails);
    },

    getTaskById(_id: string): Promise<ITask | null> {
        return taskRepository.getTaskById(_id);
    },

    getAllTasks(): Promise<ITask[] | null> {
        return taskRepository.getAllTasks();
    },

    async updateTaskDetails(_id: string, creatorID: string, newDetails: Partial<ITask>): Promise<ITask | null> {
        if (newDetails.workflowStage) {
            const currentDetail = await taskRepository.getTaskById(_id);
            if (!validateTransition(currentDetail?.workflowStage!, newDetails.workflowStage)) {
                throw new CustomError(
                    400,
                    messages.workflowStage.transitionError(currentDetail?.workflowStage!, newDetails.workflowStage),
                );
            }
        }
        return taskRepository.updateTaskDetails(_id, creatorID, newDetails);
    },

    deleteTask(_id: string, creatorID: string): Promise<ITask | null> {
        return taskRepository.deleteTask(_id, creatorID);
    },

    recoverTask(_id: string, creatorID: string): Promise<ITask | null> {
        return taskRepository.recoverTask(_id, creatorID);
    },

    addAssigneesToTask(_id: string, creatorID: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.addAssigneesToTask(_id, creatorID, ids);
    },

    removeAssigneesFromTask(_id: string, creatorID: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.removeAssigneesFromTask(_id, creatorID, ids);
    },

    addTagsToTask(_id: string, creatorID: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.addTagsToTask(_id, creatorID, ids);
    },

    removeTagsFromTask(_id: string, creatorID: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.removeTagsFromTask(_id, creatorID, ids);
    },

    async addCommentToTask(_id: string, commentData: Partial<IComment>): Promise<ITask | null> {
        const commentDetails = await commentServices.createComment(commentData);
        if (!commentDetails) throw new CustomError(500, messages.failure("creating", "comment"));
        return taskRepository.addCommentToTask(_id, commentDetails._id.toString());
    },

    removeCommentFromTask(_id: string, commentID: string): Promise<ITask | null> {
        return taskRepository.removeCommentFromTask(_id, commentID);
    },

    changeWorkflowStage(
        _id: string,
        currentWorkflowStage: WorkflowStage,
        newWorkflowStage: WorkflowStage,
    ): Promise<ITask | null> {
        if (!validateTransition(currentWorkflowStage, newWorkflowStage)) {
            throw new CustomError(400, messages.workflowStage.transitionError(currentWorkflowStage, newWorkflowStage));
        }
        return taskRepository.changeWorkflowStage(_id, newWorkflowStage);
    },

    async getTasksAssignedToMe(_id: string): Promise<ITaskGroupedByWorkflowStage | null> {
        return taskRepository.getTasksAssignedToMe(_id);
    },
    async getTasksAssignedByMe(_id: string): Promise<ITaskGroupedByWorkflowStage | null> {
        return taskRepository.getTasksAssignedByMe(_id);
    },
};

export default taskServices;
