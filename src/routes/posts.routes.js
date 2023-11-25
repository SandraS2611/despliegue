import { Router } from "express";
import {
  ctrlCreatePosts,
  ctrlDeletePost,
  ctrlGetAllPosts,
  ctrlGetPostById,
  ctrlUpdatePost,
} from "../controllers/post-controllers.js";
import { handlerException } from "../middleware/handler-error.js";
import { createPostsValidation } from "../../validations/create-post-validations.js";
import { applyValidations } from "../middleware/apply-validations.js";
import { findPostsValidation } from "../../validations/find-post-validations.js";
import { updatePostsValidation } from "../../validations/update-post-validations.js"

const postRouter = Router();

postRouter.get("/", ctrlGetAllPosts, handlerException);

postRouter.get(
  "/:postId",
  findPostsValidation,
  applyValidations,
  ctrlGetPostById
);

postRouter.post("/", createPostsValidation, applyValidations, ctrlCreatePosts);

postRouter.patch(
  "/:postId",
  updatePostsValidation,
  applyValidations,
  ctrlUpdatePost
);

postRouter.delete("/:postId", findPostsValidation, applyValidations, ctrlDeletePost)

export { postRouter };
