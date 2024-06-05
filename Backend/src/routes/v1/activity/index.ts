import { Router } from "express";
import activityControllers from "./activity.controllers";

const activityRouter = Router();
activityRouter.post("/", activityControllers.getActivities);

export default activityRouter;
