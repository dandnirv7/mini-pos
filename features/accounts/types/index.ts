export type ApiResponse<T> = {
  data: T;
  status: string;
};

export interface User {
  id: string;
  email: string;
  username?: string;
  fullName: string;
  role?: string;
  status?: string;
  createdAt?: string;
  phoneNumber?: string;
  addresses?: Address[];
}

export interface Address {
  id?: string;
  street: string;
  city?: string;
  state?: string;
  postalCode?: string;
  isPrimary?: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  userId: string;
  totalAmount: number;
  createdAt: string;
  status: string;
  paymentStatus: string;
  discount: number;
  deliveryFee: number;
  items: Item[];
  address: Address;
  user: User;
  shipping: Shipping;
}

export interface Shipping {
  trackingNumber: string;
  estimateDelivery: Date;
  method: string;
  status: string;
}

export interface Item {
  id: string;
  discount: number;
  price: number;
  quantity: number;
  product: Product;
}

export interface Product {
  name: string;
  imageUrl: string | null;
}

export interface DiscountProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  imageUrl: string | null;
  stock: number;
}

export type DiscountParams = {
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  today?: string;
};
