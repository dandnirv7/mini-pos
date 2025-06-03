import { useMutation } from "@tanstack/react-query";

interface PaymentParams {
  order_id: string;
  amount: number;
  items: Array<{
    id?: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  customer: {
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
  };
}

const createPaymentRequest = async (params: PaymentParams) => {
  const response = await fetch("/api/payment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Payment failed");
  }

  return response.json();
};

export const useMidtransPayment = () => {
  const mutation = useMutation({
    mutationFn: createPaymentRequest,
    onSuccess: (data) => {
      window.location.href = data.redirect_url;
    },
  });

  return {
    createPayment: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message,
  };
};
