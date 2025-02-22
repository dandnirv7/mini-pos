"use client";

import { Menu } from "@/types/menu";
import { createContext, ReactNode, useContext } from "react";
import { useMenusStore } from "@/features/menus/store/menusStore";

type MenusDialogType = "delete";

interface MenusState {
  open: MenusDialogType | null;
  setOpen: (dialogType: MenusDialogType | null) => void;
  currentRow: Menu | null;
  setCurrentRow: (menu: Menu | null) => void;
  newStatus: string | null;
  setNewStatus: (status: string | null) => void;
}

const MenusContext = createContext<MenusState | undefined>(undefined);

interface MenusProviders {
  children: ReactNode;
}

export default function MenusProviders({ children }: MenusProviders) {
  const store = useMenusStore();

  return (
    <MenusContext.Provider value={store}>{children}</MenusContext.Provider>
  );
}

export const useMenusContext = () => {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("useMenusContext must be used within a MenusProviders");
  }

  return context;
};
