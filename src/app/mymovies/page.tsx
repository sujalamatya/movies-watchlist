import React from "react";

export default function Page() {
  return (
    <div className="grid grid-cols-2 w-full bg-black h-screen text-white">
      <div className="border-r-2 border-amber-600/50 flex flex-col items-center p-6">
        <h1 className="text-amber-500 font-bold text-3xl mb-4">Watch-List</h1>
        <p className="text-gray-400">Your saved movies will appear here.</p>
      </div>
      <div className="flex flex-col items-center  p-6">
        <h1 className="text-amber-500 font-bold text-3xl mb-4">Watched</h1>
        <p className="text-gray-400">
          Movies you have watched will be listed here.
        </p>
      </div>
    </div>
  );
}
