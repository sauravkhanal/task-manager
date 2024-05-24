//TODO: add models for all the stuff, then start creating routes
//in order: task, workflow stage, tag, activity comment

import mongoose from "mongoose";

export interface IComment {
    _id: mongoose.Types.ObjectId;
    authorId: string;
    taskId: string;
    title: string;
    description: string;
    attachmentIDs: string[];
    deleted: boolean;
}
