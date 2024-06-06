import mongoose from "mongoose";

export interface IComment {
    _id: mongoose.Types.ObjectId;
    creatorUsername: string;
    description: string;
    attachmentIDs?: string[];
    deleted: boolean;
}
