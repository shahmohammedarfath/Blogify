import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center pt-8">
      <h1 className="text-4xl mb-4">Welcome to Blogify</h1>
      <p className="text-xl mb-8">
        Discover amazing stories and insights from our community of writers.
      </p>
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
