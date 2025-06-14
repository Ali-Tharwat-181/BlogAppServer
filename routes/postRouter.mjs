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

const allowCors = (handler) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://blog-app-roan-zeta.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Authorization, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await handler(req, res);
};

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

export default allowCors(router);
