import { ApiResponse } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { CartType } from "../../types";

const fetchCart = async (): Promise<CartType> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CartType>>("/api/cart");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const useCart = () => {
  return useQuery<CartType>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
