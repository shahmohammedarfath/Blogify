import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../utils/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { Textarea } from "../ui/textarea.jsx";

const TestProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data.user);
        setUserBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = localStorage.getItem("token")
  //       const response = await API.get("/user/profile", {
  //         headers: { Authorization: `Bearer ${token}`}
  //       })
  //       console.log(response);

  //     } catch (error) {
  //       console.log("Failed to fetch or update profile.", error)
  //     }
  //   }

  //   fetchProfile()
  // }, [])

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile || {});
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put("/user/profile", editedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  if (!user || !profile) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={profile.username} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={profile.email} disabled />
          </div>
          <div className="space-y-2">
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bio"
            >
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={editedProfile.bio || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Social Links</Label>
            <Input
              name="website"
              placeholder="Website"
              value={editedProfile.socialLinks?.website || ""}
              onChange={handleSocialLinkChange}
            />
            <Input
              name="twitter"
              placeholder="Twitter"
              value={editedProfile.socialLinks?.twitter || ""}
              onChange={handleSocialLinkChange}
            />
            <Input
              name="linkedin"
              placeholder="LinkedIn"
              value={editedProfile.socialLinks?.linkedin || ""}
              onChange={handleSocialLinkChange}
            />
            <Input
              name="github"
              placeholder="GitHub"
              value={editedProfile.socialLinks?.github || ""}
              onChange={handleSocialLinkChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input
              id="profileImage"
              name="profileImage"
              value={editedProfile.profileImage || ""}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <>
          <Card className="max-w-2xl mx-auto px-7 py-5 mt-6">
            <div className="space-y-4">
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Bio:</strong> {profile.bio || "No bio provided"}
              </p>
              <div>
                <strong>Social Links:</strong>
                <ul>
                  <li>
                    Twitter: {profile.socialLinks.twitter || "Not provided"}
                  </li>
                  <li>
                    LinkedIn: {profile.socialLinks.linkedin || "Not provided"}
                  </li>
                  <li>
                    GitHub: {profile.socialLinks.github || "Not provided"}
                  </li>
                </ul>
              </div>
              {profile.profileImage && (
                <img
                  src={profile.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="mt-4 w-32 h-32 rounded-full"
                />
              )}
              <Button onClick={handleEdit}>Edit Profile</Button>
            </div>
          </Card>

          {/* // Blogs for LoggedInUser */}

          <div className="">
            <h2 className="text-2xl text-center font-bold my-4">Your Blogs</h2>
            {userBlogs.length === 0 ? (
              <p>No blogs created</p>
            ) : (
              <div>
                {userBlogs.map((blog) => (
                  <Card key={blog._id} className="mb-4">
                    <CardHeader>
                      <CardTitle>
                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                      </CardTitle>
                    </CardHeader>

                    <CardFooter className="gap-2">
                      <Button>Edit</Button>
                      <Button variant="destructive">Delete</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TestProfile;
