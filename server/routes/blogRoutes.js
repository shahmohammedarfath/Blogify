import express from "express"
import { createBlog, getAllBlogs, getSingleBlog } from "../controllers/blogController.js"

const router = express.Router()

router.post("/create", createBlog)
router.get("/all", getAllBlogs)
router.get("/:id", getSingleBlog)


export default router