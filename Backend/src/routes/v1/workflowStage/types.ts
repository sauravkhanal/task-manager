import mongoose from "mongoose";

export enum WorkflowStage {
    TODO = "TODO",
    INPROGRESS = "INPROGRESS",
    TESTING = "TESTING",
    COMPLETED = "COMPLETED",
}

export interface IWorkflowStage {
    _id: mongoose.Types.ObjectId;
    title: WorkflowStage;
    taskIDs: string[];
    description?: string;
}
