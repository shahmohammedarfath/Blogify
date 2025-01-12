import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-nav-head text-white p-4 flex justify-between items-center">
      <div className="text-white no-underline text-2xl font-bold">
        <Link to="/">Blogify</Link>
      </div>
      <nav>
        <ul className="list-none flex gap-4">
          <li className="text-white no-underline hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white no-underline hover:underline">
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
