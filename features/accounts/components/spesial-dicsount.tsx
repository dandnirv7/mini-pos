import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toRupiahs from "@/utils/formatCurrency";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import placeholder from "@/public/placeholder.png";

import { CartItemData, DiscountItem } from "@/features/accounts/types/product";
import { getDiscountedPrice } from "@/features/accounts/utils/getDiscountedPrice";
import { useSpecialDiscount } from "@/features/accounts/hooks/useSpecialDiscount";
import { useCartActions } from "@/features/accounts/hooks/useCartActions";

export const SpecialDiscountSection = ({
  userId,
  onCartUpdate,
  items,
  cartItems,
  title = "Special Discount Today",
}: {
  userId: string;
  onCartUpdate: () => void;
  items: DiscountItem[];
  cartItems: CartItemData[];
  title?: string;
}) => {
  const {
    items: discountedItems,
    timer: { hours, minutes, seconds },
  } = useSpecialDiscount( items, cartItems);

  const { handleAddToCart, updateCartItemQuantity } = useCartActions(
    userId,
    onCartUpdate
  );

  const renderCartControls = (item: DiscountItem) => {
    if (!item.inCart) {
      return (
        <Button
          size="sm"
          className="h-8 text-xs text-white bg-[#F26E41] rounded-md hover:bg-[#E05A2E]"
          onClick={() => handleAddToCart(item.product.id)}
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
          onClick={() =>
            updateCartItemQuantity(item.product.id, item.quantity - 1)
          }
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="text-sm">{item.quantity}</span>
        <Button
          size="icon"
          variant="outline"
          className="text-white rounded-full h-7 w-7 bg-[#F26E41] hover:bg-[#E05A2E]"
          onClick={() =>
            updateCartItemQuantity(item.product.id, item.quantity + 1)
          }
        >
          <Plus className="w-3 h-3 text-white" />
        </Button>
      </div>
    );
  };

  return (
    <section className="mb-8">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-sm">
          Ends in{" "}
          <span className="font-semibold text-red-500">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}{" "}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {discountedItems.map((item) => {
          const { product, discount } = item;

          return (
            <Card
              key={item.id}
              className="overflow-hidden border dark:bg-zinc-800"
            >
              <div className="relative">
                <Image
                  src={product.imageUrl || placeholder}
                  alt={product.name}
                  width={200}
                  height={150}
                  className="object-cover w-full h-40 bg-zinc-100"
                />
                <Badge className="absolute text-black bg-white top-2 left-2 dark:hover:bg-zinc-800 dark:hover:text-white">
                  {discount.toFixed(0)}% OFF
                </Badge>
              </div>

              <CardContent className="px-3 py-4 dark:bg-zinc-800">
                <h3 className="mb-1 text-sm font-medium line-clamp-2">
                  {product.name}
                </h3>

                <div className="mb-1">
                  <span className="text-xs text-gray-400 line-through">
                    {toRupiahs(product.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">
                    {toRupiahs(getDiscountedPrice(product.price, discount))}
                  </span>
                  {renderCartControls(item)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
