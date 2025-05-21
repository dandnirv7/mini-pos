import Link from "next/link";
import { Clock, Download, Home, RefreshCw } from "lucide-react";

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

export default function PaymentPending() {
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
            <CardHeader className="text-center rounded-t-lg bg-yellow-50">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-12 h-12 text-yellow-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-yellow-800">
                Payment Pending
              </CardTitle>
              <CardDescription className="text-yellow-700">
                We&apos;re waiting for confirmation of your payment
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
                    <div className="font-medium text-right">
                      Bank Transfer (BCA)
                    </div>
                    <div className="text-gray-500">Status</div>
                    <div className="font-medium text-right text-yellow-600">
                      Pending
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <h3 className="font-medium text-gray-700">
                    Payment Instructions
                  </h3>
                  <div className="p-4 border border-yellow-100 rounded-lg bg-yellow-50">
                    <ol className="pl-5 space-y-2 text-sm text-gray-700 list-decimal">
                      <li>
                        Transfer the exact amount of{" "}
                        <span className="font-medium">Rp 305.406</span> to the
                        virtual account number below
                      </li>
                      <li>
                        Make sure to include the order number in the payment
                        reference
                      </li>
                      <li>Payment must be completed within 24 hours</li>
                      <li>
                        After payment is confirmed, your order will be processed
                      </li>
                    </ol>
                  </div>

                  <div className="p-4 mt-4 border rounded-lg bg-gray-50">
                    <div className="mb-1 text-sm text-gray-500">
                      Virtual Account Number (BCA)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-lg font-medium">
                        8277601234567890
                      </div>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                    <div className="mt-3 mb-1 text-sm text-gray-500">
                      Total Amount
                    </div>
                    <div className="text-lg font-medium">Rp 305.406</div>
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

                <div className="p-4 text-sm border border-blue-100 rounded-lg bg-blue-50">
                  <p className="flex items-start text-gray-700">
                    <Clock className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Payment instructions have been sent to your email address.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Instructions
              </Button>
              <Button className="w-full bg-orange-500 sm:w-auto hover:bg-orange-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Payment Status
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
