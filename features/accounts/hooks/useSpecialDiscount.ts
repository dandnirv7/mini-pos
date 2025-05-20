import { CartItemData, DiscountItem } from "@/features/accounts/types/product";
import { getExpiryTimestamp } from "@/features/accounts/utils/getExpiryTimestamp";
import { mergeDiscountWithCart } from "@/features/accounts/utils/mergeDiscountWithCart";
import { useMemo } from "react";
import { useTimer } from "react-timer-hook";

export function useSpecialDiscount(
  items: DiscountItem[],
  cartItems: CartItemData[]
) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    onExpire: () => console.warn("Time's up!"),
  });

  const mergedItems = useMemo(
    () => mergeDiscountWithCart(items, cartItems),
    [items, cartItems]
  );

  return {
    items: mergedItems,
    timer: { seconds, minutes, hours },
  };
}
