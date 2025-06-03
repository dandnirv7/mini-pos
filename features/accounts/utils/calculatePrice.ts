import { CartItemData, DiscountItem } from "@/features/accounts/types/product";

type calculateCartSummaryProps = {
  cartItems: CartItemData[];
  specialItems: DiscountItem[];
  deliveryFee?: number;
};

export function calculateCartSummary({
  cartItems,
  specialItems,
  deliveryFee = 0,
}: calculateCartSummaryProps) {
  let subtotal = 0;
  let discount = 0;

  for (const item of cartItems) {
    const originalPrice = item.product.price;
    const special = specialItems.find((s) => s.product.id === item.product.id);
    const discountedPrice = special
      ? Math.round(originalPrice * (1 - special.discount / 100))
      : originalPrice;

    subtotal += discountedPrice * item.quantity;
    discount += (originalPrice - discountedPrice) * item.quantity;
  }

  return {
    subtotal,
    discount,
    total: subtotal + deliveryFee,
  };
}
