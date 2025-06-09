import { create } from "zustand";
import { DiscountProduct } from "../../types";

type ProductState = {
  personalizedProducts: DiscountProduct[];
  setProducts: (data: Partial<ProductState>) => void;
};

export const useProductsStore = create<ProductState>((set) => ({
  personalizedProducts: [],
  setProducts: (data) => set((state) => ({ ...state, ...data })),
}));
