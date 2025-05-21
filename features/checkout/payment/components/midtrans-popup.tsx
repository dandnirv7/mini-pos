"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toRupiahs from "@/utils/formatCurrency";

interface MidtransPopupProps {
  orderId: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
  onPending: () => void;
  onFailed: () => void;
}

export default function MidtransPopup({
  orderId,
  amount,
  onClose,
  onSuccess,
  onPending,
  onFailed,
}: MidtransPopupProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "success" | "pending" | "failed"
  >("processing");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePaymentResult = (status: "success" | "pending" | "failed") => {
    setPaymentStatus(status);

    setTimeout(() => {
      if (status === "success") {
        onSuccess();
      } else if (status === "pending") {
        onPending();
      } else {
        onFailed();
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg mx-4 overflow-hidden bg-white rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-medium">Midtrans Payment Gateway</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-10 h-10 mb-4 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
              <p className="text-gray-600">Connect to payment gateway...</p>
            </div>
          ) : paymentStatus === "processing" ? (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="mb-1 text-sm text-gray-500">Order ID</div>
                <div className="font-medium">{orderId}</div>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="mb-1 text-sm text-gray-500">Total Payment</div>
                <div className="font-medium">{toRupiahs(amount)}</div>
              </div>

              <div className="grid gap-3">
                <button
                  onClick={() => handlePaymentResult("success")}
                  className="w-full py-3 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Payment Simulation Successful
                </button>
                <button
                  onClick={() => handlePaymentResult("pending")}
                  className="w-full py-3 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                >
                  Simulation Pending payment
                </button>
                <button
                  onClick={() => handlePaymentResult("failed")}
                  className="w-full py-3 font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Failed Payment Simulation
                </button>
              </div>

              <div className="text-xs text-center text-gray-500">
                This is a simulation of the Midtrans popup. In the real
                implementation, Midtrans will display their official payment
                page.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div
                className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
                  paymentStatus === "success"
                    ? "bg-green-100 text-green-600"
                    : paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {paymentStatus === "success" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : paymentStatus === "pending" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <h3
                className={`text-xl font-medium mb-2 ${
                  paymentStatus === "success"
                    ? "text-green-600"
                    : paymentStatus === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {paymentStatus === "success"
                  ? "Payment Successful"
                  : paymentStatus === "pending"
                  ? "Pending Payment"
                  : "Payment Failed"}
              </h3>
              <p className="text-center text-gray-600">
                {paymentStatus === "success"
                  ? "Your order is being processed"
                  : paymentStatus === "pending"
                  ? "Waiting for payment confirmation"
                  : "Please try other payment methods"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
