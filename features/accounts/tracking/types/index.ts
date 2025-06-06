interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Customer {
  name: string;
  phone: string;
}

interface Shipping {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  method: string;
  estimatedDelivery: Date;
  courier: string;
  courierPhone?: string;
}

interface Timeline {
  status: string;
  date: Date | null;
  description: string;
}

export interface TrackingOrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  items: Item[];
  total: number;
  customer: Customer;
  shipping: Shipping;
  trackingNumber: string | null;
  currentLocation: string;
  timeline: Timeline[];
}

export interface FallbackTrackingItem {
  id: string;
  date: Date;
  status: string;
  items: Item[];
  total: number;
  customer: Customer;
  shipping: Shipping;
  trackingNumber: string;
  currentLocation: string;
  timeline: Timeline[];
}
