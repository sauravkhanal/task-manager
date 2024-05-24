import { Model, Schema, model } from "mongoose";
import { IComment } from "./types";

const CommentsSchema: Schema<IComment> = new Schema(
    {
        authorId: { type: String, required: true },
        taskId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        attachmentIDs: { type: [String], default: [] },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const CommentsModel: Model<IComment> = model<IComment>(
    "Comment",
    CommentsSchema,
);

export default CommentsModel;
