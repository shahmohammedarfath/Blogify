import slugify from "slugify";

import Blog from "../models/blogModel.js";

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "A blog with this title already exists" });
    }

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
      slug,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: savedBlog,
    });
  } catch (error) {
    console.log("Error posting a blog", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.log("Error fetching blogs", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createBlog, getAllBlogs };
