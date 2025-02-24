import { create } from "zustand";

interface Store {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  watchlist: any[];
  watched: any[];
  favorite: any[];

  setWatchlist: (movie: any) => void;
  removeFromWatchlist: (id: number) => void;
  setWatched: (movie: any) => void;
  removeFromWatched: (id: number) => void;
  setFavorite: (movie: any) => void;
}

export const useStore = create<Store>((set) => {
  const initialWatchlist = JSON.parse(
    localStorage.getItem("watchlist") || "[]"
  );
  const initialWatched = JSON.parse(localStorage.getItem("watched") || "[]");
  const initialFavorite = JSON.parse(localStorage.getItem("favorite") || "[]");

  return {
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    watchlist: initialWatchlist,
    watched: initialWatched,
    favorite: initialFavorite,

    setWatchlist: (movie) =>
      set((state) => {
        const updatedWatchlist = [...state.watchlist, movie];
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        return { watchlist: updatedWatchlist };
      }),

    removeFromWatchlist: (id) =>
      set((state) => {
        const updatedWatchlist = state.watchlist.filter((m) => m.id !== id);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        return { watchlist: updatedWatchlist };
      }),

    setWatched: (movie) =>
      set((state) => {
        const updatedWatched = [...state.watched, movie];
        localStorage.setItem("watched", JSON.stringify(updatedWatched));
        return { watched: updatedWatched };
      }),

    removeFromWatched: (id) =>
      set((state) => {
        const updatedWatched = state.watched.filter((m) => m.id !== id);
        localStorage.setItem("watched", JSON.stringify(updatedWatched));
        return { watched: updatedWatched };
      }),

    setFavorite: (movie) =>
      set((state) => {
        const updatedFavorite = state.favorite.some((m) => m.id === movie.id)
          ? state.favorite.filter((m) => m.id !== movie.id)
          : [...state.favorite, movie];
        localStorage.setItem("favorite", JSON.stringify(updatedFavorite));
        return { favorite: updatedFavorite };
      }),
  };
});
