import { axiosInstance } from "@/utils/axiosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ApiResponse, DiscountParams, DiscountProduct } from "../../types";

const fetchSpecialDiscountProducts = async (
  params?: DiscountParams
): Promise<DiscountProduct[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<DiscountProduct[]>>(
      "/api/daily-discount",
      { params: { ...params, today: params?.today ? "true" : undefined } }
    );
    return response.data.data;
  } catch (error) {
    console.error("[FetchDiscount] Error:", error);
    throw error;
  }
};

export function useSpecialDiscountProducts(params?: DiscountParams) {
  const stableParams = useMemo(() => params, [params]);

  return useQuery({
    queryKey: ["special-discount-products", stableParams],
    queryFn: () => fetchSpecialDiscountProducts(stableParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
}
