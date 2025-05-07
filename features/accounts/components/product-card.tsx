import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "../types/product";
import toRupiahs from "@/utils/formatCurrency";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden border dark:bg-zinc-800">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-full h-40 bg-zinc-100"
        />
      </div>
      <CardContent className="px-3 py-4 dark:bg-zinc-800">
        <h3 className="mb-1 font-medium">{product.name}</h3>
        <p className="mb-2 text-sm text-gray-500 line-clamp-2 dark:text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold ">{toRupiahs(product.price)}</span>
          <Button
            size="sm"
            className="h-8 text-sm text-white  rounded-md bg-[#F26E41] hover:bg-[#E05A2E]"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
