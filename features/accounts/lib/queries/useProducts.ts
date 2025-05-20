import { Product } from "@/features/accounts/types/product";
import { FilterParams as ProductParams } from "@/types/user";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ProductApiResponse {
  product: Product[];
  limit: number;
  total_product: number;
  total_pages: number;
  current_page: number;
  message: string;
}

type ApiResponse<T> = {
  data: T;
  status: string;
};

const fetchProducts = async (
  params?: ProductParams
): Promise<ProductApiResponse> => {
  const response = await axiosInstance.get<ApiResponse<ProductApiResponse>>(
    "/api/products",
    { params }
  );
  return response.data.data;
};

export function useProducts(params?: ProductParams) {
  const stableParams = useMemo(() => params, [params]);

  return useQuery({
    queryKey: ["products", stableParams],
    queryFn: () => fetchProducts(stableParams),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
