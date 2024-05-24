import mongoose from "mongoose";
import { WorkflowStage } from "../workflowStage/types";

export enum TaskPriority {
    LOW = "LOW",
    MED = "MED",
    HIGH = "HIGH",
}

export default interface ITask {
    _id: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    tagIDs: string[];
    dueDate: Date;
    priority: TaskPriority;
    workflowStage: WorkflowStage;
    creatorID: string;
    assigneeIDs: string[];
    commentIDs?: string[];
    attachmentIDs?: string[];
    activityIDs?: string[];
    deleted: boolean;
}
