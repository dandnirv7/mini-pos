import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { OrderDetailResponse } from "@/features/accounts/types/order";
import { ApiResponse } from "@/features/accounts/types";

const fetchOrder = async (
  orderNumber: string
): Promise<OrderDetailResponse> => {
  const response = await axiosInstance.get<ApiResponse<OrderDetailResponse>>(
    `/api/order/${orderNumber}`
  );
  return response.data.data;
};

const useOrder = (orderNumber?: string) => {
  return useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => {
      if (!orderNumber) {
        throw new Error("Order number is required");
      }
      return fetchOrder(orderNumber);
    },
    enabled: !!orderNumber,
    refetchOnWindowFocus: false,
  });
};

export default useOrder;
