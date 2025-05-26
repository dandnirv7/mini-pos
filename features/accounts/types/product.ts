export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: {
    name: string;
  };
  price: number;
  description: string;
  imageUrl?: string | null | undefined;
  status: "available" | "unavailable";
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DiscountData {
  id: string;
  productId: string;
  discount: number;
  date: string;
  createdAt: string;
  product: Product;
}

export type DiscountedProduct = Product & {
  id: number;
  originalPrice: number;
  discount: number;
  inCart: boolean;
  quantity: number;
};

export type CartItemData = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
  inCart?: boolean;
};

export type DiscountItem = {
  id: string;
  discount: number;
  startDate: string | Date;
  endDate: string;
  createdAt: string;
  quantity?: number;
  inCart?: boolean;
  product: Product;
};

export type DiscountParams = {
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  today?: string;
};

export type ApiResponse<T> = {
  data: T;
  status: string;
};
