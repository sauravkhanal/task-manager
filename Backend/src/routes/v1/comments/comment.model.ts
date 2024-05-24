import { Model, Schema, model } from "mongoose";
import { IComment } from "./types";

const CommentSchema: Schema<IComment> = new Schema(
    {
        creatorID: { type: String, required: true },
        taskID: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        attachmentIDs: { type: [String], default: [] },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const CommentModel: Model<IComment> = model<IComment>("Comment", CommentSchema);

export default CommentModel;
