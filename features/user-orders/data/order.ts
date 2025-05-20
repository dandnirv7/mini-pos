export const orders = [
  {
    id: "ORD-2023-1234",
    date: "May 15, 2023",
    status: "delivered",
    statusText: "Delivered on May 18, 2023",
    total: 125000,
    items: [
      {
        name: "Ethiopia Beans",
        quantity: 2,
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Coffee & Pastry Bundle",
        quantity: 1,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-2023-1235",
    date: "May 20, 2023",
    status: "shipped",
    statusText: "Out for delivery, expected May 22, 2023",
    total: 85000,
    items: [
      {
        name: "Cold Brew",
        quantity: 1,
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Almond Croissant",
        quantity: 2,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-2023-1236",
    date: "May 21, 2023",
    status: "processing",
    statusText: "Preparing your order",
    total: 150000,
    items: [
      {
        name: "Guatemala Beans",
        quantity: 1,
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Home Brewing Kit",
        quantity: 1,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-2023-1237",
    date: "May 10, 2023",
    status: "cancelled",
    statusText: "Cancelled on May 11, 2023",
    total: 45000,
    items: [
      {
        name: "Cappuccino",
        quantity: 1,
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Blueberry Muffin",
        quantity: 1,
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
];
