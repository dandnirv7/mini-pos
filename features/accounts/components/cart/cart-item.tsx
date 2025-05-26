"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import toRupiahs from "@/utils/formatCurrency";
import { CartItemData } from "@/features/accounts/types/product";
import { useCartActions } from "@/features/accounts/hooks/useCartActions";

type CartItemProps = {
  userId: string;
  item: CartItemData;
};

export const CartItem = ({ userId, item }: CartItemProps) => {
  const { updateCartItemQuantity } = useCartActions(userId);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Image
          src={item.product.imageUrl || "/placeholder.svg"}
          alt={item.product.name}
          width={60}
          height={60}
          className="w-[60px] h-[60px] object-cover rounded bg-gray-100 dark:bg-gray-50"
        />
        <div>
          <p className="font-medium">{item.product.name}</p>
          <p className="text-orange-500">{toRupiahs(item.product.price)}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full h-7 w-7 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800"
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity - 1)
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
                  updateCartItemQuantity(item.id, item.quantity + 1)
                }
              >
                <Plus className="w-3 h-3 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
