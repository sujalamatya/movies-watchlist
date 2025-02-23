"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Home() {
  const searchQuery = useStore((state) => state.searchQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`
          : "https://api.themoviedb.org/3/trending/all/week";

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        });

        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]); // Refetch query change

  return (
    <div className="flex flex-col justify-center items-center bg-black">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="flex justify-center text-3xl font-bold p-5 mt-8 text-amber-600">
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : "Trending Movies This Week"}
      </h1>

      {loading && (
        <div className="flex text-3xl h-[85dvh] items-center text-white">
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading movies...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-6 mt-4">
        {movies.map((movie: any) => (
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
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button
                  variant={"ghost"}
                  className="text-amber-600 hover:text-amber-500 hover:bg-black"
                  onClick={() => {
                    const existingWatchlist = JSON.parse(
                      localStorage.getItem("watchlist") || "[]"
                    );

                    // Prevent duplicates
                    if (!existingWatchlist.some((m) => m.id === movie.id)) {
                      const updatedWatchlist = [...existingWatchlist, movie];
                      localStorage.setItem(
                        "watchlist",
                        JSON.stringify(updatedWatchlist)
                      );
                    }
                  }}
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>

                <Button
                  variant={"ghost"}
                  className="text-amber-600 hover:text-amber-500 hover:bg-black"
                  onClick={() => {
                    const existingFavorite = JSON.parse(
                      localStorage.getItem("favorite") || "[]"
                    );

                    // Prevent duplicates
                    if (!existingFavorite.some((m) => m.id === movie.id)) {
                      const updatedFavorite = [...existingFavorite, movie];
                      localStorage.setItem(
                        "favorite",
                        JSON.stringify(updatedFavorite)
                      );
                    }
                  }}
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
