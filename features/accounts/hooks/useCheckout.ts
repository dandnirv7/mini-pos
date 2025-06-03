import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CheckoutData {
  addressId: string;
}

export const useCheckout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CheckoutData) => {
      const response = await axios.post("/api/checkout", data);
      return response.data;
    },
    onSuccess: (data) => {
      router.push(
        `/user/checkout/payment?orderNumber=${data.data.orderNumber}`
      );
    },
    onError: (error) => {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    },
  });
};
