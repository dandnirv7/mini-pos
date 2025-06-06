import { ApiResponse } from "@/features/accounts/types/product";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { TrackingOrderItem } from "../../types";

const fetchTracking = async (
  orderNumber: string
): Promise<TrackingOrderItem> => {
  const res = await axiosInstance.get<ApiResponse<TrackingOrderItem>>(
    `/api/tracking/${orderNumber}`
  );
  return res.data.data;
};

export const useTracking = (orderNumber: string) => {
  return useQuery({
    queryKey: ["tracking", orderNumber],
    queryFn: () => {
      if (!orderNumber) {
        throw new Error("Order number is required");
      }
      return fetchTracking(orderNumber);
    },
    enabled: !!orderNumber,
  });
};
