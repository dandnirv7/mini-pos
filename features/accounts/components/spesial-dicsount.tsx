"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toRupiahs from "@/utils/formatCurrency";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

type DiscountItem = {
  id: number;
  name: string;
  image?: string;
  discount: number;
  originalPrice: number;
  price: number;
  inCart: boolean;
  quantity: number;
};

export const SpecialDiscountSection = ({
  items,
  title = "Special Discount Today",
}: {
  items: DiscountItem[];
  title?: string;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-sm">
          Ends in <span className="font-semibold text-red-500">12:10:09</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border dark:bg-zinc-800"
          >
            <div className="relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={200}
                height={150}
                className="object-cover w-full h-40 bg-zinc-100"
              />
              <Badge className="absolute text-black bg-white top-2 left-2 dark:hover:bg-zinc-800 dark:hover:text-white">
                {item.discount}% OFF
              </Badge>
            </div>
            <CardContent className="px-3 py-4 dark:bg-zinc-800">
              <h3 className="mb-1 text-sm font-medium">{item.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-gray-400 line-through">
                  {toRupiahs(item.originalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">
                  {toRupiahs(item.price)}
                </span>

                {item.inCart ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full h-7 w-7 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="text-white rounded-full h-7 w-7 bg-[#F26E41] hover:bg-[#E05A2E]"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="h-8 text-xs text-white bg-[#F26E41] rounded-md hover:bg-[#E05A2E]"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
