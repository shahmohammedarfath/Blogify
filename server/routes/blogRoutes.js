import express from "express"
import { createBlog, getAllBlogs } from "../controllers/blogController.js"

const router = express.Router()

router.post("/create", createBlog)
router.get("/all", getAllBlogs)

export default router