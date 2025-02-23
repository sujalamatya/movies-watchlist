"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

export default function Page() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (id: number) => {
    const updatedList = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="grid grid-cols-2 w-full bg-black min-h-screen text-white">
      {/* Watchlist Section */}
      <div className="border-r-2 border-amber-600/50 flex flex-col items-center p-6 w-full">
        <h1 className="text-amber-500 font-bold text-3xl mb-4">Watch-List</h1>
        {watchlist.length === 0 ? (
          <p className="text-gray-400">Your saved movies will appear here.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {watchlist.map((movie) => (
              <Card
                key={movie.id}
                className="w-72 shadow-lg bg-black border-amber-600/50 hover:border-amber-600"
              >
                <CardContent className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-60 object-cover rounded"
                  />
                  <h3 className="text-xl font-bold text-amber-600 mt-2 text-center">
                    {movie.title || movie.name}
                  </h3>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant={"ghost"}
                    className="text-red-500 hover:text-red-400"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Watched Section */}
      <div className="flex flex-col items-center p-6 w-full">
        <h1 className="text-amber-500 font-bold text-3xl mb-4">Watched</h1>
        <p className="text-gray-400">
          Movies you have watched will be listed here.
        </p>
      </div>
    </div>
  );
}
