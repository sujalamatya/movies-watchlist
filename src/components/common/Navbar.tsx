"use client";

import Link from "next/link";
import Image from "next/image"; // Import the Image component
import SearchBar from "../SearchBar";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center border-b-2 border-gray-600">
      <div className="text-xl font-bold">
        {/* Use the Image component to display the logo */}
        <Image
          src="/logotest.png" // Path to the logo in the public folder
          alt="MoveIT Logo" // Alt text for accessibility
          width={120} // Set the width of the logo
          height={40} // Set the height of the logo
          className="object-contain" // Ensure the logo scales properly
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Form */}
        <SearchBar />

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {["Home", "MyMovies", "Favorites"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative hover:underline hover:underline-offset-4"
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
