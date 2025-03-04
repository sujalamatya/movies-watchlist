import { useQuery } from "@tanstack/react-query";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

// Fetch Trending Movies
export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["trendingMovies"],
    queryFn: async () => {
      const data = await fetcher("/trending/all/week");
      return data.results;
    },
  });
};

// Search Movies
const fetchMoviesBySearch = async (query: string, page: number) => {
  if (!query) return [];
  const data = await fetcher(`/search/movie?query=${query}&page=${page}`);
  return data.results;
};

export const useSearchMovies = (query: string, page: number) => {
  return useQuery({
    queryKey: ["searchMovies", query, page],
    queryFn: () => fetchMoviesBySearch(query, page),
    enabled: !!query,
  });
};
