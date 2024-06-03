import { NextFunction, Request, Response } from "express";
import { IAccessToken } from "../../../types";
import preferenceServices from "./preferences.services";
import { successResponse } from "../../../utils/ApiResponse";
import { messages } from "../../../utils/Messages";
import CustomError from "../../../utils/CustomError";
import { IPreferences } from "./types";

const preferenceControllers = {
    getPreferences: async ({
        req,
        res,
        next,
    }: {
        req: Request<unknown, unknown, { preferenceID: string }, unknown>;
        res: Response;
        next: NextFunction;
    }) => {
        try {
            // const userToken: IAccessToken = res.locals.user;
            const { preferenceID } = req.body;
            const response = await preferenceServices.getPreferences(preferenceID);
            if (response) {
                return successResponse(res, 200, messages.success("retrieved", "preferences"));
            }
            throw new CustomError(404, messages.failure("fetching", "the preferences"));
        } catch (error) {
            next(error);
        }
    },

    setPreferences: async ({
        req,
        res,
        next,
    }: {
        req: Request<unknown, unknown, { preferenceID: string; preferences: IPreferences }, unknown>;
        res: Response;
        next: NextFunction;
    }) => {
        try {
            const userToken: IAccessToken = res.locals.user;
            const { preferenceID, preferences } = req.body;
            const response = await preferenceServices.setPreferences({
                _id: preferenceID,
                preferenceData: preferences,
            });
            if (response) {
                return successResponse(res, 200, messages.success("updated", "preferences"));
            }
            throw new CustomError(404, messages.failure("updating", "the preferences"));
        } catch (error) {
            next(error);
        }
    },

    deletePreferences: async ({
        req,
        res,
        next,
    }: {
        req: Request<unknown, unknown, { preferenceID: string }, unknown>;
        res: Response;
        next: NextFunction;
    }) => {
        try {
            const userToken: IAccessToken = res.locals.user;
            const { preferenceID } = req.body;
            const response = await preferenceServices.deletePreferences(preferenceID);
            if (response) {
                return successResponse(res, 200, messages.success("deleted", "preferences"));
            }
            throw new CustomError(404, messages.failure("deleting", "the preferences"));
        } catch (error) {
            next(error);
        }
    },
};

export default preferenceControllers;
