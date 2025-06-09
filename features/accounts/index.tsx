"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";

import DeliveryPreferences from "./components/delivery-preferences";
import PersonalizedDailyDeals from "./components/personalized-daily-deals";
import QuickActions from "./components/quick-actions";
import QuickStats from "./components/quick-stats";
import RecentOrders from "./components/recent-orders";
import UserSkeleton from "./components/user-skeleton";
import FrequentlyBought from "./components/frequently-bought";

import { useDetailUser } from "./lib/queries/useDetailUser";
import useOrder from "./lib/queries/useOrder";
import { useSpecialDiscountProducts } from "./lib/queries/useSpecialDiscountProducts";
import { getFrequentlyBoughtProducts } from "./utils/getFrequentlyBoughtProducts";

import { useUserStore } from "./lib/stores/userStore";
import { useCart } from "./lib/queries/useCart";
import { useProductsStore } from "./lib/stores/productsStore";

export default function UserPage() {
  const { data: sessionData } = useSession();

  const { data: userDetail, isLoading: isUserLoading } = useDetailUser(
    sessionData?.user?.id ?? ""
  );

  const { data: orders, isLoading: isOrdersLoading } = useOrder();
  const { data: dailyProducts, isLoading: isLoadingDailyProducts } =
    useSpecialDiscountProducts({ limit: 3 });
  const { data: cart, isLoading: isCartLoading } = useCart();

  const userOrder = useMemo(() => {
    if (!orders || !userDetail) return [];
    return orders.filter((order) => order.userId === userDetail.id);
  }, [orders, userDetail]);

  const totalSpent = useMemo(() => {
    if (!userOrder) return "0";
    const total = userOrder.reduce(
      (sum, order) =>
        sum + (order.totalAmount + order.deliveryFee - order.discount),
      0
    );
    return total.toFixed(0);
  }, [userOrder]);

  const frequentlyBought = useMemo(() => {
    return getFrequentlyBoughtProducts(userOrder || []);
  }, [userOrder]);

  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    if (userDetail && totalSpent && userOrder) {
      setUserInfo({
        username: userDetail.fullName,
        email: userDetail.email,
        phone: userDetail.phoneNumber,
        userSince: userDetail.createdAt,
        totalSpent,
        userOrder,
        frequentlyBought,
        cart: cart ?? null,
      });
    }
  }, [userDetail, totalSpent, userOrder, frequentlyBought, setUserInfo, cart]);

  const username = useUserStore((state) => state.username);

  const setProducts = useProductsStore((state) => state.setProducts);

  useEffect(() => {
    if (dailyProducts) {
      setProducts({ personalizedProducts: dailyProducts });
    }
  }, [dailyProducts, setProducts]);

  const isLoading =
    isUserLoading || isOrdersLoading || isLoadingDailyProducts || isCartLoading;

  if (isLoading) {
    return <UserSkeleton />;
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Welcome back, {username!.split(" ")[0]}! ☕
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your coffee journey
        </p>
      </header>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <QuickStats />
          <RecentOrders />
          <PersonalizedDailyDeals />
        </section>

        <aside className="space-y-6">
          <QuickActions />
          <FrequentlyBought />
          <DeliveryPreferences />
        </aside>
      </main>
    </>
  );
}
