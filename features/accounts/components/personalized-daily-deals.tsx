import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountdownTimer from "../components/countdown-timer";
import ProductCard from "../components/product-card";
import { useProductsStore } from "../lib/stores/productsStore";
import { Cart } from "../types";

export default function PersonalizedDailyDeals({ cart }: { cart: Cart }) {
  const { personalizedProducts } = useProductsStore();

  const cartItems = cart?.items;
  return (
    <Card className="bg-secondary">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Daily Deals Just for You</CardTitle>
          <p className="mt-1 text-sm text-gray-500">
            Personalized offers based on your preferences
          </p>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          <span className="mr-2 text-sm text-gray-700">Ends in:</span>
          <CountdownTimer />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {personalizedProducts?.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                cartItems={cartItems}
                dealBadge={
                  <div className="absolute space-y-1 top-3 left-3">
                    <Badge className="block bg-primary hover:bg-primary/90">
                      {product.discountPercentage}% OFF
                    </Badge>
                    {/* {product.isPreviouslyOrdered && (
                                  <Badge
                                    variant="secondary"
                                    className="block text-blue-800 bg-blue-100"
                                  >
                                    <RotateCcw className="w-3 h-3 mr-1" />
                                    Reorder
                                  </Badge>
                                )}
                                {product.isRecommended && (
                                  <Badge
                                    variant="secondary"
                                    className="block text-green-800 bg-green-100"
                                  >
                                    <Star className="w-3 h-3 mr-1" />
                                    For You
                                  </Badge>
                                )}
                                {product.isNew && (
                                  <Badge
                                    variant="secondary"
                                    className="block text-purple-800 bg-purple-100"
                                  >
                                    New
                                  </Badge>
                                )} */}
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
