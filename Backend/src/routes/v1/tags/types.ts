import mongoose from "mongoose";

export default interface ITag {
    _id?: mongoose.Types.ObjectId;
    authorID: string;
    taskIDs?: string[];
    title: string;
    description?: string;
    color: string;
    deleted?: boolean;
}
