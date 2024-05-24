import { NextFunction, Response, Request } from "express";
import ITask from "./types";
import { IAccessToken } from "../../../types";
import taskServices from "./task.services";
import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import { successResponse } from "../../../utils/ApiResponse";
import { WorkflowStage } from "../workflowStage/types";

const taskControllers = {
    async createTask(req: Request<unknown, unknown, ITask, unknown>, res: Response, next: NextFunction) {
        try {
            const token = res.locals.user as IAccessToken;
            const client_id = token._id;
            const { title, description, dueDate, assigneeIDs, priority } = req.body;
            const result = await taskServices.createNewTask({
                creatorID: client_id,
                title,
                description,
                dueDate,
                assigneeIDs,
                priority,
            });
            if (result) return successResponse(res, 200, messages.task.success("created"), result);
            throw new CustomError(500, messages.task.failure("creating"));
        } catch (error) {
            next(error);
        }
    },

    async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await taskServices.getTaskById(id);
            if (result) return successResponse(res, 200, messages.task.success("retrieved"), result);
            throw new CustomError(404, messages.task.failure("retrieving"));
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
            const { id } = req.params;
            const taskDetails = req.body;
            const result = await taskServices.updateTaskDetails(id, taskDetails);
            if (result) return successResponse(res, 200, messages.task.success("updated"), result);
            throw new CustomError(404, messages.task.failure("updating"));
        } catch (error) {
            next(error);
        }
    },

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await taskServices.deleteTask(id);
            if (result) return successResponse(res, 200, messages.task.success("deleted"), result);
            throw new CustomError(404, messages.task.success("deleting"));
        } catch (error) {
            next(error);
        }
    },

    async recoverTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await taskServices.recoverTask(id);
            if (result) return successResponse(res, 200, messages.task.success("recovered"), result);
            throw new CustomError(404, messages.task.failure("recovering"));
        } catch (error) {
            next(error);
        }
    },

    async addAssigneesToTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const assigneeIDs = req.body;
            const result = await taskServices.addAssigneesToTask(id, assigneeIDs);
            if (result) return successResponse(res, 200, messages.task.success("added", "assignee/s"), result);
            throw new CustomError(404, messages.task.failure("adding", "assignee/s"));
        } catch (error) {
            next(error);
        }
    },

    async removeAssigneesFromTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const assigneeIDs = req.body;
            const result = await taskServices.removeAssigneesFromTask(id, assigneeIDs);
            if (result) return successResponse(res, 200, messages.task.success("removed", "assignee/s"), result);
            throw new CustomError(404, messages.task.failure("removing", "assignee/s"));
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
            const { id } = req.params;
            const tagIDs: string[] = req.body;
            const result = await taskServices.addTagsToTask(id, tagIDs);
            if (result) return successResponse(res, 200, messages.task.success("added", "tag/s"), result);
            throw new CustomError(404, messages.task.failure("adding", "tag/s"));
        } catch (error) {
            next(error);
        }
    },

    async removeTagsFromTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tagIDs: string[] = req.body;
            const result = await taskServices.removeTagsFromTask(id, tagIDs);
            if (result) return successResponse(res, 200, messages.task.success("removed", "tag/s"), result);
            throw new CustomError(404, messages.task.failure("removing", "tag/s"));
        } catch (error) {
            next(error);
        }
    },

    async addCommentToTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const commentID: string = req.body;
            const result = await taskServices.addCommentToTask(id, commentID);
            if (result) return successResponse(res, 200, messages.task.success("added", "comment"), result);
            throw new CustomError(404, messages.task.failure("adding", "comment"));
        } catch (error) {
            next(error);
        }
    },

    async removeCommentFromTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const commentID: string = req.body;
            const result = await taskServices.removeCommentFromTask(id, commentID);
            if (result) return successResponse(res, 200, messages.task.success("removed", "comment"), result);
            throw new CustomError(404, messages.task.failure("removing", "comment"));
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
