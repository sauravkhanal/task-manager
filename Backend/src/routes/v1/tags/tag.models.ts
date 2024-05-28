import mongoose from "mongoose";
import ITag from "./types";

const tagSchema = new mongoose.Schema<ITag>({
    authorID: { type: String, required: true },
    taskIDs: { type: [String], default: [] },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    color: { type: String, required: true },
    deleted: { type: Boolean, default: true },
});

const TagModel = mongoose.model<ITag>("Tag", tagSchema);
export default TagModel;
