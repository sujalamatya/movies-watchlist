import { create } from "zustand";

// Define the Movie interface with the properties you expect for a movie
interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
}

interface Store {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  watchlist: Movie[];
  watched: Movie[];
  favorite: Movie[];

  setWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  setWatched: (movie: Movie) => void;
  removeFromWatched: (id: number) => void;
  setFavorite: (movie: Movie) => void;
}

export const useStore = create<Store>((set) => {
  // Initialize state variables with default empty arrays
  let initialWatchlist: Movie[] = [];
  let initialWatched: Movie[] = [];
  let initialFavorite: Movie[] = [];

  // Check if the code is running on the client-side before accessing localStorage
  if (typeof window !== "undefined") {
    try {
      // Fetch data from localStorage if available
      initialWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      initialWatched = JSON.parse(localStorage.getItem("watched") || "[]");
      initialFavorite = JSON.parse(localStorage.getItem("favorite") || "[]");
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }

  return {
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    watchlist: initialWatchlist,
    watched: initialWatched,
    favorite: initialFavorite,

    setWatchlist: (movie) =>
      set((state) => {
        const updatedWatchlist = [...state.watchlist, movie];
        if (typeof window !== "undefined") {
          localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        }
        return { watchlist: updatedWatchlist };
      }),

    removeFromWatchlist: (id) =>
      set((state) => {
        const updatedWatchlist = state.watchlist.filter((m) => m.id !== id);
        if (typeof window !== "undefined") {
          localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        }
        return { watchlist: updatedWatchlist };
      }),

    setWatched: (movie) =>
      set((state) => {
        const updatedWatched = [...state.watched, movie];
        if (typeof window !== "undefined") {
          localStorage.setItem("watched", JSON.stringify(updatedWatched));
        }
        return { watched: updatedWatched };
      }),

    removeFromWatched: (id) =>
      set((state) => {
        const updatedWatched = state.watched.filter((m) => m.id !== id);
        if (typeof window !== "undefined") {
          localStorage.setItem("watched", JSON.stringify(updatedWatched));
        }
        return { watched: updatedWatched };
      }),

    setFavorite: (movie) =>
      set((state) => {
        const updatedFavorite = state.favorite.some((m) => m.id === movie.id)
          ? state.favorite.filter((m) => m.id !== movie.id) // Remove if already in the favorite list
          : [...state.favorite, movie]; // Add to favorites if not already present
        if (typeof window !== "undefined") {
          localStorage.setItem("favorite", JSON.stringify(updatedFavorite));
        }
        return { favorite: updatedFavorite };
      }),
  };
});
