import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-2xl">Blogify</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors text-foreground/60 hover:text-foreground/80 hover:underline text-lg"
            >
              Home
            </Link>

            <Link
              to="/blog"
              className="transition-colors text-foreground/60 hover:text-foreground/80 hover:underline text-lg"
            >
              Blogs
            </Link>
            {user && (
              <Link
                to="/create-blog"
                className="transition-colors text-foreground/60 hover:text-foreground/80 hover:underline text-lg"
              >
                Create Post
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="transition-colors text-foreground/60 hover:text-foreground/80 px-4"
                >
                  Profile
                </Link>

                <span className="transition-colors text-foreground/60 hover:text-foreground/80 px-4">
                  Welcome, {user.username}
                </span>

                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="transition-colors text-foreground/60 hover:text-foreground/80 px-4"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="transition-colors text-foreground/60 hover:text-foreground/80 px-4"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
