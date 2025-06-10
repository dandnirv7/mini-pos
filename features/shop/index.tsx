"use client";

import { useEffect } from "react";
import ProductsList from "./components/product-card";
import SearchAndControls from "./components/search-controls";
import SidebarFilters from "./components/sidebar-filters";
import { useFilteredProducts } from "./hooks/useFilteredProducts";
import { useShopStore } from "./lib/store/shopStores";
import { products } from "./mock/products";

export default function ShopPage() {
  const { viewMode, setState } = useShopStore();

  useEffect(() => {
    setState({ allProducts: products });
  }, [setState]);

  const filteredProducts = useFilteredProducts();

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  // const isInCart = (productId: string) => cartItems.includes(productId);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Shop
        </h1>
        <p className="text-gray-600">Discover our premium coffee collection</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <SidebarFilters />

        <div className="flex-1">
          <SearchAndControls
            filteredCount={filteredProducts.length}
            totalCount={products.length}
          />
          <ProductsList
            products={filteredProducts}
            viewMode={viewMode}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </main>
  );
}
