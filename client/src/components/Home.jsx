import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center" >
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Welcome to Blogify
      </h1>

      <p className="max-w-[700px] text-lg text-muted-foreground mb-8">
        {user
          ? `Hello, ${user.username}! Ready to explore some amazing stories?`
          : "Discover amazing stories and insights from our community of writers."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link to="/blog">Explore Blog Posts</Link>
        </Button>
        {!user && (
          <Button asChild variant="outline">
            <Link to="/register">Join the Community</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
