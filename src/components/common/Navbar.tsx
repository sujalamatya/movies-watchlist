"use client";
import { useStore } from "@/store/useStore";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { setSearchQuery } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center border-b-2 border-gray-600">
      <div className="text-xl font-bold">MoveIT</div>

      <div className="flex items-center space-x-6">
        {/* Search Form */}
        <form action="" className="relative w-max">
          <input
            type="search"
            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4"
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 peer-focus:border-white peer-focus:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>

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
