import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PaymentRequest, PaymentResponse } from "../types";

export function usePayment(orderNumber: string | null) {
  const router = useRouter();

  const mutation = useMutation<PaymentResponse, Error, PaymentRequest>({
    mutationFn: async (paymentData: PaymentRequest) => {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to process payment");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const token = data?.data?.token;

      if (!token) {
        toast.error("Missing Snap token from response.");
        return;
      }

      window.snap.embed(token, {
        embedId: "snap-container",
        onSuccess: () =>
          router.push(
            `/user/checkout/confirmation?order-number=${orderNumber}`
          ),
        onPending: () =>
          router.push(`/user/checkout/pending?order-number=${orderNumber}`),
        onError: () =>
          router.push(`/user/checkout/failed?order-number=${orderNumber}`),
        onClose: () =>
          alert("You closed the popup without finishing the payment"),
      });
    },
    onError: (error) => {
      toast.error("Payment failed", {
        description: error.message,
      });
    },
  });

  return mutation;
}
