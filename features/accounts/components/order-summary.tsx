"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { CartItem } from "./cart-item";

import toRupiahs from "@/utils/formatCurrency";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export const OrderSummary = ({
  cartItems,
  subtotal = 198500,
  discount = 20000,
  deliveryFee = 15000,
}: {
  cartItems: CartItem[];
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
}) => {
  const { data: session } = useSession();
  const displayedUser = session?.user?.fullName || "Guest";

  return (
    <div className="sticky p-4 top-4">
      <Card className="mb-4 dark:bg-zinc-800 dark:border-zinc-700">
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
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Delivery Address
                </p>
                <p>123 Coffee Street, Jakarta</p>
              </div>
              <Button
                variant="ghost"
                className="h-auto text-[#F26E41] dark:hover:text-[#F26E41] dark:hover:bg-zinc-700"
              >
                Change
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="dark:bg-zinc-800 dark:border-zinc-700">
        <div className="p-4 border-b dark:border-zinc-700">
          <h3 className="text-lg font-bold">Your Cart</h3>
        </div>
        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="pt-4 mt-4 border-t border-zinc-700">
            <h3 className="mb-4 text-lg font-bold">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{toRupiahs(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-red-500">-{toRupiahs(discount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>Rp15,000.00</span>
              </div>
              <div className="flex justify-between pt-2 font-bold border-t border-zinc-700">
                <span>Total</span>
                <span className="text-green-500">{toRupiahs(deliveryFee)}</span>
              </div>
            </div>
          </div>

          <Button className="w-full text-white bg-orange-500 hover:bg-orange-600">
            Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
};
