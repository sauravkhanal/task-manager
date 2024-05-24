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
