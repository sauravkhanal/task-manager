import mongoose from "mongoose";
import ITask, { TaskPriority } from "./types";
import { WorkflowStage } from "../workflowStage/types";

const taskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true, unique: true },
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
    creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assigneeIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    commentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    attachmentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
    activityIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    deleted: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<ITask>("Task", taskSchema);
export default TaskModel;
