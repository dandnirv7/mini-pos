"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import toRupiahs from "@/utils/formatCurrency";

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
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={60}
          height={60}
          className="w-[60px] h-[60px] object-cover rounded bg-gray-100 dark:bg-gray-50"
        />
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-orange-500">{toRupiahs(item.price)}</p>
          <div className="flex items-center gap-2 mt-1">
            <Button
              size="icon"
              variant="outline"
              className="w-6 h-6 rounded-full dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-800"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm">{item.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="w-6 h-6 text-white  rounded-full  bg-[#F26E41] hover:bg-[#E05A2E] "
            >
              <Plus className="w-3 h-3 text-white" />
            </Button>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
