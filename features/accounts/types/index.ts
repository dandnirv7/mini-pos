export type ApiResponse<T> = {
  data: T;
  status: string;
};

// =====================
// User-related Types
// =====================

export interface User {
  id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
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

// =====================
// Product Types
// =====================

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  description: string;
  imageUrl: string | null;
  status: string;
  stock: number;
  weight: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
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

// =====================
// Order Types
// =====================

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

export interface Item {
  id: string;
  discount: number;
  price: number;
  quantity: number;
  product: Product;
}

export interface Shipping {
  trackingNumber: string;
  estimateDelivery: Date;
  method: string;
  status: string;
}

// =====================
// Cart Types
// =====================

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
}
