"use client";

import Link from "next/link";
import { CheckCircle, Clock, Download, Home, ShoppingBag } from "lucide-react";

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
import useOrder from "@/features/accounts/lib/queries/useOrder";
import { useSearchParams } from "next/navigation";
import toRupiahs from "@/utils/formatCurrency";
import { formatToWIB } from "@/features/accounts/utils/formatTime";
import { subtotal } from "@/utils/subtotal";

export default function PaymentConfirmation() {
  const orderNumber = useSearchParams().get("order-number");

  const { data: orderData } = useOrder(orderNumber || "");

  return (
    <main>
      <div className="max-w-2xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center rounded-t-lg bg-green-50">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-800">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-green-700">
              Your order has been confirmed and is being processed
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
                    {orderData?.createdAt
                      ? formatToWIB(orderData?.createdAt)
                      : "-"}
                  </div>
                  <div className="text-gray-500">Payment Method</div>
                  <div className="font-medium text-right">
                    Credit Card (•••• 3456)
                  </div>
                  <div className="text-gray-500">Status</div>
                  <div className="font-medium text-right text-green-600">
                    Paid
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                <h3 className="font-medium text-gray-700">Order Summary</h3>
                <div className="grid gap-2">
                  {orderData?.items.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>
                          {item.product.name} ({item.quantity})
                        </span>
                        <span>{toRupiahs(item.price)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 mt-2 border-t">
                  <div className="grid gap-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{toRupiahs(subtotal(orderData?.items))}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Discount</span>
                      <span className="text-green-600">
                        -{toRupiahs(orderData?.discount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{toRupiahs(orderData?.deliveryFee)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t">
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>{toRupiahs(orderData?.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-2">
                <h3 className="font-medium text-gray-700">
                  Delivery Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Name</div>
                  <div className="font-medium text-right">
                    {orderData?.user.fullName}
                  </div>
                  <div className="text-gray-500">Address</div>
                  <div className="font-medium text-right">
                    {orderData?.address.street}, {orderData?.address.state}
                  </div>
                  <div className="text-gray-500">Estimated Delivery</div>
                  <div className="flex items-center justify-end font-medium text-right">
                    <Clock className="w-3 h-3 mr-1" />
                    30-45 minutes
                  </div>
                </div>
              </div>

              <div className="p-4 text-sm border border-orange-100 rounded-lg bg-orange-50">
                <p className="flex items-start text-gray-700">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  A receipt has been sent to your email address.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button className="w-full sm:w-auto" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button className="w-full bg-orange-500 sm:w-auto hover:bg-orange-600">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Track Order
            </Button>
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
