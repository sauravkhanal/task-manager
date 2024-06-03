import mongoose from "mongoose";
import { WorkflowStage } from "../workflowStage/types";

export interface IPreferences {
    _id: string;
    userID: mongoose.Types.ObjectId;
    visual: {
        theme: "light" | "dark" | "system";
        preferredColors: {
            background: string;
            text: string;
            accent: string;
        };
        fontSize: "small" | "medium" | "large";
    };
    workflowStageColors: {
        [key in WorkflowStage]: string;
    };
}
