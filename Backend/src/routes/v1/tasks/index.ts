import express from "express";
const router = express.Router();
import taskControllers from "./task.controllers";

// Group Task routes
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
router.post("/", taskControllers.createTask);

// TODO: Attachments route (not implemented yet)
// router.post('/:id/attachments', taskControllers.createAttachment);
// router.post('/:id/attachments/:aId', taskControllers.removeAttachment);

export default router;
