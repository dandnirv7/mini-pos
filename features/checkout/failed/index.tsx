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

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              NOKU
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Order ID: #NO23578</div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
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
                    <div className="font-medium text-right">#NO23578</div>
                    <div className="text-gray-500">Date</div>
                    <div className="font-medium text-right">May 18, 2025</div>
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
                  <h3 className="font-medium text-gray-700">Order Summary</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Kenyan AA Beans (4)</span>
                      <span>Rp 53.000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Caramel Macchiato (1)</span>
                      <span>Rp 22.788</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Matcha Latte (1)</span>
                      <span>Rp 17.395</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Mocha Latte (1)</span>
                      <span>Rp 23.777</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Americano (1)</span>
                      <span>Rp 14.446</span>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t">
                    <div className="grid gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Subtotal</span>
                        <span>Rp 302.000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Discount</span>
                        <span className="text-green-600">-Rp 11.594</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Delivery Fee</span>
                        <span>Rp 15.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>Rp 305.406</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" variant="outline" asChild>
                <Link href="/checkout/payment">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button className="w-full bg-orange-500 sm:w-auto hover:bg-orange-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Different Payment Method
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
    </div>
  );
}
