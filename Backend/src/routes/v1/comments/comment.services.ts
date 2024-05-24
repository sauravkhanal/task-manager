import commentRepository from "./comment.repository";
import { IComment } from "./types";

const commentServices = {
    createComment(data: Partial<IComment>): Promise<IComment> {
        return commentRepository.createComment(data);
    },

    getCommentById(commentID: string): Promise<IComment | null> {
        return commentRepository.getCommentById(commentID);
    },

    updateComment(commentID: string, creatorID: string, data: Partial<IComment>): Promise<IComment | null> {
        return commentRepository.updateComment(commentID, creatorID, data);
    },

    deleteComment(commentID: string, creatorID: string): Promise<IComment | null> {
        return commentRepository.deleteComment(commentID, creatorID);
    },

    recoverComment(commentID: string, creatorID: string): Promise<IComment | null> {
        return commentRepository.deleteComment(commentID, creatorID);
    },
};

export default commentServices;
