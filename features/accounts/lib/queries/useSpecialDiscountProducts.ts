import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { useMemo } from "react";
import {
  ApiResponse,
  DiscountParams,
  Product,
} from "@/features/accounts/types/product";

type DiscountProduct = {
  id: string;
  productId: string;
  discount: number;
  startDate: string | Date;
  endDate: string;
  createdAt: string;
  product: Product;
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

const fetchSpecialDiscountProducts = async (
  params?: DiscountParams
): Promise<DiscountProduct[]> => {
  try {
    console.log("[FetchDiscount] Request params:", params);
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
