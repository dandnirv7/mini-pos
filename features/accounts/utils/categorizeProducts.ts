import { Product } from "@/features/accounts/types/product";

export const categorizeProducts = (products: Product[]) => {
  return {
    all: products,
    coffee: products.filter((p) => p.category === "coffee"),
    tea: products.filter((p) => p.category === "tea"),
    beans: products.filter((p) => p.category === "beans"),
    bundles: products.filter((p) => p.category === "bundles"),
    snack: products.filter((p) => p.category === "snack"),
  };
};
