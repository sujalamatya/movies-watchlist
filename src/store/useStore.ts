import { create } from "zustand";

interface Store {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<Store>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
