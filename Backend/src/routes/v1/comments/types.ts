import mongoose from "mongoose";

export interface IComment {
    _id: mongoose.Types.ObjectId;
    creatorID: string;
    taskID: string;
    title: string;
    description: string;
    attachmentIDs: string[];
    deleted: boolean;
}
