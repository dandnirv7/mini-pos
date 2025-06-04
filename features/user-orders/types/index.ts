export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderHistoryItem {
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: Item[];
}

interface Item {
  quantity: number;
  product: Product;
}

interface Product {
  name: string;
  price: number;
  imageUrl: null;
}
