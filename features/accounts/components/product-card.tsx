import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-full h-40"
        />
      </div>
      <CardContent className="p-3">
        <h3 className="mb-1 text-sm font-medium">{product.name}</h3>
        <p className="mb-2 text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">
            Rp{product.price.toLocaleString()}
          </span>
          <Button
            size="sm"
            className="h-8 text-xs text-white bg-black rounded-md hover:bg-[#F26E41]"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
