import { DiscountItem, CartItemData } from "@/features/accounts/types/product";

export const mergeDiscountWithCart = (
  items: DiscountItem[],
  cartItems: CartItemData[]
): DiscountItem[] =>
  items.map((item) => {
    const cartMatch = cartItems.find(
      (cartItem) => cartItem.product.id === item.product.id
    );
    return {
      ...item,
      inCart: !!cartMatch,
      quantity: cartMatch?.quantity || 0,
    };
  });
