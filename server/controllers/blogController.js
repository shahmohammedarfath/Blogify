import slugify from "slugify";
import Blog from "../models/blogModel.js";

// Create a new blog
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

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.log("Error fetching blogs", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single blog
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing blog
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Checking if the user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own blogs" });
    }

    if (title && title !== blog.title) {
      blog.slug = slugify(title, { lower: true, strict: true });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.log("Error in updateBlog " + error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Checking if the user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own blogs" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search a blog
const searchBlog = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Query params", query);

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // regex search
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).select("title content slug author createdAt");

    res.status(200).json(blogs);
  } catch (error) {
    console.log("Search error:", error);
    res.status(404).json({ message: "Server error" });
  }
};
export {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  searchBlog,
};
