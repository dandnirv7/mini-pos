import { useMemo } from "react";
import { useShopStore } from "../lib/store/shopStores";
import { Product } from "../types";

export function useFilteredProducts(): Product[] {
  const {
    allProducts,
    searchQuery,
    selectedCategory,
    selectedOrigins,
    selectedRoastLevels,
    priceRange,
    sortBy,
  } = useShopStore();

  return useMemo(() => {
    const filtered = allProducts.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory)
        return false;
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;
      if (
        selectedOrigins.length > 0 &&
        product.origin &&
        !selectedOrigins.includes(product.origin)
      )
        return false;
      if (
        selectedRoastLevels.length > 0 &&
        product.roastLevel &&
        !selectedRoastLevels.includes(product.roastLevel)
      )
        return false;

      return true;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? "").getTime();
          const dateB = new Date(b.createdAt ?? "").getTime();
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [
    allProducts,
    searchQuery,
    selectedCategory,
    selectedOrigins,
    selectedRoastLevels,
    priceRange,
    sortBy,
  ]);
}
