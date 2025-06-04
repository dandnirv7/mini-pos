"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Search,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CancelOrderModal from "./components/order-cancel-modal";
import OrdersPageSkeleton from "./components/orders-skeleton";
import useOrderHistory from "./hooks/useOrderHistory";
import { OrderHistoryItem } from "./types";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return <Badge className="bg-green-500 rounded-full">Completed</Badge>;
    case "SHIPPED":
      return <Badge className="bg-blue-500 rounded-full">Shipped</Badge>;
    case "PROCESSING":
      return <Badge className="bg-yellow-500 rounded-full">Processing</Badge>;
    case "PENDING":
      return (
        <Badge className="bg-orange-500 rounded-full">Pending Payment</Badge>
      );
    case "CANCELLED":
      return <Badge className="bg-red-500 rounded-full">Cancelled</Badge>;
    default:
      return <Badge className="bg-gray-500 rounded-full">Unknown</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "SHIPPED":
      return <Truck className="w-5 h-5 text-blue-500" />;
    case "PROCESSING":
      return <Package className="w-5 h-5 text-yellow-500" />;
    case "PENDING":
      return <Clock className="w-5 h-5 text-orange-500" />;
    case "CANCELLED":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <ShoppingBag className="w-5 h-5 text-gray-500" />;
  }
};

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSearch = searchParams.get("search") || "";
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "all");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryItem | null>(
    null
  );

  const { data: orders = [], isLoading, isError } = useOrderHistory();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    if (activeTab !== "all") {
      params.set("tab", activeTab);
    } else {
      params.delete("tab");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchQuery, activeTab, pathname, router, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const filteredOrders: OrderHistoryItem[] = orders.filter(
    (order: OrderHistoryItem) => {
      const matchesTab = activeTab === "all" || order.status === activeTab;
      const matchesSearch =
        order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items?.some((item) =>
          item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesTab && matchesSearch;
    }
  );

  const handleCancelOrder = (order: OrderHistoryItem) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  if (isLoading) {
    return <OrdersPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-500">Failed to load order details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b md:px-16">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            NOKU
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Home
            </Link>
            <Link
              href="/checkout"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cart
            </Link>
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      </header>

      <main className="container py-8 mx-auto md:px-20">
        <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500">View and manage your order history</p>
          </div>
          <div className="w-full mt-4 md:mt-0 md:w-auto">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                placeholder="Search orders..."
                className="w-full pl-10 md:w-64"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex md:bg-secondary md:hover:bg-gray-100"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <TabsContent value={activeTab}>
            {filteredOrders.length === 0 ? (
              <Card className="bg-secondary">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="p-3 mb-4 bg-gray-100 rounded-full">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-gray-900">
                    No orders found
                  </h3>
                  <p className="max-w-md mb-6 text-center text-gray-500">
                    {searchQuery
                      ? `No orders matching "${searchQuery}"`
                      : `You don't have any ${activeTab} orders`}
                  </p>
                  <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredOrders.map((order) => (
                  <Card
                    key={order.orderNumber}
                    className="overflow-hidden bg-secondary"
                  >
                    <CardHeader className="py-4 bg-gray-50">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <span className="ml-2 font-medium">
                              Order #{order.orderNumber}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(order.createdAt), "d MMMM yyyy", {
                              locale: id,
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-100 rounded-md">
                                  <Image
                                    src={item.product.imageUrl || placeholder}
                                    alt={item.product.name}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {item.product.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </div>
                                </div>
                              </div>
                              <div className="font-medium">
                                {toRupiahs(item.product.price)}
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div>
                            <div className="text-sm text-gray-500">
                              Total Amount
                            </div>
                            <div className="text-lg font-medium">
                              Rp {order.totalAmount.toLocaleString("id-ID")}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {order.status === "pending" && (
                              <Button
                                variant="outline"
                                className="text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => handleCancelOrder(order)}
                              >
                                Cancel Order
                              </Button>
                            )}
                            <Button
                              asChild
                              className="bg-black hover:bg-black/80"
                            >
                              <Link href={`/user/orders/${order.orderNumber}`}>
                                View Details
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {showCancelModal && selectedOrder && (
        <CancelOrderModal
          order={selectedOrder}
          onClose={() => setShowCancelModal(false)}
          onConfirm={() => {
            setShowCancelModal(false);
          }}
        />
      )}
    </div>
  );
}
