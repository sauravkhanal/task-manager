import { NextFunction, Request, Response } from "express";
import CustomError from "../../../utils/CustomError";
import { successResponse } from "../../../utils/ApiResponse";
import { messages } from "../../../utils/Messages";
import commentServices from "./comment.services";
import { IComment } from "./types";
import { IAccessToken } from "../../../types";
import taskServices from "../tasks/task.services";

const commentControllers = {
    // async addComments(req: Request<unknown, unknown, IComment, unknown>, res: Response, next: NextFunction) {
    //     try {
    //         const token = res.locals.user as IAccessToken;
    //         const creatorUsername = token.username;
    //         const { description } = req.body;
    //         const result = await commentServices.createComment({ description, creatorUsername });
    //         if (result) return successResponse(res, 200, messages.success("created", "comment"), result);
    //         throw new CustomError(404, messages.failure("creating", "the comment"));
    //     } catch (error) {
    //         next(error);
    //     }
    // },
    async getCommentsByIDs(
        req: Request<unknown, unknown, { commentIDs: string[] }, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { commentIDs } = req.body;
            if (commentIDs?.length == 0) throw new CustomError(400, messages.error.not_found("comment id in request"));
            const result = await commentServices.getCommentDetailsByID(commentIDs);
            if (result) return successResponse(res, 200, messages.success("retrieved", "comments"), result);
            throw new CustomError(404, messages.failure("retrieving", "the given comments"));
        } catch (error) {
            next(error);
        }
    },
    async updateComment(
        req: Request<{ commentID: string }, unknown, { commentID: string; description: string }, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { commentID } = req.params;
            const { description } = req.body;
            console.log("comment id: ", commentID, " desc: ", description);
            const token = res.locals.user as IAccessToken;
            const creatorUsername = token.username;
            const result = await commentServices.updateComment(commentID, creatorUsername, { description });
            if (result) return successResponse(res, 200, messages.success("updated", "comment"), result);
            throw new CustomError(404, messages.failure("updating", "the given comment"));
        } catch (error) {
            next(error);
        }
    },
    async deleteComment(
        req: Request<{ taskID: string; commentID: string }, unknown, unknown, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { commentID, taskID } = req.params;
            const token = res.locals.user as IAccessToken;
            const creatorUsername = token.username;
            const result = await commentServices.deleteComment(commentID, creatorUsername);
            if (result) {
                await taskServices.removeCommentFromTask(taskID, commentID);
                return successResponse(res, 200, messages.success("deleted", "comment"), result);
            }
            throw new CustomError(404, messages.failure("deleting", "the given comment"));
        } catch (error) {
            next(error);
        }
    },
};

export default commentControllers;
