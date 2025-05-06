"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartItemProps = {
  item: {
    id: string | number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  };
};

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="flex gap-3 p-3 bg-white rounded-lg">
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        width={60}
        height={60}
        className="object-cover rounded-md w-14 h-14"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium">{item.name}</h4>
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm font-medium text-green-600">
          Rp{item.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="w-6 h-6 rounded-md"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm">{item.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="w-6 h-6 text-white bg-black rounded-md hover:bg-[#F26E41]"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
