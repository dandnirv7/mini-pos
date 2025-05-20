"use client";

import { Suspense } from "react";
import { OrderSummary } from "@/features/accounts/components/cart/order-summary";
import { useUserCart } from "@/features/accounts/lib/queries/useUserCart";
import { useProducts } from "@/features/accounts/lib/queries/useProducts";
import { useSpecialDiscountProducts } from "@/features/accounts/lib/queries/useSpecialDiscountProducts";
import { UserHeader } from "./header";
import { MenuSection } from "./menu-section";
import { SpecialDiscountSection } from "./spesial-dicsount";
import { Product } from "@/features/accounts/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { categorizeProducts } from "@/features/accounts/utils/categorizeProducts";
import { mapCategories } from "@/features/accounts/utils/mapCategories";

const LoadingFallback = () => <p>Loading...</p>;

const ErrorState = () => <p>Error loading products.</p>;

const ProductDisplay = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  const { data: specialItems = [] } = useSpecialDiscountProducts({
    limit: 8,
    today: new Date().toISOString().split("T")[0],
  });

  const { data: cartItems = [] } = useUserCart(userId);
  const cartItemsLength = cartItems.length;

  const { data: productResponse, isError } = useProducts({ limit: 30 });
  const productList: Product[] = productResponse?.product || [];

  if (isError) return <ErrorState />;

  const productsByCategory = categorizeProducts(productList);
  const categories = mapCategories(productsByCategory);

  const handleCartUpdate = () => {
    queryClient.invalidateQueries({
      queryKey: ["user-cart", userId],
    });
  };

  return (
    <>
      <UserHeader cartQuantity={cartItemsLength} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SpecialDiscountSection
            onCartUpdate={handleCartUpdate}
            userId={userId}
            items={specialItems}
            cartItems={cartItems}
          />
          <MenuSection
            cartItems={cartItems}
            onCartUpdate={handleCartUpdate}
            userId={userId}
            categories={categories}
            productsByCategory={productsByCategory}
          />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary
            onCartUpdate={handleCartUpdate}
            userId={userId}
            cartItems={cartItems}
            specialItems={specialItems}
          />
        </div>
      </div>
    </>
  );
};

const MainContent = ({ userId }: { userId: string }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductDisplay userId={userId} />
    </Suspense>
  );
};

export default MainContent;
