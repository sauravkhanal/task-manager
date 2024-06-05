import { NextFunction, Request, Response } from "express";
import activityServices from "./activity.services";
import CustomError from "../../../utils/CustomError";
import { successResponse } from "../../../utils/ApiResponse";
import { messages } from "../../../utils/Messages";

const activityControllers = {
    async getActivities(
        req: Request<unknown, unknown, { activityIDs: string[] }, unknown>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { activityIDs } = req.body;
            const result = await activityServices.getActivityDetails(activityIDs);
            if (result) return successResponse(res, 200, messages.success("retrieved", "activity"), result);
            throw new CustomError(404, messages.failure("retrieving", "the given activities"));
        } catch (error) {
            next(error);
        }
    },
};

export default activityControllers;
