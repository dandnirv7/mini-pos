import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";
import { format } from "date-fns";
import { useUserStore } from "../lib/stores/userStore";
import { getStatusColor, getStatusIcon } from "../utils/statusUtils";

export default function RecentOrders() {
  const { userOrder } = useUserStore();

  return (
    <Card className={`${userOrder.length === 0} ? "hidden":"bg-secondary"`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-100 bg-secondary hover:bg-gray-100"
          asChild
        >
          <Link href="/user/orders">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {userOrder.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex items-center flex-col text-center">
              <h1 className="font-semibold text-lg">No recent orders yet!</h1>
              <p>Start exploring and place your first order to see it here.</p>
            </div>
            <Link href="/user/shop">
              <Button size="default" className="bg-primary">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrder?.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 2).map((item, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 overflow-hidden border-2 border-white rounded-full"
                      >
                        <Image
                          src={item.product.imageUrl || placeholder}
                          alt={item.product.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="flex items-center justify-center w-10 h-10 text-xs font-medium bg-gray-100 border-2 border-white rounded-full">
                        +{order.items.length - 2}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {format(order?.createdAt, "dd MMM yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">
                      {toRupiahs(
                        order?.items?.reduce(
                          (sum, item) =>
                            sum +
                            ((item.price ?? 0) +
                              (order.deliveryFee ?? 0) -
                              (order.discount ?? 0)),
                          0
                        )
                      )}
                    </p>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <Badge
                        className={`ml-2 ${getStatusColor(
                          order.status.toLowerCase()
                        )} capitalize`}
                      >
                        {order?.shipping?.status.toLowerCase() ?? "unknown"}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-100 bg-secondary hover:bg-gray-100"
                    asChild
                  >
                    <Link href={`/user/orders/${order.orderNumber}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
