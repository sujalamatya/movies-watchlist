//watchlist and watched page
"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

export default function Page() {
  const {
    watchlist,
    watched,
    favorite,
    setWatchlist,
    setWatched,
    removeFromWatchlist,
    removeFromWatched,
    setFavorite,
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

  const isFavorite = (movieId: number) => {
    return favorite.some((m) => m.id === movieId);
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
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
                <CardFooter className="flex justify-between">
                  <Button
                    variant={"ghost"}
                    className="text-amber-600 hover:text-amber-800 hover:bg-black"
                    onClick={() => removeFromWatched(movie.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="text-amber-600 hover:text-amber-800 hover:bg-black"
                    onClick={() => setFavorite(movie)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isFavorite(movie.id) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
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
