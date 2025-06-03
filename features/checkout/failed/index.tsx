"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { formatToWIB } from "@/features/accounts/utils/formatTime";
import useOrder from "@/features/accounts/lib/queries/useOrder";
import toRupiahs from "@/utils/formatCurrency";
import { subtotal } from "@/utils/subtotal";

export default function PaymentFailed() {
  const orderNumber = useSearchParams().get("order-number");
  const { data: order } = useOrder(orderNumber || "");

  return (
    <main>
      <div className="max-w-2xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center rounded-t-lg bg-red-50">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-red-800">
              Payment Failed
            </CardTitle>
            <CardDescription className="text-red-700">
              We couldn&apos;t process your payment
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <h3 className="font-medium text-gray-700">Order Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Order Number</div>
                  <div className="font-medium text-right">#{orderNumber}</div>
                  <div className="text-gray-500">Date</div>
                  <div className="font-medium text-right">
                    {formatToWIB(order?.createdAt)}
                  </div>
                  <div className="text-gray-500">Payment Method</div>
                  <div className="font-medium text-right">Credit Card</div>
                  <div className="text-gray-500">Status</div>
                  <div className="font-medium text-right text-red-600">
                    Failed
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                <h3 className="font-medium text-gray-700">Error Details</h3>
                <div className="p-4 border border-red-100 rounded-lg bg-red-50">
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      Your payment was declined. This could be due to
                      insufficient funds, expired card, or incorrect card
                      details.
                    </p>
                    <p className="pl-6">
                      Please try again with a different payment method or
                      contact your bank for more information.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                {order?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>
                      {item.product.name} ({item.quantity})
                    </span>
                    <span>{toRupiahs(item.price)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{toRupiahs(subtotal(order?.items))}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Discount</span>
                  <span className="text-green-600">
                    -{toRupiahs(order?.discount)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>{toRupiahs(order?.deliveryFee)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">{toRupiahs(order?.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button className="w-full sm:w-auto" variant="outline" asChild>
              <Link href={`/user/checkout/payment?order-number=${orderNumber}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Try Again
              </Link>
            </Button>
            <Link href={`/user/checkout/payment?order-number=${orderNumber}`}>
              <Button className="w-full bg-orange-500 sm:w-auto hover:bg-orange-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Different Payment Method
              </Button>
            </Link>
            <Button className="w-full sm:w-auto" variant="ghost" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
