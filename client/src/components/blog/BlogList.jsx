import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../utils/api.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import Search from "../Search.jsx";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // const [searchParams] = useSearchParams();

  // const searchQuery = searchParams.get("search");

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
      <div>
        <Search setBlogPosts={setBlogPosts} />
      </div>
      {blogPosts.length === 0 ? (
        <p className="text-center">No blog posts available.</p>
      ) : (
        <div className="grid-gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card key={post._id} className="mb-4">
              <CardHeader>
                <CardTitle>
                  <Link
                    to={`/blog/${post._id}`}
                    className="text-primary hover:text-primary/80 transition-colors blog-title"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.length > 150
                        ? post.content.substring(0, 150) + "..."
                        : post.content,
                  }}
                />
                <Link
                  to={`/blog/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </CardContent>
              <CardFooter className="flex justify-between blog-meta">
                <span>By {post.author?.username || "Anonymous"}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
