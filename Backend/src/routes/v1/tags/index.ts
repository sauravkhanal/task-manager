import express from "express";
import tagController from "./tag.controllers";
import requireLogin from "../../../middleware/requireLogin";

const tagRouter = express.Router();

tagRouter.use(requireLogin);
tagRouter.get("/", tagController.getAllTags);
tagRouter.post("/tasks", tagController.addTasksToTag);
tagRouter.delete("/tasks", tagController.removesTaskFromTag);
tagRouter.get("/:id", tagController.getTagById);
tagRouter.post("/", tagController.createTag);
tagRouter.patch("/:id", tagController.updateTag);
tagRouter.delete("/:id", tagController.deleteTag);

export default tagRouter;
