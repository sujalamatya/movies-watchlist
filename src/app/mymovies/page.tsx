"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

export default function Page() {
  const {
    watchlist,
    watched,
    setWatchlist,
    setWatched,
    removeFromWatchlist,
    removeFromWatched,
  } = useStore();

  const handleDragStart = (event: React.DragEvent, movie: any) => {
    event.dataTransfer.setData("movie", JSON.stringify(movie));
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const movie = JSON.parse(event.dataTransfer.getData("movie"));
    removeFromWatchlist(movie.id);
    setWatched(movie);
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
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
                className="w-80 shadow-lg relative overflow-hidden bg-black border-amber-600/50 hover:border-amber-600"
                draggable
                onDragStart={(event) => handleDragStart(event, movie)}
              >
                <CardContent className="relative">
                  <div className="relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-full object-cover rounded transition-all duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col justify-center items-center h-full text-white">
                        <h3 className="text-xl font-bold text-amber-600">
                          {movie.title || movie.name}
                        </h3>
                        <p className="mt-2 text-sm px-4">
                          {movie.overview || "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant={"ghost"}
                    className="text-amber-600 hover:text-amber-800 hover:bg-black"
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
      <div
        className="flex flex-col items-center p-6 w-full"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        <h1 className="text-amber-500 font-bold text-3xl mb-4">Watched</h1>
        {watched.length === 0 ? (
          <p className="text-gray-400">
            Movies you have watched will be listed here.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {watched.map((movie) => (
              <Card
                key={movie.id}
                className="w-80 shadow-lg relative overflow-hidden bg-black border-amber-600/50 hover:border-amber-600"
              >
                <CardContent className="relative">
                  <div className="relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-full object-cover rounded transition-all duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col justify-center items-center h-full text-white">
                        <h3 className="text-xl font-bold text-amber-600">
                          {movie.title || movie.name}
                        </h3>
                        <p className="mt-2 text-sm px-4">
                          {movie.overview || "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant={"ghost"}
                    className="text-amber-600 hover:text-amber-800 hover:bg-black"
                    onClick={() => removeFromWatched(movie.id)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
