"use client";

import { UserHeader } from "./components/header";
import { MenuSection } from "./components/menu-section";
import { OrderSummary } from "./components/order-summary";
import { SpecialDiscountSection } from "./components/spesial-dicsount";
import {
  allProducts,
  beansProducts,
  bundleProducts,
  cartItems,
  categories,
  coffeeProducts,
  snackProducts,
  specialItems,
  teaProducts,
} from "./data/user-data";
import { UserLayout } from "./layout";

const Page = () => {
  const productsByCategory = {
    all: allProducts,
    coffee: coffeeProducts,
    tea: teaProducts,
    beans: beansProducts,
    bundles: bundleProducts,
    snack: snackProducts,
  };

  return (
    <UserLayout>
      <UserHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpecialDiscountSection items={specialItems} />
          <MenuSection
            categories={categories}
            productsByCategory={productsByCategory}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>
    </UserLayout>
  );
};

export default Page;
