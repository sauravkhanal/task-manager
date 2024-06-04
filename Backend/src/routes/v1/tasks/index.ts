import express from "express";
const router = express.Router();
import taskControllers from "./task.controllers";
import upload from "../../../middleware/multer";

// Group Task routes

router.get("/assigned-to-me", taskControllers.getTaskAssignedToMe);
router.get("/assigned-by-me", taskControllers.getTaskAssignedByMe);
router.post("/bulk-delete", taskControllers.bulkDelete);

router
    .route("/:id")
    .get(taskControllers.getTaskById)
    .patch(taskControllers.updateTaskDetails)
    .delete(taskControllers.deleteTask);

router.patch("/:id/recover", taskControllers.recoverTask);

// Route for adding assignees
router.patch("/:id/assignees", taskControllers.addAssigneesToTask);

// Route for removing assignees
router.patch("/:id/assignees/remove", taskControllers.removeAssigneesFromTask);

// Route for changing workflow stage
router.patch("/:id/workflow", taskControllers.changeWorkflowStage);

// Route for adding and removing tags
router.patch("/:id/tags", taskControllers.addTagsToTask);
router.patch("/:id/tags/remove", taskControllers.removeTagsFromTask);

// Route for adding and removing comments
router.post("/:id/comments", taskControllers.addCommentToTask);
router.patch("/:id/comments/remove", taskControllers.removeCommentFromTask);

// Route to create task
router.post("/", upload.array("files"), taskControllers.createTask);

// Route to get all tasks
router.get("/", taskControllers.getAllTasks);

// TODO: Attachments route (not implemented yet)
// router.post('/:id/attachments', taskControllers.createAttachment);
// router.post('/:id/attachments/:aId', taskControllers.removeAttachment);

export default router;
