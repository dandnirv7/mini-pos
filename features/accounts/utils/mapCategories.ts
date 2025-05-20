import { Product } from "@/features/accounts/types/product";

export const mapCategories = (categoriesObj: Record<string, Product[]>) => {
  return Object.keys(categoriesObj).map((key) => ({
    id: key,
    name: capitalizeFirstLetter(key),
  }));
};

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
