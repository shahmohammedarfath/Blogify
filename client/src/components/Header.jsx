import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Blogify</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gray-300">
                Blog
              </Link>
            </li>
            { user ? (
              <>
              <li>
                  <Link to="/create-blog" className="hover:text-gray-300">
                    Create Post
                  </Link>
                </li>
                <li>
                  <span className="text-gray-300">Welcome, {user}</span>
                </li>
                <li>
                  <button onClick={logout} className="hover:text-gray-300">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
