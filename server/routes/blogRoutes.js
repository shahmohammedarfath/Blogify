import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blogController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/create", authenticateUser, createBlog);
router.get("/all", getAllBlogs);
router.get("/:id", getSingleBlog);

export default router;
