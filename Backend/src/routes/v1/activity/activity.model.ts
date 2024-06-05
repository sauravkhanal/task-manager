import mongoose from "mongoose";
import { WorkflowStage } from "../workflowStage/types";
import { TaskPriority } from "../tasks/types";

export interface IActivity {
    username: string;
    action: ActivityAction;
    updatedFields?: string[];
    from?: WorkflowStage;
    to?: WorkflowStage | TaskPriority;
}

export interface IActivityDocument extends IActivity {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export enum ActivityAction {
    Created = "created",
    Deleted = "deleted",
    Updated = "updated",
}

export enum StageOrPriority {
    TODO = "TODO",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED",
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}

const activitySchema = new mongoose.Schema<IActivity>(
    {
        username: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: Object.values(ActivityAction),
            required: true,
        },
        updatedFields: { type: [String], required: false },
        to: {
            type: String,
            enum: StageOrPriority,
            required: false,
        },
    },
    { timestamps: true },
);

const activityModel = mongoose.model<IActivity>("Activity", activitySchema);
export default activityModel;
