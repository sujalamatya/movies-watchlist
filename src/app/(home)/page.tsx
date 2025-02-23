"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/common/Card";
import { Button } from "@/components/common/Button";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Ensure this is set in .env.local

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/all/week",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQzYTU2N2QxNmMzMjRkZTgwNzg5ZmQyYjgyMjM3MyIsIm5iZiI6MTc0MDI3OTYwMy44MSwic3ViIjoiNjdiYThmMzNkMzYzMTY5NDY2NDY2NWQ4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Sg9SNdJT5lsxACj8deIw5ktrDB-j0jqQH3_3y2dX824
`,
              "Content-Type": "application/json",
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-black">
      {loading && <p className="text-3xl">Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="flex justify-center text-3xl font-bold p-5 mt-8">
        Trending This Week
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {movies.map((movie: any) => (
          <Card
            key={movie.id}
            className="w-80 shadow-lg relative overflow-hidden"
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
                    <h3 className="text-xl font-bold">
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
                <Button variant={"ghost"}>
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
                <Button variant={"ghost"}>
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
