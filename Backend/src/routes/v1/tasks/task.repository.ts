import { WorkflowStage } from "../workflowStage/types";
import TaskModel from "./task.model";
import ITask from "./types";

interface ITaskRepository {
    createNewTask(taskDetails: Partial<ITask>): Promise<ITask>;
    getTaskById(id: string): Promise<ITask | null>;
    updateTaskDetails(id: string, newDetails: Partial<ITask>): Promise<ITask | null>;
    deleteTask(id: string): Promise<ITask | null>;
    recoverTask(id: string): Promise<ITask | null>;
    addAssigneesToTask(taskId: string, assigneeIds: string[]): Promise<ITask | null>;
    removeAssigneesFromTask(taskId: string, assigneeIds: string[]): Promise<ITask | null>;
    addTagsToTask(taskId: string, tagIds: string[]): Promise<ITask | null>;
    removeTagsFromTask(taskId: string, tagIds: string[]): Promise<ITask | null>;
    addCommentToTask(taskId: string, commentId: string): Promise<ITask | null>;
    removeCommentFromTask(taskId: string, commentId: string): Promise<ITask | null>;
    changeWorkflowStage(_id: string, workflowStage: WorkflowStage): Promise<ITask | null>;
}

const taskRepository: ITaskRepository = {
    createNewTask({ creatorID, description, dueDate, priority, title, assigneeIDs }: Partial<ITask>): Promise<ITask> {
        const newTask = new TaskModel({ creatorID, description, dueDate, priority, title, assigneeIDs });
        return newTask.save();
    },

    getTaskById(_id: string): Promise<ITask | null> {
        return TaskModel.findById({ _id });
    },

    updateTaskDetails(_id: string, newDetails: Partial<ITask>): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, newDetails, { new: true });
    },

    deleteTask(_id: string): Promise<ITask | null> {
        return this.updateTaskDetails(_id, { deleted: true });
    },

    recoverTask(_id: string): Promise<ITask | null> {
        return this.updateTaskDetails(_id, { deleted: false });
    },

    addAssigneesToTask(_id: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { $push: { assigneeIDs: id } });
    },

    removeAssigneesFromTask(_id: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { $pull: { assigneeIDs: id } });
    },

    addTagsToTask(_id: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { $push: { tagIDs: id } });
    },

    removeTagsFromTask(_id: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { $pull: { tagIDs: id } });
    },

    addCommentToTask(_id: string, commentID: string): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { $push: { commentID } });
    },

    removeCommentFromTask(_id: string, commentID: string): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { $pull: { commentID } });
    },

    changeWorkflowStage(_id: string, workflowStage: string): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id }, { workflowStage });
    },
};

export default taskRepository;
