import mongoose from "mongoose";
import Post from "../models/post.mjs";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const data = fs.readFileSync(path.join(__dirname, "./posts.json"), "utf-8");
const posts = JSON.parse(data);

await Post.deleteMany();
await Post.insertMany(posts);

console.log(" posts seeded successfully!");
process.exit();
