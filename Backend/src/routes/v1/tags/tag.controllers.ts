import { NextFunction, Request, Response } from "express";
import ITag from "./types";
import { failureResponse, successResponse } from "../../../utils/ApiResponse";
import { messages } from "../../../utils/Messages";
import tagServices from "./tag.services";

const tagController = {
    async getAllTags(_: Request, res: Response, next: NextFunction) {
        try {
            const result = await tagServices.getAllTags();
            return successResponse(res, 200, messages.success("retrieved", "tags"), result);
        } catch (error) {
            next(error);
        }
    },

    async getTagById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await tagServices.getTagById(id);
            return successResponse(res, 200, messages.success("retrieved", "tag"), result);
        } catch (error) {
            next(error);
        }
    },

    async createTag(req: Request<unknown, unknown, ITag>, res: Response, next: NextFunction) {
        try {
            const authorID = res.locals.users._id;
            const { color, title, description }: ITag = req.body;
            const result = await tagServices.createTag({ color, title, description, authorID });
            if (result) return successResponse(res, 201, messages.success("created", "tag"), result);
            return failureResponse(res, 409, messages.error.already_exists("tag with given name"));
        } catch (error) {
            next(error);
        }
    },

    async updateTag(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tagData: Partial<ITag> = req.body;
            const result = await tagServices.updateTag(id, tagData);
            if (result) return successResponse(res, 200, messages.success("updated", "tag"), result);
            return failureResponse(res, 404, messages.error.not_found("tag"));
        } catch (error) {
            next(error);
        }
    },

    async deleteTag(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await tagServices.deleteTag(id);
            return successResponse(res, 200, messages.success("deleted", "tag"), result);
        } catch (error) {
            next(error);
        }
    },

    async addTasksToTag(
        req: Request<unknown, unknown, { tagId: string; taskIds: string[] }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { tagId, taskIds } = req.body;
            const result = await tagServices.addTasksToTag(tagId, taskIds);
            if (result) return successResponse(res, 200, messages.success("added", "tasks"), result);
        } catch (error) {
            next(error);
        }
    },

    async removesTaskFromTag(
        req: Request<unknown, unknown, { tagId: string; taskIds: string[] }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { tagId, taskIds } = req.body;
            const result = await tagServices.removeTasksFromTag(tagId, taskIds);
            return successResponse(res, 200, messages.success("removed", "tasks"), result);
        } catch (error) {
            next(error);
        }
    },
};

export default tagController;
