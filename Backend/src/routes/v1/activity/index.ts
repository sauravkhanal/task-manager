import { Router } from "express";
import activityControllers from "./activity.controllers";

const activityRouter = Router();
activityRouter.get("/", activityControllers.getActivities);

export default activityRouter;
