export interface OrderItem {
  id: string;
  product: {
    name: string;
  };
  price: number;
  quantity: number;
}

export interface User {
  fullName: string;
  email: string;
  phoneNumber?: string;
}

export interface Order {
  orderNumber: string;
  items: OrderItem[];
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  user: User;
}

export interface PaymentRequest {
  order_id: string;
  deliveryFee?: number;
  discount?: number;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface PaymentResponse {
  data: {
    token: string;
  };
}
