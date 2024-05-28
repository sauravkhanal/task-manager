import { WorkflowStage } from "../workflowStage/types";
import TaskModel from "./task.model";
import ITask from "./types";

interface ITaskRepository {
    createNewTask(taskDetails: Partial<ITask>): Promise<ITask>;
    getTaskById(_id: string): Promise<ITask | null>;
    updateTaskDetails(_id: string, creatorID: string, newDetails: Partial<ITask>): Promise<ITask | null>;
    deleteTask(_id: string, creatorID: string): Promise<ITask | null>;
    recoverTask(_id: string, creatorID: string): Promise<ITask | null>;
    addAssigneesToTask(_id: string, creatorID: string, assigneeIds: string[]): Promise<ITask | null>;
    removeAssigneesFromTask(_id: string, creatorID: string, assigneeIds: string[]): Promise<ITask | null>;
    addTagsToTask(_id: string, creatorID: string, tagIds: string[]): Promise<ITask | null>;
    removeTagsFromTask(_id: string, creatorID: string, tagIds: string[]): Promise<ITask | null>;
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
        return TaskModel.findById({ _id })
            .populate([
                { path: "creatorID", select: "-password" },
                { path: "assigneeIDs", select: "-password" },
            ])
            .exec();
    },

    updateTaskDetails(_id: string, creatorID: string, newDetails: Partial<ITask>): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, newDetails, { new: true });
    },

    deleteTask(_id: string, creatorID: string): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { deleted: true });
    },

    recoverTask(_id: string, creatorID: string): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { deleted: false });
    },

    addAssigneesToTask(_id: string, creatorID: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $push: { assigneeIDs: id } });
    },

    removeAssigneesFromTask(_id: string, creatorID: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $pull: { assigneeIDs: id } });
    },

    addTagsToTask(_id: string, creatorID: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $push: { tagIDs: id } });
    },

    removeTagsFromTask(_id: string, creatorID: string, id: string[]): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $pull: { tagIDs: id } });
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
