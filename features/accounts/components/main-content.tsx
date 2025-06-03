"use client";

import { Suspense } from "react";

import { OrderSummary } from "@/features/accounts/components/cart/order-summary";
import { useProducts } from "@/features/accounts/lib/queries/useProducts";
import { useSpecialDiscountProducts } from "@/features/accounts/lib/queries/useSpecialDiscountProducts";
import { useUserCart } from "@/features/accounts/lib/queries/useUserCart";
import { useUserById } from "@/features/accounts/lib/queries/useUserById";

import { categorizeProducts } from "@/features/accounts/utils/categorizeProducts";
import { mapCategories } from "@/features/accounts/utils/mapCategories";

import { Product } from "@/features/accounts/types/product";

import { UserHeader } from "./header";
import { MenuSection } from "./menu-section";
import { SpecialDiscountSection } from "./spesial-dicsount";

const LoadingFallback = () => <p>Loading...</p>;
const ErrorState = () => <p>Error loading products.</p>;

const ProductDisplay = ({ userId }: { userId: string }) => {
  const { data: specialItems = [] } = useSpecialDiscountProducts({ limit: 8 });
  const { data: cartItems = [] } = useUserCart(userId);
  const { data: productResponse, isError } = useProducts({ limit: 30 });
  const { data: userResponse } = useUserById(userId);

  if (isError) return <ErrorState />;

  const addressId = userResponse?.addresses?.[0]?.id || "";
  const cartItemsLength = cartItems.length;
  const productList: Product[] = productResponse?.product || [];

  const productsByCategory = categorizeProducts(productList);
  const categories = mapCategories(productsByCategory);

  return (
    <>
      <UserHeader cartQuantity={cartItemsLength} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SpecialDiscountSection
            userId={userId}
            items={specialItems}
            cartItems={cartItems}
          />
          <MenuSection
            userId={userId}
            cartItems={cartItems}
            categories={categories}
            productsByCategory={productsByCategory}
          />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary
            userId={userId}
            selectedAddressId={addressId}
            cartItems={cartItems}
            specialItems={specialItems}
          />
        </div>
      </div>
    </>
  );
};

const MainContent = ({ userId }: { userId: string }) => (
  <Suspense fallback={<LoadingFallback />}>
    <ProductDisplay userId={userId} />
  </Suspense>
);

export default MainContent;
