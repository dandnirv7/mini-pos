import { ApiResponse } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Cart } from "../../types";

const fetchCart = async (): Promise<Cart> => {
  try {
    const res = await axiosInstance.get<ApiResponse<Cart>>("/api/cart");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const useCart = () => {
  return useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
  });
};
