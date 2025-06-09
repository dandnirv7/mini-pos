import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartType, OrderItem } from "../../types";

interface FrequentlyProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  lastOrdered: string;
  orderCount: number;
}

type UserState = {
  username?: string;
  email?: string;
  phone?: string;
  totalSpent: string;
  userSince?: string;
  userOrder: OrderItem[];
  frequentlyBought: FrequentlyProductItem[];
  cart: CartType | null;
  setUserInfo: (data: Partial<UserState>) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      email: "",
      phone: "",
      totalSpent: "0",
      userSince: "",
      userOrder: [],
      frequentlyBought: [],
      cart: null,
      setUserInfo: (data) => set((state) => ({ ...state, ...data })),
      resetUser: () =>
        set({
          username: "",
          email: "",
          phone: "",
          totalSpent: "0",
          userSince: "",
          userOrder: [],
          frequentlyBought: [],
          cart: null,
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        username: state.username,
        email: state.email,
        phone: state.phone,
        totalSpent: state.totalSpent,
        userSince: state.userSince,
        userOrder: state.userOrder,
        frequentlyBought: state.frequentlyBought,
        cart: state.cart,
      }),
    }
  )
);
