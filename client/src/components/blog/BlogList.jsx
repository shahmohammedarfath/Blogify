import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api.js";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get("/blog/all");
        setBlogPosts(response.data.blogs);
        setIsLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch blogs");
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
      {blogPosts.length === 0 ? (
        <p className="text-center">No blog posts available.</p>
      ) : (
        <ul className="space-y-6">
          {blogPosts.map((post) => (
            <li key={post._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  to={`/blog/${post._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {post.author?.username || "Anonymous"}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
