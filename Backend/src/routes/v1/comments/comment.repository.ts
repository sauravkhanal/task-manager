import { IComment } from "./types";
import CommentModel from "./comment.model";

interface ICommentRepository {
    createComment(data: Partial<IComment>): Promise<IComment>;
    getCommentById(commentID: string): Promise<IComment | null>;
    updateComment(commentID: string, creatorID: string, data: Partial<IComment>): Promise<IComment | null>;
    deleteComment(commentID: string, creatorID: string): Promise<IComment | null>;
    recoverComment(commentID: string, creatorID: string): Promise<IComment | null>;
}

const commentRepository: ICommentRepository = {
    createComment(data: Partial<IComment>): Promise<IComment> {
        const comment = new CommentModel(data);
        return comment.save();
    },

    getCommentById(commentID: string): Promise<IComment | null> {
        return CommentModel.findById(commentID); // add .exec() if promise is not returned.
    },

    updateComment(commentID: string, creatorID: string, data: Partial<IComment>): Promise<IComment | null> {
        return CommentModel.findOneAndUpdate({ _id: commentID, creatorID }, data, { new: true });
    },

    deleteComment(commentID: string, creatorID: string): Promise<IComment | null> {
        return CommentModel.findOneAndUpdate({ _id: commentID, creatorID }, { deleted: true }, { new: true });
    },

    recoverComment(commentID: string, creatorID: string): Promise<IComment | null> {
        return CommentModel.findOneAndUpdate({ _id: commentID, creatorID }, { deleted: false }, { new: true });
    },
};

export default commentRepository;
