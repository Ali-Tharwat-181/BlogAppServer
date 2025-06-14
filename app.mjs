import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.mjs";
import postRouter from "./routes/postRouter.mjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS middleware
app.use(
  cors({
    origin: "https://blog-app-roan-zeta.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

app.use("/auth", authRouter);
app.use("/posts", postRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
