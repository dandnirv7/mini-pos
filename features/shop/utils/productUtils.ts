export function applyDiscount(
  price: number,
  discountPct: number
): { discountedPrice: number; discountPercentage: number } {
  const discountedPrice = Math.round(price * (1 - discountPct / 100));
  return { discountedPrice, discountPercentage: discountPct };
}
