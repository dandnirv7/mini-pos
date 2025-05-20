export const getDiscountedPrice = (price: number, discount: number): number =>
  Math.round(price * (1 - discount / 100));
