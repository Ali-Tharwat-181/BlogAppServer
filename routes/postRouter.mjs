import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postConroller.mjs";
import upload from "../utils/upload.mjs";
import { isAuthenticated } from "../middlewares/isAuthenticatedMiddleware.mjs";
import { isAuthorized } from "../middlewares/isAutherizedMiddleware.mjs";

const router = express.Router();

router
  .route("/")
  .get(getAllPosts)
  .post(upload.single("coverImage"), isAuthenticated, createPost);

router
  .route("/:id")
  .get(getPostById)
  .put(upload.single("coverImage"), isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost);

export default router;
