"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { useTrendingMovies, useSearchMovies, Movie } from "@/api/movies";
import Image from "next/image";

export default function Home() {
  const searchQuery = useStore((state) => state.searchQuery);
  const watchlist = useStore((state) => state.watchlist);
  const favorite = useStore((state) => state.favorite);
  const setWatchlist = useStore((state) => state.setWatchlist);
  const removeFromWatchlist = useStore((state) => state.removeFromWatchlist);
  const setFavorite = useStore((state) => state.setFavorite);

  // Fetching using TanStack Query TEST
  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
  } = useTrendingMovies();
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchMovies(searchQuery, 1);

  const movies = searchQuery ? searchResults : trendingMovies;
  const isLoading = searchQuery ? searchLoading : trendingLoading;
  const error = searchQuery ? searchError : trendingError;

  const isInWatchlist = (movieId: number) =>
    watchlist.some((m) => m.id === movieId);
  const isInFavorite = (movieId: number) =>
    favorite.some((m) => m.id === movieId);

  return (
    <div className="flex flex-col justify-center items-center bg-black">
      {error && (
        <p className="text-red-500">
          {error.message || "Failed to fetch movies"}
        </p>
      )}
      <h1 className="flex justify-center text-3xl font-bold p-5 mt-8 text-amber-600">
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : "Trending Movies This Week"}
      </h1>

      {isLoading && (
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

      {!isLoading && movies?.length === 0 && searchQuery && (
        <p className="text-gray-400 text-center">
          Invalid Input: No movies found.
        </p>
      )}

      {!isLoading && movies?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-6 mt-4">
          {movies.map((movie: Movie) => (
            <Card
              key={movie.id}
              className="w-80 shadow-lg relative overflow-hidden bg-black border-amber-600/50 hover:border-amber-600"
            >
              <CardContent className="relative">
                <div className="relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name || "Movie Poster"}
                    width={500}
                    height={750}
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
                    variant="ghost"
                    size="icon"
                    className="text-amber-600 hover:text-amber-500 hover:bg-black"
                    onClick={() => {
                      if (isInWatchlist(movie.id)) {
                        removeFromWatchlist(movie.id);
                      } else {
                        setWatchlist(movie);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isInWatchlist(movie.id) ? "currentColor" : "none"}
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
                    variant="ghost"
                    size="icon"
                    className="text-amber-600 hover:text-amber-500 hover:bg-black"
                    onClick={() => setFavorite(movie)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isInFavorite(movie.id) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21l-5.5-5.5A6 6 0 0 1 12 3a6 6 0 0 1 5.5 12.5L12 21z"
                      />
                    </svg>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
