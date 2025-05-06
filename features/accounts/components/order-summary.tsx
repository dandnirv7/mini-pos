"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { CartItem } from "./cart-item";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
    <div className="sticky p-4 bg-gray-50 rounded-xl top-4">
      {/* Customer Information */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Customer Information</h3>
          <Button variant="ghost" size="icon">
            <Info className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-3 mb-4 bg-white rounded-lg">
          <label className="text-xs text-gray-500">Name</label>
          <p className="font-medium">{displayedUser}</p>
        </div>

        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs text-gray-500">Delivery Address</label>
              <p className="font-medium">123 Coffee Street, Jakarta</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Link href={"/user/profile"}>Change</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Current Order */}
      <div className="mb-6">
        <h3 className="mb-4 font-bold">Your Cart</h3>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div>
        <h3 className="mb-4 font-bold">Payment Summary</h3>

        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>Rp{subtotal.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-red-500">
              -Rp{discount.toLocaleString()}.00
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span>Rp{deliveryFee.toLocaleString()}.00</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between mb-6">
          <span className="font-bold">Total</span>
          <span className="font-bold text-green-600">
            Rp{(subtotal - discount + deliveryFee).toLocaleString()}.00
          </span>
        </div>

        <Button className="w-full text-white bg-black hover:bg-[#F26E41]">
          Checkout
        </Button>
      </div>
    </div>
  );
};
