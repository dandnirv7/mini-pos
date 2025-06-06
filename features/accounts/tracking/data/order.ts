const order = {
  id: "NO23578",
  date: new Date(2025, 4, 18),
  status: "shipped",
  items: [
    { name: "Kenyan AA Beans", quantity: 4, price: 53000 },
    { name: "Caramel Macchiato", quantity: 1, price: 22788 },
    { name: "Matcha Latte", quantity: 1, price: 17395 },
  ],
  total: 305406,
  customer: {
    name: "Emerson Gutmann",
    phone: "+62 812-3456-7890",
  },
  shipping: {
    address: "123 Coffee Street, Jakarta",
    city: "Jakarta",
    postalCode: "12345",
    country: "Indonesia",
    method: "Same Day Delivery",
    estimatedDelivery: new Date(2025, 4, 18, 17, 30),
    courier: "NOKU Express",
    courierPhone: "+62 812-9876-5432",
  },
  trackingNumber: "NOKU1234567890",
  currentLocation: "Jakarta Distribution Center",
  timeline: [
    {
      status: "Order Placed",
      date: new Date(2025, 4, 18, 10, 15),
      description: "Your order has been received",
    },
    {
      status: "Payment Confirmed",
      date: new Date(2025, 4, 18, 10, 17),
      description: "Payment has been verified",
    },
    {
      status: "Processing",
      date: new Date(2025, 4, 18, 10, 45),
      description: "Your order is being prepared",
    },
    {
      status: "Shipped",
      date: new Date(2025, 4, 18, 11, 30),
      description: "Your order has been shipped",
    },
    {
      status: "Out for Delivery",
      date: null,
      description: "Your order is on the way",
    },
    {
      status: "Delivered",
      date: null,
      description: "Your order has been delivered",
    },
  ],
};

export default order;
