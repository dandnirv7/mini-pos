export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

export interface OrderItemWithProduct {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  discount: number;
  product: Product;
}

export type OrderItemListResponse = OrderItemWithProduct[];
