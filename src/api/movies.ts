import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/all/week",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.results;
};
