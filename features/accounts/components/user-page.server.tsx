"use client";

import { useEffect } from "react";
import UserSkeleton from "../components/user-skeleton";
import { useCart } from "../lib/queries/useCart";
import { useDetailUser } from "../lib/queries/useDetailUser";
import useOrder from "../lib/queries/useOrder";
import { useSpecialDiscountProducts } from "../lib/queries/useSpecialDiscountProducts";
import { useProductsStore } from "../lib/stores/productsStore";
import { useUserStore } from "../lib/stores/userStore";
import { getFrequentlyBoughtProducts } from "../utils/getFrequentlyBoughtProducts";
import UserPageClient from "./user-page-client";

export default function UserPage({ userId }: { userId: string }) {
  const { data: userDetail, isLoading: isUserLoading } = useDetailUser(userId);
  const { data: orders, isLoading: isOrdersLoading } = useOrder();
  const { data: dailyProducts, isLoading: isLoadingDailyProducts } =
    useSpecialDiscountProducts({ limit: 3 });
  const { data: cart, isLoading: isCartLoading } = useCart();

  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setProducts = useProductsStore((state) => state.setProducts);

  useEffect(() => {
    if (userDetail && orders && dailyProducts && cart) {
      const userOrder = orders.filter(
        (order) => order.userId === userDetail.id
      );
      const totalSpent = userOrder.reduce(
        (sum, order) =>
          sum + (order.totalAmount + order.deliveryFee - order.discount),
        0
      );
      const frequentlyBought = getFrequentlyBoughtProducts(userOrder);

      setUserInfo({
        firstName: userDetail.firstName,
        email: userDetail.email,
        phone: userDetail.phoneNumber,
        userSince: userDetail.createdAt,
        totalSpent,
        userOrder,
        frequentlyBought,
        cart,
      });

      setProducts({ personalizedProducts: dailyProducts });
    }
  }, [userDetail, orders, dailyProducts, cart, setUserInfo, setProducts]);

  const isLoading =
    isUserLoading || isOrdersLoading || isLoadingDailyProducts || isCartLoading;

  if (isLoading || !cart) return <UserSkeleton />;

  return <UserPageClient cart={cart} />;
}
