import mongoose from "mongoose";
import { WorkflowStage } from "../workflowStage/types";

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
