export interface Product {
  name: string;
  imageUrl: string | null;
}

export interface Item {
  id: string;
  quantity: number;
  price: number;
  discount: number;
  product: Product;
}

export interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Payment {
  paymentMethod: string;
  bank: string | null;
  transactionStatus: string;
}

export interface OrderDetailResponse {
  orderNumber: string;
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  payment: Payment;
  items: Item[];
  user: User;
  address: Address;
}
