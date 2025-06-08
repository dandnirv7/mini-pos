"use client";

import {
  ArrowRight,
  Clock,
  MapPin,
  MessageSquare,
  Package,
  RotateCcw,
  Settings,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CountdownTimer from "./components/countdown-timer";
import ProductCard from "./components/product-card";

import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import UserSkeleton from "./components/user-skeleton";
import UserLayout from "./layout";
import { useDetailUser } from "./lib/queries/useDetailUser";
import useOrder from "./lib/queries/useOrder";
import { useSpecialDiscountProducts } from "./lib/queries/useSpecialDiscountProducts";
import { deliveryPreferences } from "./mock/data";
import { getFrequentlyBoughtProducts } from "./utils/getFrequentlyBoughtProducts";
import { getStatusColor, getStatusIcon } from "./utils/statusUtils";

export default function UserPage() {
  const { data } = useSession();

  const { data: userDetail, isLoading: isUserLoading } = useDetailUser(
    data?.user?.id ?? ""
  );

  const { data: orders, isLoading: isOrdersLoading } = useOrder();
  const { data: dailyProducts, isLoading: isLoadingDailyProducts } =
    useSpecialDiscountProducts({ limit: 3 });

  const userOrder = useMemo(() => {
    return orders?.filter((item) => item.userId === userDetail?.id);
  }, [orders, userDetail?.id]);

  const totalSpent = useMemo(() => {
    return userOrder
      ?.reduce(
        (sum, order) =>
          sum + (order.totalAmount + order.deliveryFee - order.discount),
        0
      )
      .toFixed(0);
  }, [userOrder]);

  const frequentlyBought = useMemo(() => {
    return getFrequentlyBoughtProducts(userOrder || []);
  }, [userOrder]);

  const isLoading = isUserLoading || isOrdersLoading || isLoadingDailyProducts;

  if (isLoading) {
    return <UserSkeleton />;
  }

  return (
    <UserLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Welcome back, {userDetail?.fullName.split(" ")[0]}! ☕
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your coffee journey
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-secondary">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-primary" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userOrder?.length}
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
                    <p className="text-sm font-medium text-gray-500">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {toRupiahs(
                        isNaN(Number(totalSpent)) ? 0 : Number(totalSpent)
                      )}
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
                    <p className="text-sm font-medium text-gray-500">
                      Member Since
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(userDetail?.createdAt ?? "").getFullYear()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="bg-secondary">
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
                              order.status
                            )} capitalize`}
                          >
                            {order?.shipping?.status ?? "unknown"}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-100 bg-secondary hover:bg-gray-100"
                        asChild
                      >
                        <Link href={`/user/orders/${order.orderNumber}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personalized Daily Deals */}
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
                {dailyProducts?.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard
                      product={product}
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
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="justify-start w-full" asChild>
                <Link href="/user/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Products
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full border-gray-100 bg-secondary hover:bg-gray-100"
                asChild
              >
                <Link href="/user/orders">
                  <Package className="w-4 h-4 mr-2" />
                  Track Orders
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full border-gray-100 bg-secondary hover:bg-gray-100"
                asChild
              >
                <Link href="/user/reviews">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  My Reviews
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start w-full border-gray-100 bg-secondary hover:bg-gray-100"
                asChild
              >
                <Link href="/user/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Frequently Bought */}
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Frequently Bought</CardTitle>
              <p className="text-sm text-gray-500">Items you order regularly</p>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Recently Viewed */}
          {/* <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Recently Viewed</CardTitle>
                <p className="text-sm text-gray-500">
                  Products you&apos;ve looked at
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyViewed.map((item) => (
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
                          Viewed{" "}
                          {new Date(item.viewedAt).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-100 bg-secondary hover:bg-gray-100"
                        asChild
                      >
                        <Link href={`/product/${item.id}`}>
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

          {/* Delivery Preferences */}
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Delivery Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Default Address
                  </p>
                  <p className="text-sm text-gray-500">
                    {deliveryPreferences.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Special Instructions
                  </p>
                  <p className="text-sm text-gray-500">
                    {deliveryPreferences.instructions}
                  </p>
                </div>
              </div>
              <Separator />
              <Button
                variant="outline"
                className="w-full border-gray-100 bg-secondary hover:bg-gray-100"
                size="sm"
                asChild
              >
                <Link href="/user/settings/addresses">
                  <MapPin className="w-4 h-4 mr-2" />
                  Manage Addresses
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
}
