import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api.js";
import "react-quill/dist/quill.snow.css";

const BlogPost = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blog/${id}`);
        setBlogPost(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch blog post. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading blog post...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!blogPost) {
    return <div className="text-center mt-8">Blog post not found.</div>;
  }
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
      <div className="mb-6 text-gray-600">
        <span>By {blogPost.author?.username || "Anonymous"}</span>
        <span className="mx-2">•</span>
        <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blogPost.content }}
      />
    </div>
  );
};

export default BlogPost;
