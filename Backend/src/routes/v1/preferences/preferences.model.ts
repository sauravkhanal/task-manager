import mongoose from "mongoose";
import { IPreferences } from "./types";

const defaultWorkflowStageColors = {
    TODO: "#3b82f6",
    INPROGRESS: "#f97316",
    COMPLETED: "#6b7280",
};

const preferenceSchema = new mongoose.Schema<IPreferences>({
    workflowStageColors: {
        type: Map,
        of: String,
        default: defaultWorkflowStageColors,
    },
    visual: {
        theme: {
            type: String,
            enum: ["light", "dark", "system"],
            default: "system",
        },
        preferredColors: {
            background: { type: String },
            text: { type: String },
            accent: { type: String },
        },
    },
});

const PreferenceModel = mongoose.model<IPreferences>("Preference", preferenceSchema);

export default PreferenceModel;
