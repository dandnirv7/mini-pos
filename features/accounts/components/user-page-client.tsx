import QuickStats from "../components/quick-stats";
import RecentOrders from "../components/recent-orders";
import PersonalizedDailyDeals from "../components/personalized-daily-deals";
import QuickActions from "../components/quick-actions";
import FrequentlyBought from "../components/frequently-bought";
import DeliveryPreferences from "../components/delivery-preferences";
import { Cart } from "../types";
import { useUserStore } from "../lib/stores/userStore";

interface Props {
  cart: Cart;
}

export default function UserPageClient({ cart }: Props) {
  const firstName = useUserStore().firstName;

  return (
    <>
      <header className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Welcome back, {firstName}! ☕
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your coffee journey
        </p>
      </header>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <QuickStats />
          <RecentOrders />
          <PersonalizedDailyDeals cart={cart} />
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
