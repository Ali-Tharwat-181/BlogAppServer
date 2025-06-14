import Post from "../models/post.mjs";

export const getAllPosts = async () => {
  await Post.find();
};

export const getPostById = async (id, user) => {
  const post = await Post.findById(id);

  if (!post) throw new console.error(`no book found with id:${id} `);

  if (user.role !== "admin" && !post.createdBy.equals(user._id)) {
    throw new Error("Unauthorized");
  }

  return post;
};

export const createPost = async ({ title, body, coverImage, createdBy }) => {
  const post = new Post({
    title,
    body,
    coverImage,
    createdBy,
  });
  await post.save();
  return post;
};

export const updatePost = async (id, { title, body, coverImage }, user) => {
  const post = await Post.findById(id);
  if (!post) return null;

  if (user.role !== "admin" && !post.createdBy.equals(user._id)) {
    throw new Error("Unauthorized");
  }

  const updatedData = { title, body };
  if (coverImage) updatedData.coverImage = coverImage;

  return await Post.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deletePost = async (id, user) => {
  const post = await Post.findById(id);
  if (!post) return null;

  if (user.role !== "admin" && !post.createdBy.equals(user._id)) {
    throw new Error("Unauthorized");
  }

  return await Post.findByIdAndDelete(id);
};
