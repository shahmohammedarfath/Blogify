import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../utils/api";

const Profile = () => {
  //   const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/user/profile");
        console.log(response);
        //   setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {isEditing ? (
        <form action="">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              value={profile.username}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              value={profile}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Bio
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bio"
              name="bio"
              //   value={}
              //   onChange={}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Social Links
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              type="text"
              name="website"
              placeholder="Website"
              //   value={} onChange={}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              type="text"
              name="twitter"
              placeholder="Twitter"
              //   value={} onChange={}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              //   value={} onChange={}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              type="text"
              name="github"
              placeholder="GitHub"
              //   value={} onChange={}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Profile Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text=gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              type="text"
              id="profilePicture"
              name="profilePicture"
              //   value={} onChange={}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Username:</strong>
            {profile}
          </p>
          <p>
            <strong>Email:</strong>
            {profile}
          </p>
          <p>
            <strong>Bio:</strong>
            {profile}
          </p>
          <div>
            <strong>Social Links:</strong>
            <ul>
              <li>Website</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>GitHub</li>
            </ul>
          </div>
          <img
            src={profile || "./placeholder.svg"}
            alt="Profile Pic"
            className="mt-4 w-32 h-32 rounded-full"
          />
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
