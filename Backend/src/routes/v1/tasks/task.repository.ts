import mongoose, { UpdateWriteOpResult } from "mongoose";
import { WorkflowStage } from "../workflowStage/types";
import TaskModel from "./task.model";
import ITask, { ITaskGroupedByWorkflowStage, ITaskWithDetails } from "./types";
import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";

interface ITaskRepository {
    createNewTask(taskDetails: Partial<ITask>): Promise<ITask>;
    getTaskById(_id: string): Promise<ITaskWithDetails | null>;
    getAllTasks(): Promise<ITask[] | null>;
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
    getTasksAssignedToMe(_id: string): Promise<ITaskGroupedByWorkflowStage | null>;
    getTasksAssignedByMe(_id: string): Promise<ITaskGroupedByWorkflowStage>;
    bulkDelete(_ids: string[]): Promise<UpdateWriteOpResult>;
}

const taskRepository: ITaskRepository = {
    createNewTask(taskDetails) {
        const newTask = new TaskModel(taskDetails);
        return newTask.save();
    },

    async getTaskById(_id) {
        const newID = new mongoose.Types.ObjectId(_id);
        const task = await TaskModel.aggregate(taskPopulatePipeline({ _id: newID }, { createdAt: -1 }));
        if (task[0]) return task[0] as ITaskWithDetails;
        throw new CustomError(400, messages.error.not_found("task with given task id"));
    },

    getAllTasks() {
        return TaskModel.aggregate(taskPopulatePipeline({ deleted: false }, { createdAt: -1 }));
    },

    updateTaskDetails(_id, creatorID, newDetails) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, newDetails, { new: true });
    },

    deleteTask(_id, creatorID) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { deleted: true }, { new: true });
    },

    recoverTask(_id, creatorID) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { deleted: false }, { new: true });
    },

    addAssigneesToTask(_id, creatorID, id) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $push: { assigneeIDs: id } }, { new: true });
    },

    removeAssigneesFromTask(_id, creatorID, id) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $pull: { assigneeIDs: id } }, { new: true });
    },

    addTagsToTask(_id, creatorID, id) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $push: { tagIDs: id } }, { new: true });
    },

    removeTagsFromTask(_id, creatorID, id) {
        return TaskModel.findOneAndUpdate({ _id, creatorID }, { $pull: { tagIDs: id } }, { new: true });
    },

    addCommentToTask(_id, commentID) {
        return TaskModel.findOneAndUpdate({ _id }, { $push: { commentID } });
    },

    removeCommentFromTask(_id, commentID) {
        return TaskModel.findOneAndUpdate({ _id }, { $pull: { commentID } }, { new: true });
    },

    changeWorkflowStage(_id, workflowStage) {
        return TaskModel.findOneAndUpdate({ _id }, { workflowStage }, { new: true });
    },

    bulkDelete(_ids) {
        return TaskModel.updateMany({ _id: { $in: _ids } }, { deleted: true });
    },

    // getTasksAssignedToMe(_id: string) {
    //     return TaskModel.find({ assigneeIDs: _id });
    // },
    async getTasksAssignedToMe(_id) {
        try {
            const tasks = await TaskModel.aggregate(
                customAggregationPipeline(
                    {
                        assigneeIDs: new mongoose.Types.ObjectId(_id),
                        deleted: false,
                    },
                    { createdAt: -1 },
                ),
            );
            const tasksByWorkflowStage = tasks.reduce((acc, curr) => {
                acc[curr.workflowStage] = curr.tasks;
                return acc;
            }, {});
            return tasksByWorkflowStage;
        } catch (error) {
            console.error("Error fetching categorized tasks:", error);
            throw error;
        }
    },
    async getTasksAssignedByMe(_id) {
        try {
            const matchStage = { creatorID: new mongoose.Types.ObjectId(_id), deleted: false };
            const sort = { dueDate: 1 };
            const tasks = await TaskModel.aggregate(customAggregationPipeline(matchStage, { dueDate: 1 }));
            const tasksByWorkflowStage: ITaskGroupedByWorkflowStage = tasks.reduce((acc, curr) => {
                acc[curr.workflowStage] = curr.tasks;
                return acc;
            }, {});
            return tasksByWorkflowStage;
        } catch (error) {
            console.error("Error fetching categorized tasks:", error);
            throw error;
        }
    },
};

export default taskRepository;

const customAggregationPipeline = (matchStage: Record<string, any> = {}, sort: Record<string, any> = {}) => {
    return [
        { $match: matchStage },
        {
            $lookup: {
                from: "users",
                localField: "creatorID",
                foreignField: "_id",
                as: "creator",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assigneeIDs",
                foreignField: "_id",
                as: "assignees",
            },
        },
        {
            $lookup: {
                from: "tags",
                localField: "tagIDs",
                foreignField: "_id",
                as: "tags",
            },
        },
        {
            $project: {
                "creator.password": 0,
                "assignees.password": 0,
            },
        },
        {
            $group: {
                _id: "$workflowStage",
                tasks: {
                    $push: "$$ROOT",
                },
            },
        },
        {
            $addFields: {
                workflowStage: "$_id",
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: sort,
        },
    ];
};

const taskPopulatePipeline = (matchStage: Record<string, any> = {}, sort: Record<string, any> = {}) => {
    return [
        { $match: matchStage },
        {
            $lookup: {
                from: "users",
                localField: "creatorID",
                foreignField: "_id",
                as: "creator",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assigneeIDs",
                foreignField: "_id",
                as: "assignees",
            },
        },
        {
            $lookup: {
                from: "tags",
                localField: "tagIDs",
                foreignField: "_id",
                as: "tags",
            },
        },
        {
            $project: {
                "creator.password": 0,
                "assignees.password": 0,
            },
        },
        {
            $sort: sort,
        },
    ];
};
