import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchUserCart = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.get(`/api/users/${userId}/cart`);
  return response.data.data;
};

export function useUserCart(userId: string) {
  return useQuery({
    queryKey: ["user-cart", userId],
    queryFn: () => fetchUserCart(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
}
