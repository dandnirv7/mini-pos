import { Product } from "@/types/product";
import { produce } from "immer";
import { create } from "zustand";

type ProductsDialogType = "delete";

interface ProductsState {
  open: ProductsDialogType | null;
  setOpen: (dialogType: ProductsDialogType | null) => void;
  currentRow: Product | null;
  setCurrentRow: (product: Product | null) => void;
  newStatus: string | null;
  setNewStatus: (status: string | null) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  open: null,
  setOpen: (dialogType) =>
    set(
      produce((state) => {
        state.open = dialogType;
      })
    ),
  currentRow: null,
  setCurrentRow: (product) =>
    set(
      produce((state) => {
        state.currentRow = product;
      })
    ),
  newStatus: null,
  setNewStatus: (status) =>
    set(
      produce((state) => {
        state.newStatus = status;
      })
    ),
}));

export const useProducts = useProductsStore;
