import mongoose from "mongoose";
import { IWorkflowStage, WorkflowStage } from "../workflowStage/types";
import { IUser } from "../users/types";
import ITag from "../tags/types";

export enum TaskPriority {
    LOW = "LOW",
    MED = "MED",
    HIGH = "HIGH",
}

export default interface ITask {
    title: string;
    description?: string;
    tagIDs: mongoose.Types.ObjectId[];
    dueDate: Date;
    priority: TaskPriority;
    workflowStage: WorkflowStage;
    creatorID: mongoose.Types.ObjectId;
    assigneeIDs: mongoose.Types.ObjectId[];
    commentIDs?: mongoose.Types.ObjectId[];
    attachmentIDs?: mongoose.Types.ObjectId[];
    activityIDs?: mongoose.Types.ObjectId[];
    deleted: boolean;
}

export interface ITaskDocument extends ITask {
    _id: mongoose.Types.ObjectId;
}

export interface ITaskWithDetails extends ITask {
    _id: string;
    title: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    tags: ITag[];
    assignees: IUser[];
    creator?: IUser;
}

export type ITaskGroupedByWorkflowStage = {
    [item in WorkflowStage]: ITaskWithDetails[];
};
