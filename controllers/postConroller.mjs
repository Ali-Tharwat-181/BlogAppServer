import Post from "../models/post.mjs";
import * as postServices from "../services/postServices.mjs";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postServices.getPostById(req.params.id, req.user);
    if (!post) return res.status(404).json({ error: "post not found" });
    res.json(post);
  } catch (err) {
    console.log(err);

    if (err.message === "Unauthorized") {
      return res.status(403).json({ error: "Access denied" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, body, coverImage } = req.body;
    // const coverImage = req.file ? req.file.path : undefined;
    console.log(req.user);
    const post = await postServices.createPost({
      title,
      body,
      coverImage,
      createdBy: req.user._id,
    });
    const populatedPost = await Post.findById(post._id).populate({
      path: "createdBy",
      select: "name",
    });

    res.status(201).json(populatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, body, coverImage } = req.body;
    // const coverImage = req.file ? req.file.path : undefined;

    const post = await postServices.updatePost(
      req.params.id,
      { title, body, coverImage },
      req.user
    );

    if (!post) return res.status(404).json({ error: "Book not found" });
    res.json(post);
  } catch (err) {
    if (err.message === "Unauthorized") {
      return res.status(403).json({ error: "Access denied" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await postServices.deletePost(req.params.id, req.user);
    if (!post) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "post deleted" });
  } catch (err) {
    if (err.message === "Unauthorized") {
      return res.status(403).json({ error: "Access denied" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
