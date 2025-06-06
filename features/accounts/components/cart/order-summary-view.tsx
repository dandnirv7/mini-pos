"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItemData, DiscountItem } from "@/features/accounts/types/product";
import { Info, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";

interface Address {
  id: string;
  street: string;
  isPrimary: boolean;
}

type Props = {
  displayedUser: string;
  address: Address;
  cartItems: CartItemData[];
  specialItems: DiscountItem[];
  deliveryFee: number;
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  error?: string | null;
  isPending: boolean;
};

export const OrderSummaryView = ({
  displayedUser,
  address,
  cartItems,
  deliveryFee,
  subtotal,
  discount,
  total,
  onCheckout,
  onQuantityChange,
  onRemove,
  error,
  isPending,
}: Props) => {
  return (
    <div className="sticky p-4 top-4 space-y-4">
      {/* Customer Info */}
      <Card className="dark:bg-zinc-800 dark:border-zinc-700">
        <div className="p-4 border-b dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Customer Information</h3>
            <Info className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{displayedUser}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Delivery Address</p>
              <p>{address?.street}, Jakarta</p>
            </div>
            <Link href="/user/settings">
              <Button variant="ghost" className="h-auto text-[#F26E41]">
                Change
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <Card className="dark:bg-zinc-800 dark:border-zinc-700">
          <div className="p-4 border-b dark:border-zinc-700">
            <h3 className="text-lg font-bold">Your Cart</h3>
          </div>
          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Image
                    src={item.product.imageUrl || placeholder}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="object-cover rounded w-[60px] h-[60px]"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-orange-500">
                      {toRupiahs(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-7 w-7"
                        onClick={() =>
                          onQuantityChange(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        className="text-white rounded-full h-7 w-7 bg-[#F26E41]"
                        onClick={() =>
                          onQuantityChange(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(item.product.id)}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            ))}

            {/* Payment Summary */}
            <div className="pt-4 mt-4 border-t border-zinc-700">
              <h3 className="mb-4 text-lg font-bold">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{toRupiahs(subtotal + discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-red-500">- {toRupiahs(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{toRupiahs(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold border-t border-zinc-700">
                  <span>Total</span>
                  <span className="text-green-500">{toRupiahs(total)}</span>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                className="w-full text-white mt-4 bg-orange-500"
                onClick={onCheckout}
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Checkout"}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
