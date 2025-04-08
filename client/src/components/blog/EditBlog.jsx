import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import API from "../utils/api";
import ReactQuill from "react-quill";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await API.get(`/blog/${id}`);
        setTitle(blog.data.title);
        setContent(blog.data.content);
      } catch (error) {
        setError("Failed to fetch blog.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/blog/update/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog Updated Successfully");
      navigate("/blog");
    } catch (error) {
      console.error("Error updating blog", error);
      alert("Failed to update blog.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Content
            </Label>
            {/* <Textarea></Textarea> */}
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>
          <Button type="submit">Update Blog</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditBlog;
