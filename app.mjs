import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.mjs";
import postRouter from "./routes/postRouter.mjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://blog-app-roan-zeta.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add CORS headers middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://blog-app-roan-zeta.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Remove static file serving as it won't work in serverless
// app.use("/uploads", express.static("uploads"));

// Handle MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Root route handler
app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

// API routes
app.use("/auth", authRouter);
app.use("/posts", postRouter);

// Global error handling middleware
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

// Export the Express app for serverless
export default app;
