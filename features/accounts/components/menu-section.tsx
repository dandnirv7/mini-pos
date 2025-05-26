"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CartItemData, Product } from "@/features/accounts/types/product";
import { CategoryTabs } from "./category-tabs";

import { Card, CardContent } from "@/components/ui/card";
import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";
import { Minus, Plus } from "lucide-react";
import { useCartActions } from "@/features/accounts/hooks/useCartActions";

type Category = {
  id: string;
  name: string;
};

type MenuSectionProps = {
  cartItems: CartItemData[];
  userId: string;
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  defaultCategory?: string;
};

export const MenuSection = ({
  cartItems,
  userId,
  categories,
  productsByCategory,
  defaultCategory = "coffee",
}: MenuSectionProps) => {
  const [isViewAll, setIsViewAll] = useState(false);

  const { handleAddToCart, updateCartItemQuantity } = useCartActions(userId);

  const mergeProductWithCart = (
    items: Product[],
    cartItems: CartItemData[]
  ): (Product & { inCart: boolean; quantity: number })[] =>
    items.map((item) => {
      const cartMatch = cartItems.find(
        (cartItem) => cartItem.product.id === item.id
      );
      return {
        ...item,
        inCart: !!cartMatch,
        quantity: cartMatch?.quantity || 0,
      };
    });

  const mergedProductsByCategory = useMemo(() => {
    const merged: Record<
      string,
      (Product & { inCart: boolean; quantity: number })[]
    > = {};

    for (const [category, products] of Object.entries(productsByCategory)) {
      merged[category] = mergeProductWithCart(products, cartItems);
    }

    return merged;
  }, [productsByCategory, cartItems]);

  const renderCartControls = (
    item: Product & { inCart: boolean; quantity: number }
  ) => {
    if (!item.inCart) {
      return (
        <Button
          size="sm"
          className="h-8 text-xs text-white bg-[#F26E41] rounded-md hover:bg-[#E05A2E]"
          onClick={() => handleAddToCart(item.id)}
        >
          Add to Cart
        </Button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full h-7 w-7 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800"
          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="text-sm">{item.quantity}</span>
        <Button
          size="icon"
          variant="outline"
          className="text-white rounded-full h-7 w-7 bg-[#F26E41] hover:bg-[#E05A2E]"
          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-3 h-3 text-white" />
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Explore Our Menu</h2>
        <Button
          variant="link"
          className="text-sm dark:text-[#F26E41]"
          onClick={() => setIsViewAll(true)}
        >
          View All
        </Button>
      </div>

      <Tabs defaultValue={defaultCategory} className="w-full">
        <CategoryTabs categories={categories} />

        {Object.entries(mergedProductsByCategory).map(
          ([categoryId, products]) => {
            const visibleProducts =
              categoryId === "all" && !isViewAll
                ? products.slice(0, 12)
                : products;

            return (
              <TabsContent key={categoryId} value={categoryId} className="mt-0">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden border dark:bg-zinc-800"
                    >
                      <div className="relative">
                        <Image
                          src={product.imageUrl || placeholder}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="object-cover w-full h-40 bg-zinc-100"
                        />
                      </div>
                      <CardContent className="px-3 py-4 dark:bg-zinc-800">
                        <h3 className="mb-1 font-medium">{product.name}</h3>
                        <p className="mb-2 text-sm text-gray-500 line-clamp-2 dark:text-muted-foreground">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold ">
                            {toRupiahs(product.price)}
                          </span>
                          {renderCartControls(product)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          }
        )}
      </Tabs>
    </div>
  );
};
