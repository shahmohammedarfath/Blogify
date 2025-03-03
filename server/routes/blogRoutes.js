import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/create", authenticateUser, createBlog);
router.get("/all", getAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/update/:id", authenticateUser, updateBlog);
router.delete("/delete/:id", authenticateUser, deleteBlog);

export default router;
