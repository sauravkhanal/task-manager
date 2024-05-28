import { NextFunction, Response, Request } from "express";
import ITask from "./types";
import { IAccessToken } from "../../../types";
import taskServices from "./task.services";
import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import { successResponse } from "../../../utils/ApiResponse";
import { WorkflowStage } from "../workflowStage/types";
import { IComment } from "../comments/types";
import mongoose from "mongoose";

const taskControllers = {
    async createTask(req: Request<unknown, unknown, ITask, unknown>, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { title, description, dueDate, assigneeIDs, priority } = req.body;
            const result = await taskServices.createNewTask({
                creatorID: client_id as unknown as mongoose.Types.ObjectId,
                title,
                description,
                dueDate,
                assigneeIDs,
                priority,
            });
            if (result) return successResponse(res, 200, messages.success("created"), result);
            throw new CustomError(500, messages.failure("creating"));
        } catch (error) {
            next(error);
        }
    },

    async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await taskServices.getTaskById(id);
            if (result) return successResponse(res, 200, messages.success("retrieved"), result);
            throw new CustomError(404, messages.failure("retrieving"));
        } catch (error) {
            next(error);
        }
    },

    async updateTaskDetails(
        req: Request<{ id: string }, unknown, Partial<ITask>, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const taskDetails = req.body;
            const result = await taskServices.updateTaskDetails(id, client_id, taskDetails);
            if (result) return successResponse(res, 200, messages.success("updated"), result);
            throw new CustomError(404, messages.failure("updating"));
        } catch (error) {
            next(error);
        }
    },

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const result = await taskServices.deleteTask(id, client_id);
            if (result) return successResponse(res, 200, messages.success("deleted"), result);
            throw new CustomError(500, messages.failure("deleting"));
        } catch (error) {
            next(error);
        }
    },

    async recoverTask(req: Request, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const result = await taskServices.deleteTask(id, client_id);
            if (result) return successResponse(res, 200, messages.success("recovered"), result);
            throw new CustomError(404, messages.failure("recovering"));
        } catch (error) {
            next(error);
        }
    },

    async addAssigneesToTask(req: Request, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const assigneeIDs = req.body;
            const result = await taskServices.addAssigneesToTask(id, client_id, assigneeIDs);
            if (result) return successResponse(res, 200, messages.success("added", "assignee/s"), result);
            throw new CustomError(404, messages.failure("adding", "assignee/s"));
        } catch (error) {
            next(error);
        }
    },

    async removeAssigneesFromTask(req: Request, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const assigneeIDs = req.body;
            const result = await taskServices.removeAssigneesFromTask(id, client_id, assigneeIDs);
            if (result) return successResponse(res, 200, messages.success("removed", "assignee/s"), result);
            throw new CustomError(404, messages.failure("removing", "assignee/s"));
        } catch (error) {
            next(error);
        }
    },

    async changeWorkflowStage(
        req: Request<
            { id: string },
            unknown,
            { currentWorkflowStage: WorkflowStage; newWorkflowStage: WorkflowStage },
            unknown
        >,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const { currentWorkflowStage, newWorkflowStage } = req.body;
            const result = await taskServices.changeWorkflowStage(id, currentWorkflowStage, newWorkflowStage);
            return successResponse(
                res,
                200,
                messages.workflowStage.transitionSuccess(currentWorkflowStage, newWorkflowStage),
                result,
            );
        } catch (error) {
            next(error);
        }
    },

    async addTagsToTask(req: Request, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const tagIDs: string[] = req.body;
            const result = await taskServices.addTagsToTask(id, client_id, tagIDs);
            if (result) return successResponse(res, 200, messages.success("added", "tag/s"), result);
            throw new CustomError(404, messages.failure("adding", "tag/s"));
        } catch (error) {
            next(error);
        }
    },

    async removeTagsFromTask(req: Request, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { id } = req.params;
            const tagIDs: string[] = req.body;
            const result = await taskServices.removeTagsFromTask(id, client_id, tagIDs);
            if (result) return successResponse(res, 200, messages.success("removed", "tag/s"), result);
            throw new CustomError(404, messages.failure("removing", "tag/s"));
        } catch (error) {
            next(error);
        }
    },

    async addCommentToTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const commentDetails = req.body as Partial<IComment>;
            const result = await taskServices.addCommentToTask(id, commentDetails);
            if (result) return successResponse(res, 200, messages.success("added", "comment"), result);
            throw new CustomError(404, messages.failure("adding", "comment"));
        } catch (error) {
            next(error);
        }
    },

    async removeCommentFromTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const commentID: string = req.body;
            const result = await taskServices.removeCommentFromTask(id, commentID);
            if (result) return successResponse(res, 200, messages.success("removed", "comment"), result);
            throw new CustomError(404, messages.failure("removing", "comment"));
        } catch (error) {
            next(error);
        }
    },

    //TODO: attachments,
    // async createTask(req:Request, res:Response, next: NextFunction) {
    //     try {

    //     } catch (error) {
    //         next(error);
    //     }
    // },
};

export default taskControllers;
