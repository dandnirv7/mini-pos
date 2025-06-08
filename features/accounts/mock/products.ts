// Sample Data
export const categories = [
  { id: "all", name: "All" },
  { id: "coffee", name: "Coffee" },
  { id: "tea", name: "Tea" },
  { id: "beans", name: "Beans" },
  { id: "bundles", name: "Bundles" },
  { id: "snack", name: "Snack" },
];

export const specialItems = [
  {
    id: 1,
    name: "Signature Latte",
    image: "/placeholder.svg?height=150&width=200",
    price: 42500,
    originalPrice: 50000,
    discount: 15,
    inCart: false,
    quantity: 0,
  },
  {
    id: 2,
    name: "Premium Drip Coffee",
    image: "/placeholder.svg?height=150&width=200",
    price: 29750,
    originalPrice: 35000,
    discount: 15,
    inCart: true,
    quantity: 2,
  },
  {
    id: 3,
    name: "Matcha Green Tea",
    image: "/placeholder.svg?height=150&width=200",
    price: 38250,
    originalPrice: 45000,
    discount: 15,
    inCart: false,
    quantity: 0,
  },
  {
    id: 4,
    name: "Coffee & Pastry Bundle",
    image: "/placeholder.svg?height=150&width=200",
    price: 59500,
    originalPrice: 70000,
    discount: 15,
    inCart: true,
    quantity: 1,
  },
];

// Coffee Products
export const coffeeProducts = [
  {
    id: 5,
    name: "Espresso",
    description:
      "Strong concentrated coffee brewed by forcing hot water under pressure through finely ground coffee beans",
    price: 25000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 6,
    name: "Cappuccino",
    description:
      "Equal parts espresso, steamed milk, and milk foam for a perfect balance",
    price: 35000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 7,
    name: "Latte",
    description: "Espresso with steamed milk and a light layer of foam on top",
    price: 32000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 8,
    name: "Americano",
    description:
      "Espresso diluted with hot water for a milder coffee experience",
    price: 28000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 9,
    name: "Mocha",
    description:
      "Espresso with chocolate syrup, steamed milk, and whipped cream",
    price: 38000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 10,
    name: "Cold Brew",
    description:
      "Coffee brewed with cold water over 12-24 hours for a smooth, less acidic taste",
    price: 30000,
    image: "/placeholder.svg?height=300&width=200",
  },
];

// Tea Products
export const teaProducts = [
  {
    id: 11,
    name: "Earl Grey",
    description: "Black tea flavored with oil of bergamot for a citrusy aroma",
    price: 25000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 12,
    name: "Green Tea",
    description:
      "Delicate tea with a fresh, grassy flavor and numerous health benefits",
    price: 23000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 13,
    name: "Chai Tea Latte",
    description: "Spiced black tea with steamed milk and honey",
    price: 32000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 14,
    name: "Jasmine Tea",
    description:
      "Green tea scented with jasmine flowers for a fragrant experience",
    price: 24000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 15,
    name: "Chamomile",
    description:
      "Herbal tea known for its calming properties and subtle apple-like flavor",
    price: 22000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 16,
    name: "Matcha Latte",
    description:
      "Powdered green tea whisked with steamed milk for a creamy experience",
    price: 35000,
    image: "/placeholder.svg?height=300&width=200",
  },
];

// Beans Products
export const beansProducts = [
  {
    id: 17,
    name: "Indonesian Beans",
    description: "Sumatra coffee beans with the best quality",
    price: 35000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 18,
    name: "Ethiopia Beans",
    description: "Ethiopia coffee beans with the best quality",
    price: 33500,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 19,
    name: "Peru Beans",
    description: "Peru coffee beans with the best quality",
    price: 30000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 20,
    name: "Costa Rica Beans",
    description: "Costa Rica coffee beans with the best quality",
    price: 34000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 21,
    name: "Guatemala Beans",
    description: "Guatemala coffee beans with the best quality",
    price: 35000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 22,
    name: "Colombia Beans",
    description: "Colombia coffee beans with the best quality",
    price: 33000,
    image: "/placeholder.svg?height=300&width=200",
  },
];

// Bundle Products
export const bundleProducts = [
  {
    id: 23,
    name: "Morning Starter Pack",
    description: "Coffee beans, brewing equipment, and a reusable cup",
    price: 150000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 24,
    name: "Coffee & Pastry Bundle",
    description: "Any coffee of your choice with a freshly baked pastry",
    price: 45000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 25,
    name: "Home Brewing Kit",
    description: "French press, grinder, and 250g of premium beans",
    price: 350000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 26,
    name: "Coffee Tasting Set",
    description: "Sample 6 different single-origin beans in a gift box",
    price: 180000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 27,
    name: "Monthly Subscription",
    description: "Receive 500g of different beans every month",
    price: 250000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 28,
    name: "Gift Pack",
    description: "Premium beans, branded mug, and chocolate treats",
    price: 200000,
    image: "/placeholder.svg?height=300&width=200",
  },
];

// Snack Products
export const snackProducts = [
  {
    id: 29,
    name: "Almond Croissant",
    description:
      "Buttery croissant filled with almond cream and topped with sliced almonds",
    price: 28000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 30,
    name: "Chocolate Chip Cookie",
    description: "Freshly baked cookie with premium chocolate chunks",
    price: 15000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 31,
    name: "Banana Bread",
    description: "Moist banana bread with walnuts and a hint of cinnamon",
    price: 22000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 32,
    name: "Blueberry Muffin",
    description: "Fluffy muffin packed with fresh blueberries",
    price: 18000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 33,
    name: "Cheese Danish",
    description: "Flaky pastry with sweet cream cheese filling",
    price: 25000,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 34,
    name: "Avocado Toast",
    description:
      "Sourdough bread topped with mashed avocado, salt, and red pepper flakes",
    price: 35000,
    image: "/placeholder.svg?height=300&width=200",
  },
];

// All Products (combined)
export const allProducts = [
  ...coffeeProducts.slice(0, 2),
  ...teaProducts.slice(0, 2),
  ...beansProducts.slice(0, 2),
  ...bundleProducts.slice(0, 2),
  ...snackProducts.slice(0, 2),
];

// Cart Items
export const cartItems = [
  {
    id: 1,
    name: "Premium Drip Coffee",
    image: "/placeholder.svg?height=60&width=60",
    price: 29750,
    quantity: 2,
  },
  {
    id: 2,
    name: "Coffee & Pastry Bundle",
    image: "/placeholder.svg?height=60&width=60",
    price: 59500,
    quantity: 1,
  },
  {
    id: 3,
    name: "Almond Croissant",
    image: "/placeholder.svg?height=60&width=60",
    price: 28000,
    quantity: 1,
  },
];
