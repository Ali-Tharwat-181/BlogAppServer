import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.mjs";
import postRouter from "./routes/postRouter.mjs";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/posts", postRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
