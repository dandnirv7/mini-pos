import { create } from "zustand";
import { Product } from "../../types";

type ViewMode = "grid" | "list";

interface ShopState {
  allProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  viewMode: ViewMode;
  priceRange: [number, number];
  selectedOrigins: string[];
  selectedRoastLevels: string[];
  showFilters: boolean;
  setState: (partial: Partial<ShopState>) => void;
  resetFilters: () => void;
}

export const useShopStore = create<ShopState>((set) => ({
  allProducts: [],
  searchQuery: "",
  selectedCategory: "all",
  sortBy: "featured",
  viewMode: "grid",
  priceRange: [0, 1500000],
  selectedOrigins: [],
  selectedRoastLevels: [],
  showFilters: false,
  setState: (partial) => set((state) => ({ ...state, ...partial })),
  resetFilters: () =>
    set((state) => ({
      ...state,
      searchQuery: "",
      selectedCategory: "all",
      sortBy: "featured",
      priceRange: [0, 1500000],
      selectedOrigins: [],
      selectedRoastLevels: [],
    })),
}));
