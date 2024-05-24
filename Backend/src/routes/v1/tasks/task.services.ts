import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import { WorkflowStage } from "../workflowStage/types";
import validateTransition from "../workflowStage/workflowRule";
import taskRepository from "./task.repository";
import ITask from "./types";

const taskServices = {
    createNewTask({ creatorID, title, description, dueDate, priority, assigneeIDs }: Partial<ITask>): Promise<ITask> {
        return taskRepository.createNewTask({ creatorID, title, description, dueDate, priority, assigneeIDs });
    },

    getTaskById(_id: string): Promise<ITask | null> {
        return taskRepository.getTaskById(_id);
    },

    updateTaskDetails(_id: string, newDetails: Partial<ITask>): Promise<ITask | null> {
        return taskRepository.updateTaskDetails(_id, newDetails);
    },

    deleteTask(_id: string): Promise<ITask | null> {
        return taskRepository.deleteTask(_id);
    },

    recoverTask(_id: string): Promise<ITask | null> {
        return taskRepository.recoverTask(_id);
    },

    addAssigneesToTask(_id: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.addAssigneesToTask(_id, ids);
    },

    removeAssigneesFromTask(_id: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.removeAssigneesFromTask(_id, ids);
    },

    addTagsToTask(_id: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.addTagsToTask(_id, ids);
    },

    removeTagsFromTask(_id: string, ids: string[]): Promise<ITask | null> {
        return taskRepository.removeTagsFromTask(_id, ids);
    },

    addCommentToTask(_id: string, commentID: string): Promise<ITask | null> {
        return taskRepository.addCommentToTask(_id, commentID);
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
};

export default taskServices;
