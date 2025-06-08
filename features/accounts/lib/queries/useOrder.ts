import { ApiResponse } from "@/features/accounts/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type OrderItem } from "../../types";

const fetchOrder = async (): Promise<OrderItem[]> => {
  const response = await axiosInstance.get<ApiResponse<OrderItem[]>>(
    `/api/order`
  );
  return response.data.data;
};

const useOrder = () => {
  return useQuery({
    queryKey: ["order"],
    queryFn: fetchOrder,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useOrder;
