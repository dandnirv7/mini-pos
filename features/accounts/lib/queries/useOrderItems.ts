import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { OrderItemListResponse } from "@/features/accounts/types/orderItems";
import { ApiResponse } from "@/features/accounts/types";

const fetchOrderItems = async (id: string): Promise<OrderItemListResponse> => {
  const response = await axiosInstance.get<ApiResponse<OrderItemListResponse>>(
    `/api/order-items/${id}`
  );
  return response.data.data;
};

export function useOrderItems(id?: string) {
  return useQuery({
    queryKey: ["order-items", id],
    queryFn: () => {
      if (!id) throw new Error("Order ID is required");
      return fetchOrderItems(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
