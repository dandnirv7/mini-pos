"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Share2,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import placeholder from "@/public/placeholder-map.svg";
import GeneralError from "@/features/errors/general-error";
import { useState } from "react";
import { FallbackTrackingItem, TrackingOrderItem } from "../types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface TrackingViewProps {
  trackingOrder: TrackingOrderItem;
  fallbackOrder: FallbackTrackingItem;
  orderId: string | string[] | undefined;
  progress: number;
  remainingHours: number;
  remainingMinutes: number;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TrackingOrderItem, Error>>;
}

export default function TrackingView({
  trackingOrder,
  fallbackOrder,
  orderId,
  progress,
  remainingHours,
  remainingMinutes,
  refetch,
}: TrackingViewProps) {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
      return <GeneralError />;
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b md:px-16">
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
              href="/orders"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              My Orders
            </Link>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto md:px-20">
        <div className="flex items-center mb-6">
          <Link
            href={`/user/orders/${orderId}`}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to order details
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between mb-6 md:flex-row">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Track Your Order
            </h1>
            <div className="flex items-center mt-1 text-gray-500">
              <Package className="w-4 h-4 mr-1" />
              Order #{trackingOrder?.orderNumber} • Tracking #
              {trackingOrder?.trackingNumber !== null
                ? trackingOrder?.trackingNumber
                : fallbackOrder.trackingNumber}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary hover:bg-gray-50"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-current rounded-full animate-spin border-t-transparent"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary hover:bg-gray-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Delivery Status */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start p-4 border border-blue-100 rounded-lg bg-blue-50">
                    <Truck className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-800">
                        Your order is on the way!
                      </h3>
                      <p className="mt-1 text-sm text-blue-700">
                        {remainingHours > 0 || remainingMinutes > 0 ? (
                          <>
                            Estimated delivery in{" "}
                            {remainingHours > 0 ? `${remainingHours}h ` : ""}
                            {remainingMinutes > 0 ? `${remainingMinutes}m` : ""}
                          </>
                        ) : (
                          "Your order should arrive any moment now!"
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Order Placed</span>
                      <span>Estimated Delivery</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`${
                          progress === 100 ? "bg-green-500" : "bg-blue-500"
                        } h-2.5 rounded-full`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>
                        {format(fallbackOrder.date, "d MMM, HH:mm", {
                          locale: id,
                        })}
                      </span>
                      <span>
                        {format(
                          fallbackOrder.shipping.estimatedDelivery,
                          "d MMM, HH:mm",
                          { locale: id }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <div className="mb-1 text-sm text-gray-500">
                        Current Location
                      </div>
                      <div className="flex items-center font-medium">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {trackingOrder?.currentLocation}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Updated{" "}
                        {format(new Date(2025, 4, 18, 11, 45), "d MMM, HH:mm", {
                          locale: id,
                        })}
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <div className="mb-1 text-sm text-gray-500">
                        Delivery By
                      </div>
                      <div className="font-medium">
                        {trackingOrder?.shipping.method}
                      </div>
                      {/* <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Phone className="w-3 h-3 mr-1" />
                      {trackingOrder?.}
                    </div> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Map */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Delivery Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 overflow-hidden bg-gray-100 rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">
                      Map view would be displayed here
                    </p>
                  </div>
                  <Image
                    src={placeholder || "/placeholder.svg"}
                    alt="Delivery Map"
                    width={800}
                    height={256}
                    className="object-cover w-full h-full"
                  />
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
                  {(
                    (trackingOrder?.timeline?.length !== 0
                      ? trackingOrder?.timeline
                      : fallbackOrder.timeline) ?? []
                  ).map((event, index) => (
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
                        {index === 3 && (
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
            {/* Delivery Information */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">
                      Delivery Address
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p>{trackingOrder?.shipping.address}</p>
                          <p>
                            {trackingOrder?.shipping.city},{" "}
                            {trackingOrder?.shipping.postalCode}
                          </p>
                          <p>{trackingOrder?.shipping.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">
                      Recipient
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <div className="text-gray-600">
                            {trackingOrder?.customer.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <div className="text-gray-600">
                            {trackingOrder?.customer.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">
                      Delivery Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping Method</span>
                        <span>{trackingOrder?.shipping.method}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tracking Number</span>
                        <span className="font-mono">
                          {trackingOrder?.orderNumber}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Estimated Delivery
                        </span>
                        <span>
                          {trackingOrder?.shipping.estimatedDelivery
                            ? format(
                                trackingOrder.shipping.estimatedDelivery,
                                "d MMM, HH:mm",
                                { locale: id }
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trackingOrder?.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>Rp {item.price.toLocaleString("id-ID")}</span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      Rp {trackingOrder?.total.toLocaleString("id-ID")}
                    </span>
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
                  Having issues with your delivery? Our customer service team is
                  ready to assist you.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Contact Delivery Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
