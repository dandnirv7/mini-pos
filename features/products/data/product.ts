export type Product = {
  image: File[]; // array of files for images
  name: string; // name of the menu
  category: "food" | "beverages"; // category selection
  price: number; // price of the menu item
  stock: number; // stock of the menu item
  description: string; // description of the menu item
};
