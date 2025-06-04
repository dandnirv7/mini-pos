import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/features/accounts/types";
import { OrderHistoryItem } from "../types";

const fetchOrderHistory = async (): Promise<OrderHistoryItem[]> => {
  const res = await axiosInstance.get<ApiResponse<OrderHistoryItem[]>>(
    "/api/order/history"
  );
  return res.data.data;
};

const useOrderHistory = () => {
  return useQuery({
    queryKey: ["order", "history"],
    queryFn: fetchOrderHistory,
    refetchOnWindowFocus: false,
  });
};

export default useOrderHistory;
