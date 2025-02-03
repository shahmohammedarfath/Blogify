import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center pt-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Blogify</h1>
      {user ? (
        <p className="text-xl mb-6">
          Hello, {user.username}! Ready to explore some amazing stories?
        </p>
      ) : (
        <p className="text-xl mb-8">
          Discover amazing stories and insights from our community of writers.
        </p>
      )}
      <Link
        to="/blog"
        className="inline-block py-3 px-6 no-underline rounded-md text-white font-bold bg-blue-600 hover:bg-blue-400"
      >
        Explore Blog Posts
      </Link>
    </div>
  );
};

export default Home;
