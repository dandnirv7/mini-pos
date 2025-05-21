"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItemData, DiscountItem } from "@/features/accounts/types/product";
import toRupiahs from "@/utils/formatCurrency";
import { useSession } from "next-auth/react";

import { Info, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartActions } from "@/features/accounts/hooks/useCartActions";
import Link from "next/link";
import placeholder from "@/public/placeholder.png";

type OrderSummaryProps = {
  userId: string;
  onCartUpdate: () => void;
  cartItems: CartItemData[];
  specialItems: DiscountItem[];
  deliveryFee?: number;
};

export const OrderSummary = ({
  userId,
  onCartUpdate,
  cartItems,
  specialItems,
  deliveryFee = 15000,
}: OrderSummaryProps) => {
  const { data: session } = useSession();
  const displayedUser = session?.user?.fullName || "Guest";
  const { updateCartItemQuantity, handleCartDelete } = useCartActions(
    userId,
    onCartUpdate
  );

  const getDiscountedPrice = (productId: string, price: number): number => {
    const special = specialItems.find((item) => item.product.id === productId);
    return special ? Math.round(price * (1 - special.discount / 100)) : price;
  };

  let subtotal = 0;
  let discount = 0;

  cartItems.forEach((item) => {
    const originalPrice = item.product.price;
    const discountedPrice = getDiscountedPrice(item.product.id, originalPrice);
    subtotal += discountedPrice * item.quantity;
    discount += (originalPrice - discountedPrice) * item.quantity;
  });

  const total = subtotal + deliveryFee;

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
              <p>123 Coffee Street, Jakarta</p>
            </div>
            <Link href="/user/settings">
              <Button
                variant="ghost"
                className="h-auto text-[#F26E41] dark:hover:text-[#F26E41] dark:hover:bg-zinc-700"
              >
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
                    className="w-[60px] h-[60px] object-cover rounded bg-gray-100 dark:bg-gray-50"
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
                        className="rounded-full h-7 w-7 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
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
                          updateCartItemQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={() => handleCartDelete(item.product.id)}
                >
                  <Trash2 className="w-4 h-4" />
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
            </div>

            <Button className="w-full text-white bg-orange-500 hover:bg-orange-600">
              <Link href={"/user/checkout/payment"}>Checkout</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
