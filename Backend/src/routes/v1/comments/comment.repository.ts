import { IComment } from "./types";
import CommentModel from "./comment.model";

interface ICommentRepository {
    createComment(data: Partial<IComment>): Promise<IComment>;
    getCommentById(commentID: string): Promise<IComment | null>;
    updateComment(commentID: string, creatorUsername: string, data: Partial<IComment>): Promise<IComment | null>;
    deleteComment(commentID: string, creatorUsername: string): Promise<IComment | null>;
    recoverComment(commentID: string, creatorUsername: string): Promise<IComment | null>;
    getCommentDetailsByID(commentIDs: string[]): Promise<IComment[]>;
}

const commentRepository: ICommentRepository = {
    createComment(data: Partial<IComment>): Promise<IComment> {
        const comment = new CommentModel(data);
        return comment.save();
    },

    getCommentById(commentID: string): Promise<IComment | null> {
        return CommentModel.findById(commentID); // add .exec() if promise is not returned.
    },

    updateComment(commentID: string, creatorUsername: string, data: Partial<IComment>): Promise<IComment | null> {
        return CommentModel.findOneAndUpdate({ _id: commentID, creatorUsername }, data, { new: true });
    },

    deleteComment(commentID: string, creatorUsername: string): Promise<IComment | null> {
        return CommentModel.findOneAndUpdate({ _id: commentID, creatorUsername }, { deleted: true }, { new: true });
    },

    recoverComment(commentID: string, creatorUsername: string): Promise<IComment | null> {
        return CommentModel.findOneAndUpdate({ _id: commentID, creatorUsername }, { deleted: false }, { new: true });
    },

    getCommentDetailsByID(commentIDs) {
        return CommentModel.find({ _id: { $in: commentIDs }, deleted: false });
    },
};

export default commentRepository;
