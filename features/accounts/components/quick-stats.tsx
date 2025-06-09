import { Package, ShoppingBag, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import toRupiahs from "@/utils/formatCurrency";
import { useUserStore } from "../lib/stores/userStore";

export default function QuickStats() {
  const { userOrder, totalSpent, userSince } = useUserStore();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="bg-secondary">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-primary" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {userOrder?.length ?? 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary">
        <CardContent className="p-4">
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                {toRupiahs(isNaN(Number(totalSpent)) ? 0 : Number(totalSpent))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Member Since</p>
              <p className="text-2xl font-bold text-gray-900">
                {userSince ? new Date(userSince).getFullYear() : "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
