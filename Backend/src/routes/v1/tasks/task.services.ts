import mongoose from "mongoose";
import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import { ActivityAction, IActivity } from "../activity/activity.model";
import activityServices from "../activity/activity.services";
import commentServices from "../comments/comment.services";
import { IComment } from "../comments/types";
import { WorkflowStage } from "../workflowStage/types";
import validateTransition from "../workflowStage/workflowRule";
import taskRepository from "./task.repository";
import ITask, { ITaskGroupedByWorkflowStage, ITaskWithDetails } from "./types";
import { IAccessToken } from "../../../types";

const taskServices = {
    async createNewTask(taskDetails: Partial<ITask>, username: string): Promise<ITask> {
        const newActivity = await activityServices.createActivity({
            action: ActivityAction.Created,
            username: username,
        });
        const activityId = new mongoose.Types.ObjectId(newActivity?._id);
        return taskRepository.createNewTask({ ...taskDetails, activityIDs: [activityId] });
    },

    getTaskById(_id: string): Promise<ITaskWithDetails | null> {
        return taskRepository.getTaskById(_id);
    },

    getAllTasks(): Promise<ITask[] | null> {
        return taskRepository.getAllTasks();
    },

    async updateTaskDetails(
        _id: string,
        creatorID: string,
        newDetails: Partial<ITask>,
        username: string,
    ): Promise<ITask | null> {
        const newActivityDetails: IActivity = {
            action: ActivityAction.Updated,
            username,
            updatedFields: Object.keys(newDetails),
        };

        // Perform the update
        if (newDetails.workflowStage || newDetails.priority) {
            const currentDetail = await taskRepository.getTaskById(_id);
            if (newDetails.workflowStage) {
                if (!validateTransition(currentDetail?.workflowStage!, newDetails.workflowStage)) {
                    throw new CustomError(
                        400,
                        messages.workflowStage.transitionError(currentDetail?.workflowStage!, newDetails.workflowStage),
                    );
                }
                newActivityDetails.to = newDetails?.workflowStage;
            } else if (newDetails.priority) {
                newActivityDetails.to = newDetails?.priority;
            }
        }

        const newActivity = await activityServices.createActivity(newActivityDetails);

        return taskRepository.updateTaskDetails(_id, creatorID, newDetails, newActivity?._id!);
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

    async changeWorkflowStage(
        _id: string,
        client: IAccessToken,
        currentWorkflowStage: WorkflowStage,
        newWorkflowStage: WorkflowStage,
    ): Promise<ITask | null> {
        //test if transition is valid
        if (!validateTransition(currentWorkflowStage, newWorkflowStage)) {
            throw new CustomError(400, messages.workflowStage.transitionError(currentWorkflowStage, newWorkflowStage));
        }

        //if valid create activity
        const newActivityDetails: IActivity = {
            action: ActivityAction.Updated,
            username: client.username,
            updatedFields: ["workflowStage"],
            to: newWorkflowStage,
        };

        const activity = await activityServices.createActivity(newActivityDetails);
        if (!activity) throw new CustomError(500, messages.failure("generating", "action for given transition"));
        return taskRepository.changeWorkflowStage(_id, client._id, newWorkflowStage, activity._id);
    },

    async getTasksAssignedToMe(_id: string): Promise<ITaskGroupedByWorkflowStage | null> {
        return taskRepository.getTasksAssignedToMe(_id);
    },
    async getTasksAssignedByMe(_id: string): Promise<ITaskGroupedByWorkflowStage | null> {
        return taskRepository.getTasksAssignedByMe(_id);
    },

    bulkDelete(ids: string[]) {
        return taskRepository.bulkDelete(ids);
    },
    getAllComments(id: string) {
        return taskRepository.getAllComments(id);
    },
    getAllActivities(id: string) {
        return taskRepository.getAllActivities(id);
    },
};

export default taskServices;
