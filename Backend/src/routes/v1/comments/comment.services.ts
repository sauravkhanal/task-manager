import commentRepository from "./comment.repository";
import { IComment } from "./types";

const commentServices = {
    createComment(data: Partial<IComment>): Promise<IComment> {
        return commentRepository.createComment(data);
    },

    getCommentById(commentID: string): Promise<IComment | null> {
        return commentRepository.getCommentById(commentID);
    },

    updateComment(commentID: string, creatorUsername: string, data: Partial<IComment>): Promise<IComment | null> {
        return commentRepository.updateComment(commentID, creatorUsername, data);
    },

    deleteComment(commentID: string, creatorUsername: string): Promise<IComment | null> {
        return commentRepository.deleteComment(commentID, creatorUsername);
    },

    recoverComment(commentID: string, creatorUsername: string): Promise<IComment | null> {
        return commentRepository.deleteComment(commentID, creatorUsername);
    },

    getCommentDetailsByID(commentIDs: string[]) {
        return commentRepository.getCommentDetailsByID(commentIDs);
    },
};

export default commentServices;
