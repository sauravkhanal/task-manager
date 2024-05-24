import mongoose from "mongoose";
import ITasks, { TaskPriority, WorkflowStage } from "./types";

const taskSchema = new mongoose.Schema<ITasks>({
    _id: mongoose.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    tags: { type: [String], required: true },
    dueDate: { type: Date, required: true },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
        required: true,
    },
    workflowStage: {
        type: String,
        enum: Object.values(WorkflowStage),
        required: true,
    },
    assigner: { type: String, required: true },
    assignee: { type: [String], required: true },
    attachments: { type: [String] },
    comments: { type: [String] },
    activity: { type: [String] },
    deleted: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<ITasks>("Tasks", taskSchema);
export default TaskModel;
