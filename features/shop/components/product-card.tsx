"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check, ShoppingCart, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import placeholder from "@/public/placeholder.png";

import { Product } from "../types";
import { cartItems } from "../mock/products";

interface ProductsListProps {
  products: Product[];
  viewMode: "grid" | "list";
  initialCount?: number;
  loadStep?: number;
  onAddToCart: (productId: string) => void;
}

export default function ProductsList({
  products,
  viewMode,
  initialCount,
  loadStep,
  onAddToCart,
}: ProductsListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount ?? 8);
  const step = loadStep ?? 8;

  const isInCart = (productId: string) => cartItems.includes(productId);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + step);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {visibleProducts.map((product) => (
          <Card
            key={product.id}
            className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            <div
              className={`relative ${
                viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"
              }`}
            >
              <Link href={`/user/product/${product.slug ?? product.id}`}>
                <Image
                  src={product.image || placeholder}
                  alt={product.name || "Product Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {product.discountedPrice && (
                <Badge className="absolute top-3 left-3 bg-primary">
                  {product.discountPercentage}% OFF
                </Badge>
              )}

              {product.stock && product.stock < 10 && product.inStock && (
                <Badge className="absolute top-3 right-3 bg-orange-500">
                  Only {product.stock} left
                </Badge>
              )}

              {!product.inStock && (
                <Badge className="absolute bottom-3 right-3 bg-gray-500">
                  Out of Stock
                </Badge>
              )}
            </div>

            <CardContent
              className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
            >
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">
                    {product.rating ?? "-"}
                  </span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {product.reviewCount ?? 0} reviews
                </span>
              </div>

              <Link href={`/user/product/${product.slug ?? product.id}`}>
                <h3 className="font-medium text-gray-900 mb-1 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  {product.discountedPrice ? (
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        Rp {product.discountedPrice.toLocaleString("id-ID")}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium text-gray-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              </div>

              {isInCart(product.id) ? (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/user/cart">
                    <Check className="h-4 w-4 mr-2" />
                    In Cart
                  </Link>
                </Button>
              ) : (
                <Button
                  className="w-full"
                  aria-label={`Add ${product.name} to cart`}
                  onClick={() => onAddToCart(product.id)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </>
  );
}
