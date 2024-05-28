import express from "express";
import tagController from "./tag.controllers";

const router = express.Router();

router.get("/", tagController.getAllTags);
router.post("/tasks", tagController.addTasksToTag);
router.delete("/tasks", tagController.removesTaskFromTag);
router.get("/:id", tagController.getTagById);
router.post("/", tagController.createTag);
router.patch("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

export default router;
