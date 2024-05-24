import mongoose from "mongoose";
import { IWorkflowStage, WorkflowStage } from "./types";

const workflowStageSchema = new mongoose.Schema<IWorkflowStage>({
    title: { type: String, enum: Object.values(WorkflowStage), required: true },
    taskIDs: { type: [String], default: [] },
    description: { type: String },
});

const WorkflowStageModel = mongoose.model<IWorkflowStage>(
    "WorkflowStage",
    workflowStageSchema,
);

export default WorkflowStageModel;
