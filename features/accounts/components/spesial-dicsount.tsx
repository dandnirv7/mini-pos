"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
          <Card key={item.id} className="overflow-hidden border">
            <div className="relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={200}
                height={150}
                className="object-cover w-full h-32"
              />
              <Badge className="absolute text-black bg-white top-2 left-2">
                {item.discount}% OFF
              </Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="mb-1 text-sm font-medium">{item.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-gray-400 line-through">
                  Rp{item.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">
                  Rp{item.price.toLocaleString()}
                </span>

                {item.inCart ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-md h-7 w-7"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="text-white bg-black rounded-md h-7 w-7 hover:bg-[#F26E41]"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="h-8 text-xs text-white bg-black rounded-md hover:bg-[#F26E41]"
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
