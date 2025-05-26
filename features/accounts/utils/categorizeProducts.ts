import { Product } from "@/features/accounts/types/product";

export const categorizeProducts = (products: Product[]) => {
  return {
    all: products,
    coffee: products.filter((p) => p.category.name.toLowerCase() === "coffee"),
    tea: products.filter((p) => p.category.name.toLowerCase() === "tea"),
    beans: products.filter((p) => p.category.name.toLowerCase() === "beans"),
    bundles: products.filter(
      (p) => p.category.name.toLowerCase() === "bundles"
    ),
    snack: products.filter((p) => p.category.name.toLowerCase() === "snacks"),
  };
};
