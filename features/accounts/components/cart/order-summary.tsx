"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";
import { useCartActions } from "@/features/accounts/hooks/useCartActions";
import { OrderSummaryView } from "./order-summary-view";
import { CartItemData, DiscountItem } from "@/features/accounts/types/product";
import { calculateCartSummary } from "../../utils/calculatePrice";

type OrderSummaryProps = {
  userId: string;
  cartItems: CartItemData[];
  specialItems: DiscountItem[];
  selectedAddressId: string;
  deliveryFee?: number;
};

export const OrderSummary = ({
  userId,
  cartItems,
  specialItems,
  selectedAddressId,
  deliveryFee = 15000,
}: OrderSummaryProps) => {
  const { data: session } = useSession();
  const displayedUser = session?.user?.fullName || "Guest";

  const { mutate: checkout, isPending } = useCheckout();
  const [error, setError] = useState<string | null>(null);

  const { updateCartItemQuantity, removeFromCart } = useCartActions(userId);

  const { subtotal, discount, total } = calculateCartSummary({
    cartItems,
    specialItems,
    deliveryFee,
  });

  const handleCheckout = () => {
    if (!selectedAddressId) {
      setError("Please select a shipping address");
      return;
    }
    setError(null);
    checkout({ addressId: selectedAddressId });
  };

  return (
    <OrderSummaryView
      displayedUser={displayedUser}
      cartItems={cartItems}
      specialItems={specialItems}
      deliveryFee={deliveryFee}
      subtotal={subtotal}
      discount={discount}
      total={total}
      onCheckout={handleCheckout}
      onQuantityChange={updateCartItemQuantity}
      onRemove={removeFromCart}
      error={error}
      isPending={isPending}
    />
  );
};
