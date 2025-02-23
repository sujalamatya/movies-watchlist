import React from "react";
import { useStore } from "@/store/useStore";

export default function SearchBar() {
  const { setSearchQuery } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-end">
      <form action="" className="relative w-max">
        <input
          type="search"
          className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-500 ease-in-out focus:w-64 focus:cursor-text focus:border-white focus:pl-16 focus:pr-4"
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 right-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 transition-all duration-500 ease-in-out peer-focus:border-white peer-focus:stroke-white peer-focus:scale-110"
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
    </div>
  );
}
