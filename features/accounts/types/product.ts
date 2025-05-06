export type Product = {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  rating?: number;
  inCart?: boolean;
  quantity?: number;
};

export type DiscountedProduct = Product & {
  id: number;
  originalPrice: number;
  discount: number;
  inCart: boolean;
  quantity: number;
};
