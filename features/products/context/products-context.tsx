"use client";

import { useProductsStore } from "@/features/products/store/productsStore";
import { Product } from "@/types/product";
import { createContext, ReactNode, useContext } from "react";

type ProductsDialogType = "delete";

interface ProductsState {
  open: ProductsDialogType | null;
  setOpen: (dialogType: ProductsDialogType | null) => void;
  currentRow: Product | null;
  setCurrentRow: (product: Product | null) => void;
  newStatus: string | null;
  setNewStatus: (status: string | null) => void;
}

const ProductsContext = createContext<ProductsState | undefined>(undefined);

interface ProductsProviders {
  children: ReactNode;
}

export default function ProductsProviders({ children }: ProductsProviders) {
  const store = useProductsStore();

  return (
    <ProductsContext.Provider value={store}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsProviders"
    );
  }

  return context;
};
