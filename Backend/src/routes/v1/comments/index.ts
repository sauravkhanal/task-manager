import express from "express";
import commentControllers from "./comment.controllers";

const commentRouter = express.Router();

commentRouter.post("/get-comments", commentControllers.getCommentsByIDs);
commentRouter.delete("/:taskID/:commentID", commentControllers.deleteComment);
commentRouter.patch("/:commentID", commentControllers.updateComment);
// commentRouter.post("/", commentControllers.addComments);
// commentRouter.patch("/", commentControllers.updateComment);

export default commentRouter;
