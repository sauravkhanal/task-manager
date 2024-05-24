import mongoose from "mongoose";

export enum TaskPriority {
    LOW = "LOW",
    MED = "MED",
    HIGH = "HIGH",
}

export enum WorkflowStage {
    TODO = "TODO",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED",
}

export default interface ITasks {
    _id: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    tags: string[];
    dueDate: Date;
    priority: TaskPriority;
    workflowStage: WorkflowStage;
    assigner: string;
    assignee: string[];
    comments?: string[];
    attachments?: string[];
    activity?: string[];
    deleted: boolean;
}
