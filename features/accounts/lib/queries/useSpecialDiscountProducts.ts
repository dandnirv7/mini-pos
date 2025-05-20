import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { useMemo } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string | null;
  status: "available" | "unavailable";
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type DiscountProduct = {
  id: string;
  discount: number;
  date: string;
  createdAt: string;
  quantity: number;
  inCart: boolean;
  product: Product;
};

type ApiResponse<T> = {
  data: T;
  status: string;
};

type DiscountParams = {
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  today?: string;
};

const fetchSpecialDiscountProducts = async (
  params?: DiscountParams
): Promise<DiscountProduct[]> => {
  const response = await axiosInstance.get<ApiResponse<DiscountProduct[]>>(
    "/api/daily-discount",
    {
      params,
    }
  );
  return response.data.data;
};

export function useSpecialDiscountProducts(params?: DiscountParams) {
  const stableParams = useMemo(() => params, [params]);

  return useQuery({
    queryKey: ["special-discount-products", stableParams],
    queryFn: () => fetchSpecialDiscountProducts(stableParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: !!params?.today,
    refetchOnWindowFocus: false,
  });
}
