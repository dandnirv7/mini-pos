"use client";

import Script from "next/script";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

import useOrder from "@/features/accounts/lib/queries/useOrder";
import { usePayment } from "@/features/checkout/payment/hooks/usePayment";
import PaymentSummary from "@/features/checkout/payment/components/payment-summary";
import { PaymentRequest } from "@/features/checkout/payment/types";

export default function PaymentGateway() {
  const orderNumber = useSearchParams().get("order-number");

  const { data: order } = useOrder(orderNumber || "");
  const paymentMutation = usePayment(orderNumber);

  const handlePaymentSubmit = () => {
    if (!order) return;

    const items = order.items.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: Math.round(item.price),
      quantity: item.quantity,
    }));

    const [firstName, ...lastNameParts] = order.user.fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    const paymentData: PaymentRequest = {
      order_id: order.orderNumber,
      deliveryFee: order.deliveryFee,
      discount: Math.round(order.discount),
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: order.user.email,
        phone: order.user.phoneNumber,
      },
      items,
    };

    paymentMutation.mutate(paymentData);
  };

  return (
    <>
      <Script
        id="midtrans-script"
        strategy="lazyOnload"
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

      <main>
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to checkout
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div id="snap-container" className="w-full h-[600px] sm:h-[700px]" />
          {order && (
            <div className="md:col-span-1">
              <PaymentSummary
                order={order}
                onSubmit={handlePaymentSubmit}
                isLoading={paymentMutation.isPending}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
