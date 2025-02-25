//favorite page
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorite") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (movie: any) => {
    const isFavorite = favorites.some((m) => m.id === movie.id);
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((m) => m.id !== movie.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-black w-full min-h-screen text-white p-6">
      <h1 className="flex justify-center text-amber-500 font-bold text-3xl mb-6 p-6">
        Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-6 mt-4">
          {favorites.map((movie) => (
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
                  variant="ghost"
                  className="text-amber-600 hover:text-amber-800 hover:bg-black"
                  onClick={() => toggleFavorite(movie)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      favorites.some((m) => m.id === movie.id)
                        ? "currentColor"
                        : "none"
                    }
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
  );
}
