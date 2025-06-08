import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, User } from "../../types";

const fetchDetailUser = async (userId: string): Promise<User> => {
  try {
    const res = await axiosInstance.get<ApiResponse<User>>(
      `/api/users/${userId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const useDetailUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchDetailUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
