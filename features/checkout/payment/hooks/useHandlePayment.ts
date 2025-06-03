import { PaymentRequest } from "@/features/checkout/payment/types";
import { UseMutationResult } from "@tanstack/react-query";
import { Order } from "@/features/checkout/payment/types";

export function useHandlePayment(
  order: Order | undefined,
  paymentMutation: UseMutationResult<PaymentResponse, Error, PaymentRequest>
) {
  const handlePaymentSubmit = () => {
    if (!order) return;

    const items = order.items.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: Math.round(item.price),
      quantity: item.quantity,
    }));

    const paymentData: PaymentRequest = {
      order_id: order.orderNumber,
      deliveryFee: order.deliveryFee,
      discount: Math.round(order.discount),
      customer: {
        fullName: order.user.fullName,
        email: order.user.email,
        phone: order.user.phoneNumber,
      },
      items,
    };

    paymentMutation.mutate(paymentData);
  };

  return { handlePaymentSubmit };
}
