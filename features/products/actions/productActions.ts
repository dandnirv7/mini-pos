import { ProductInput } from "@/types/productSchema";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

const BASE_URL = "/api/products";

export const productActions = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    categories?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: string;
  }) => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data.data;
  },

  getProductById: async (id: string) => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createProduct: async (data: ProductInput) => {
    const response = await axiosInstance.post(BASE_URL, data);
    return response.data;
  },

  updateProduct: async (id: string, data: ProductInput) => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  patchProduct: async (id: string, data: Partial<ProductInput>) => {
    const response = await axiosInstance.patch(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export const createProduct = async (data: ProductInput) => {
  try {
    const response = await productActions.createProduct(data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to create product"
      );
    }
    throw error;
  }
};
