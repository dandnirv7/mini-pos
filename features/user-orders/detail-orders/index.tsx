"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Phone,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useOrder from "@/features/accounts/lib/queries/useOrder";
import { formatToWIB } from "@/features/accounts/utils/formatTime";
import placeholder from "@/public/placeholder.png";
import toRupiahs from "@/utils/formatCurrency";
import { subtotal } from "@/utils/subtotal";
import { useParams } from "next/navigation";
import { timeline } from "../data/timeline";
import OrderDetailsPageSkeleton from "./components/order-detail-skeleton";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return <Badge className="bg-green-500 rounded-full ">Completed</Badge>;
    case "SHIPPED":
      return <Badge className="bg-blue-500 rounded-full ">Shipped</Badge>;
    case "PROCESSING":
      return <Badge className="bg-yellow-500 rounded-full ">Processing</Badge>;
    case "PENDING":
      return (
        <Badge className="bg-orange-500 rounded-full ">Pending Payment</Badge>
      );
    case "CANCELLED":
      return <Badge className="bg-red-500 rounded-full ">Cancelled</Badge>;
    default:
      return <Badge className="bg-gray-500 rounded-full ">Unknown</Badge>;
  }
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const { data: order, isLoading, isError } = useOrder(orderId);

  if (isLoading) {
    return <OrderDetailsPageSkeleton />;
  }

  if (isError || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-500">Failed to load order details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 px-16 bg-white border-b">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              NOKU
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Home
            </Link>
            <Link
              href="/user/orders"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              My Orders
            </Link>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="container px-20 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Link
            href="/user/orders"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to orders
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between mb-6 md:flex-row">
          <div>
            <h1 className="flex items-center text-2xl font-bold text-gray-900">
              Order #{order?.orderNumber}
              {getStatusBadge(order?.status || "unknown")}
            </h1>
            <div className="flex items-center mt-1 text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formatToWIB(order?.createdAt)}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary hover:bg-gray-50"
              asChild
            >
              <Link href={`/user/orders/tracking/${order?.orderNumber}`}>
                Track Order
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary hover:bg-gray-50"
            >
              Contact Support
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Order Items */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order?.items.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 mr-4 bg-gray-100 rounded-md">
                        <Image
                          src={item.product.imageUrl || placeholder}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium text-right">
                        {toRupiahs(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">
                      Delivery Address
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p>{order?.address?.street}</p>
                          <p>
                            {order?.address?.city}, {order?.address?.postalCode}
                          </p>
                          <p>{order?.address?.state}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">
                      Shipping Method
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Same Day Delivery</p>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        Estimated delivery: 18 Mei, 17:30
                        {/* {format(
                          order.shipping.estimatedDelivery,
                          "d MMMM, HH:mm",
                          { locale: id }
                        )} */}
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <Truck className="w-4 h-4 mr-1 text-gray-400" />
                        Tracking number: {order?.orderNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative ml-3 border-l border-gray-200">
                  {timeline.map((event, index) => (
                    <li key={index} className="mb-6 ml-6">
                      <span
                        className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                          event.date
                            ? "bg-green-100 ring-8 ring-white"
                            : "bg-gray-100 ring-8 ring-white"
                        }`}
                      >
                        {event.date ? (
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        ) : (
                          <Clock className="w-3 h-3 text-gray-400" />
                        )}
                      </span>
                      <h3
                        className={`flex items-center mb-1 text-base font-medium ${
                          event.date ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {event.status}
                        {index === 0 && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                            Latest
                          </span>
                        )}
                      </h3>
                      <time
                        className={`block mb-1 text-sm font-normal leading-none ${
                          event.date ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {event.date
                          ? format(event.date, "d MMMM, HH:mm", {
                              locale: id,
                            })
                          : "Pending"}
                      </time>
                      <p
                        className={`text-sm ${
                          event.date ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {event.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>{toRupiahs(subtotal(order?.items))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span
                        className={
                          order?.discount ? "text-green-600" : "text-foreground"
                        }
                      >
                        -{toRupiahs(order?.discount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery Fee</span>
                      <span>{toRupiahs(order?.deliveryFee)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{toRupiahs(order?.totalAmount)}</span>
                  </div>

                  <div className="pt-2">
                    <div className="mb-1 text-sm text-gray-500">
                      Payment Method
                    </div>
                    {/* <div className="font-medium">{order.paymentMethod}</div>
                    <div className="mt-1 text-sm text-green-600">
                      {order.paymentStatus}
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{order?.user.fullName}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">
                        {order?.user.phoneNumber}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 mt-0.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{order?.user.email}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-orange-100 bg-orange-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  If you have any questions or concerns about your order, our
                  customer service team is here to help.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Contact Customer Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
