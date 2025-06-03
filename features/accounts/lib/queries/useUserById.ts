import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/features/accounts/types";

interface Address {
  id: string;
  street: string;
  isPrimary: boolean;
}

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
  status: string;
  addresses: Address[];
}

const fetchUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<ApiResponse<User>>(
    `/api/users/${id}`
  );
  return response.data.data;
};

export function useUserById(id?: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      if (!id) throw new Error("User ID is required");
      return fetchUserById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
