import { RotateCcw } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import placeholder from "@/public/placeholder.png";
import { useUserStore } from "../lib/stores/userStore";
import Link from "next/link";

export default function FrequentlyBought() {
  const { frequentlyBought } = useUserStore();

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>Frequently Bought</CardTitle>
        <p className="text-sm text-gray-500">Items you order regularly</p>
      </CardHeader>
      <CardContent>
        {frequentlyBought.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex items-center flex-col text-center">
              <h1 className="font-semibold text-lg">Nothing here yet!</h1>
              <p>Start exploring and place your first order to see it here.</p>
            </div>
            <Link href="/user/shop">
              <Button size="default" className="bg-primary">
                Explore Best Sellers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {frequentlyBought.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 overflow-hidden rounded-lg">
                  <Image
                    src={item.image || placeholder}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-400">
                    Ordered {item.orderCount} times
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-100 bg-secondary hover:bg-gray-100"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reorder
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
