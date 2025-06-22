import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, OrderItem } from "../../types";

interface FrequentlyProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  lastOrdered: string;
  orderCount: number;
}

type UserState = {
  firstName?: string;
  email?: string;
  phone?: string;
  totalSpent: number;
  userSince?: string;
  userOrder: OrderItem[];
  frequentlyBought: FrequentlyProductItem[];
  cart: Cart | null;
  setUserInfo: (data: Partial<UserState>) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: "",
      email: "",
      phone: "",
      totalSpent: 0,
      userSince: "",
      userOrder: [],
      frequentlyBought: [],
      cart: null,
      setUserInfo: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
      resetUser: () =>
        set({
          firstName: "",
          email: "",
          phone: "",
          totalSpent: 0,
          userSince: "",
          userOrder: [],
          frequentlyBought: [],
          cart: null,
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        firstName: state.firstName,
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
