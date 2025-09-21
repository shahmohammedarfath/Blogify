import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../utils/api.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { Textarea } from "../ui/textarea.jsx";
import {
  Calendar,
  Edit3,
  FileText,
  Github,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  Pencil,
  Trash,
  Trash2,
  Twitter,
  User,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog.jsx";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgess, setUploadProgess] = useState(0);
  const navigate = useNavigate();

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
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, []);

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
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
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

  const handleEditBlog = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleDeletBlog = async () => {
    if (blogToDelete) {
      try {
        const token = localStorage.getItem("token");
        await API.delete(`/blog/delete/${blogToDelete}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserBlogs(userBlogs.filter((blog) => blog._id !== blogToDelete));
        setBlogToDelete(null);
        toast({
          title: "Success",
          description: "Blog deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting blog", error);
        toast({
          title: "Error",
          description: "Failed to delete blog",
          variant: "destructive",
        });
      }
    }
  };

  if (!user || !profile) {
    // return <div className="text-center mt-8">Loading...</div>;

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isEditing ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6"
            >
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage />
                  <AvatarFallback className="text-2xl">
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

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
                  placeholder="website"
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
          </CardContent>
        </Card>
      ) : (
        <>
          {/* <Card className="max-w-2xl mx-auto px-7 py-5 mt-6">
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
          </Card> */}

          {/* Updated */}

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage
                      src={profile.profileImage || "placeholder.svg"}
                    />
                    <AvatarFallback className="text-2xl">
                      {profile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {profile.username}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Mail className="h-4 w-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      Member since{" "}
                      {new Date(profile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>

                  {profile.bio && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        About
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.bio}
                      </p>
                    </div>
                  )}

                  {/* Social Links */}
                  <div>
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.socialLinks?.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={profile.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {profile.socialLinks?.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={profile.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {profile.socialLinks?.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={profile.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="h-4 w-4" />
                            Website
                          </a>
                        </Button>
                      )}
                      {profile.socialLinks?.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={profile.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4" />
                            Twitter
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* // Blogs for LoggedInUser */}

          {/* <div className="">
            <h2 className="text-2xl text-center font-bold my-4">Your Blogs</h2>
            {userBlogs.length === 0 ? (
              <>
                <p className="text-lg text-center">
                  Your have not created any blogs yet.
                </p>
                <p className="text-lg text-center">
                  <Link className="text-blue-700" to={"/create-blog"}>
                    Create{" "}
                  </Link>
                  your first blog.
                </p>
              </>
            ) : (
              <div>
                {userBlogs.map((blog) => (
                  <Card key={blog._id} className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                      </CardTitle>
                    </CardHeader>

                    <CardFooter className="gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEditBlog(blog._id)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => setBlogToDelete(blog._id)}
                          >
                            <Trash />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permenantly delete your blog.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setBlogToDelete(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeletBlog}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* <Button variant="destructive" onClick={handleDeletBlog}>
                        Delete
                      </Button> */}
          {/* </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div> */}

          {/* Updated  */}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"></CardTitle>
              <FileText className="h-5 w-5" />
              Your Blogs ({userBlogs.length})
            </CardHeader>
            <CardContent>
              {userBlogs.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't created any blogs yet. Start sharing your
                    thoughts!
                  </p>
                  <Button asChild>
                    <Link to="/create-blog">Create Your First Blog</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBlogs.map((blog, index) => (
                    <div key={blog._id}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            <Link
                              to={`/blog/${blog._id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {blog.title}
                            </Link>
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {blog.excerpt ||
                              blog.content?.substring(0, 150) + "..."}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>

                          {/* TAGS CODE - IN FUTURE */}
                          {/* {blog.tags && (
                            <div className="flex flex-wrap gap-1">
                              {blog.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )} */}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBlog(blog._id)}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setBlogToDelete(blog._id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are your sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permenantly delete your blog post "
                                  {blog.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={() => setBlogToDelete(null)}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeletBlog}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      {index < userBlogs.length}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Profile;
