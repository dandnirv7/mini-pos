"use client";

import { ArrowLeft, Info, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import placholder from "@/public/placeholder.png";
import MidtransPopup from "./components/midtrans-popup";

export default function PaymentGateway() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("credit-card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showMidtransPopup, setShowMidtransPopup] = useState<boolean>(false);

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowMidtransPopup(true);
    }, 1500);
  };

  const handlePaymentSuccess = () => {
    router.push("/user/checkout/confirmation");
  };

  const handlePaymentPending = () => {
    router.push("/user/checkout/pending");
  };

  const handlePaymentFailed = () => {
    router.push("/user/checkout/failed");
  };

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
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to checkout
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="w-5 h-5 mr-2 text-orange-500" />
                  Select Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="grid gap-4"
                >
                  <div
                    className={`border rounded-lg p-4 ${
                      selectedPayment === "credit-card"
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <RadioGroupItem
                        value="credit-card"
                        id="credit-card"
                        className="mt-1"
                      />
                      <Label
                        htmlFor="credit-card"
                        className="flex flex-col w-full ml-3 cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="flex gap-2">
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="Visa"
                              className="object-contain"
                            />
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="Mastercard"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Pay securely with your credit or debit card
                        </div>

                        {selectedPayment === "credit-card" && (
                          <div className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <input
                                type="text"
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <input
                                  type="text"
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <input
                                  type="text"
                                  id="cvv"
                                  placeholder="123"
                                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 ${
                      selectedPayment === "bank-transfer"
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <RadioGroupItem
                        value="bank-transfer"
                        id="bank-transfer"
                        className="mt-1"
                      />
                      <Label
                        htmlFor="bank-transfer"
                        className="flex flex-col w-full ml-3 cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="font-medium">Bank Transfer</div>
                          <div className="flex gap-2">
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="BCA"
                              className="object-contain"
                            />
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="Mandiri"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Pay via bank transfer to our virtual account
                        </div>

                        {selectedPayment === "bank-transfer" && (
                          <div className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                              <Label htmlFor="bank">Select Bank</Label>
                              <select
                                id="bank"
                                className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="bca">BCA</option>
                                <option value="mandiri">Mandiri</option>
                                <option value="bni">BNI</option>
                                <option value="bri">BRI</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 ${
                      selectedPayment === "e-wallet"
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <RadioGroupItem
                        value="e-wallet"
                        id="e-wallet"
                        className="mt-1"
                      />
                      <Label
                        htmlFor="e-wallet"
                        className="flex flex-col w-full ml-3 cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="font-medium">E-Wallet</div>
                          <div className="flex gap-2">
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="GoPay"
                              className="object-contain"
                            />
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="OVO"
                              className="object-contain"
                            />
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="DANA"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Pay with your e-wallet balance
                        </div>

                        {selectedPayment === "e-wallet" && (
                          <div className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                              <Label htmlFor="wallet">Select E-Wallet</Label>
                              <select
                                id="wallet"
                                className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="gopay">GoPay</option>
                                <option value="ovo">OVO</option>
                                <option value="dana">DANA</option>
                                <option value="shopeepay">ShopeePay</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 ${
                      selectedPayment === "qris"
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <RadioGroupItem value="qris" id="qris" className="mt-1" />
                      <Label
                        htmlFor="qris"
                        className="flex flex-col w-full ml-3 cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="font-medium">QRIS</div>
                          <div className="flex gap-2">
                            <Image
                              src={placholder}
                              height={30}
                              width={40}
                              alt="QRIS"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Scan QR code to pay with any supported e-wallet
                        </div>

                        {selectedPayment === "qris" && (
                          <div className="flex flex-col items-center justify-center mt-4">
                            <div className="p-4 bg-white border rounded-lg">
                              <Image
                                src={placholder}
                                height={200}
                                width={200}
                                alt="QR Code"
                                className="object-contain"
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                              Scan this QR code with your e-wallet app
                            </p>
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
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

                <Separator />

                <div className="grid gap-2">
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

                <Separator />

                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">Rp 305.406</span>
                </div>

                <div className="flex items-start p-3 text-sm border border-orange-100 rounded-lg bg-orange-50">
                  <Info className="h-4 w-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">
                    Payment will be processed securely via Midtrans payment
                    gateway.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full text-white bg-orange-500 hover:bg-orange-600"
                  size="lg"
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                      Processing...
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {showMidtransPopup && (
        <MidtransPopup
          orderId="#NO23578"
          amount={305406}
          onClose={() => setShowMidtransPopup(false)}
          onSuccess={handlePaymentSuccess}
          onPending={handlePaymentPending}
          onFailed={handlePaymentFailed}
        />
      )}
    </div>
  );
}
