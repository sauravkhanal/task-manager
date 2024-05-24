import mongoose from "mongoose";
import ITask, { TaskPriority } from "./types";
import { WorkflowStage } from "../workflowStage/types";

const taskSchema = new mongoose.Schema<ITask>({
    _id: mongoose.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    tagIDs: { type: [String], required: true },
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
        default: WorkflowStage.TODO,
    },
    creatorID: { type: String, required: true },
    assigneeIDs: { type: [String], required: true },
    commentIDs: { type: [String] },
    attachmentIDs: { type: [String] },
    activityIDs: { type: [String] },
    deleted: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<ITask>("Task", taskSchema);
export default TaskModel;
