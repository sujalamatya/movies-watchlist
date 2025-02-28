"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center border-b-2 border-gray-600">
      <div className="text-xl font-bold">
        <Image
          src="/logotest.png"
          alt="MoveIT Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="flex items-center space-x-6 md:space-x-8">
        {/* Search Form */}
        <SearchBar />

        {/* Hamburger Menu Button (visible on mobile view) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-6 md:items-center top-0 ${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex-row absolute md:relative bg-black md:bg-transparent top-16 left-0 w-full md:w-auto`}
        >
          {["Home", "MyMovies", "Favorites"].map((item) => (
            <li key={item} className="px-6 py-2 md:py-0">
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative hover:underline hover:underline-offset-4"
                onClick={() => setIsMenuOpen(false)} // Close the menu after clicking a link
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
