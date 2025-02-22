import { Menu } from "@/types/menu";
import { produce } from "immer";
import { create } from "zustand";

type MenusDialogType = "delete";

interface MenusState {
  open: MenusDialogType | null;
  setOpen: (dialogType: MenusDialogType | null) => void;
  currentRow: Menu | null;
  setCurrentRow: (menu: Menu | null) => void;
  newStatus: string | null;
  setNewStatus: (status: string | null) => void;
}

export const useMenusStore = create<MenusState>((set) => ({
  open: null,
  setOpen: (dialogType) =>
    set(
      produce((state) => {
        state.open = dialogType;
      })
    ),
  currentRow: null,
  setCurrentRow: (menu) =>
    set(
      produce((state) => {
        state.currentRow = menu;
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

export const useMenus = useMenusStore;
