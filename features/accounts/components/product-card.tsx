import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string | null;
  stock?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  dealBadge?: React.ReactNode;
}

export default function ProductCard({ product, dealBadge }: ProductCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg group bg-secondary">
      {dealBadge}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.imageUrl || placeholder}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="mb-1 font-medium text-gray-900 transition-colors hover:text-primary line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mb-2 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            {product.discountedPrice ? (
              <div className="flex items-center">
                <span className="font-medium text-gray-900">
                  {toRupiahs(product.discountedPrice)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {toRupiahs(product.price)}
                </span>
              </div>
            ) : (
              <span className="font-medium text-gray-900">
                {toRupiahs(product.price)}
              </span>
            )}
          </div>
          {product.stock !== undefined && product.stock < 10 && (
            <span className="text-xs text-orange-600">
              Only {product.stock} left
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
