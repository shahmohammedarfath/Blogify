import express from "express";
import "dotenv/config";
import cors from "cors";

import { connectDB } from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
const PORT = process.env.PORT;

// Database connection
connectDB;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

// Starting server
app.listen(PORT, () => {
  console.log(`Server Started Running on ${PORT}`);
});
