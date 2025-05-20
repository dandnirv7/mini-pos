import { axiosInstance } from "@/utils/axiosInstance";

const BASE_URL = "/api/daily-discount";

export const accountActions = {
  getSpecialDiscountProducts: async (params?: {
    page?: number;
    limit?: number;
    order?: "asc" | "desc";
    today?: string;
  }) => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data.data;
  },

  getUserCart: async (userId: string) => {
    const response = await axiosInstance.get(`/api/users/${userId}/cart`);
    return response.data.data;
  },
};
