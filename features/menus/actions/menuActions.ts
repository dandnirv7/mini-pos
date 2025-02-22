import { MenuInput } from "@/types/menuSchema";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

const BASE_URL = "/api/menus";

// interface MenuFilters {
//   page?: number | string;
//   perPage?: number | string;
//   search?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
//   categories?: string;
// }

// interface MenuItem {
//   id: string;
//   name: string;
//   status: string | null;
//   slug: string;
//   price: number;
//   description: string;
//   imageUrl?: string;
//   stock: number;
//   menuCategoryId?: string;
//   menuCategory?: {
//     id: string;
//     name: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

// interface MenuResponse {
//   status: boolean;
//   data: {
//     menu: MenuItem[];
//     limit: number;
//     total_menu: number;
//     total_pages: number;
//     current_page: number;
//     message: string;
//   };
// }

export const menuActions = {
  getMenus: async (params?: {
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

  getMenuById: async (id: string) => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createMenu: async (data: MenuInput) => {
    const response = await axiosInstance.post(BASE_URL, data);
    return response.data;
  },

  updateMenu: async (id: string, data: MenuInput) => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  patchMenu: async (id: string, data: Partial<MenuInput>) => {
    const response = await axiosInstance.patch(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  deleteMenu: async (id: string) => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export const createMenu = async (data: MenuInput) => {
  try {
    const response = await menuActions.createMenu(data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to create menu");
    }
    throw error;
  }
};

// const getMenu = async (filters: MenuFilters) => {
//   try {
//     const { page, perPage, search, sortBy, sortOrder, categories } = filters;

//     const params = new URLSearchParams({
//       page: String(page),
//       limit: String(perPage),
//       ...(search && { search }),
//       ...(sortBy && { sortBy }),
//       ...(sortOrder && { sortOrder }),
//       ...(categories && { categories }),
//     });

//     const response = await axiosInstance.get<MenuResponse>(
//       `${BASE_URL}/api/menus?${params}`
//     );
//     return response.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.message || "Failed to fetch menu items"
//       );
//     }
//     throw error;
//   }
// };

// export default getMenu;

// export const getMenuWithCategory = async (menuId: string) => {
//   try {
//     const response = await axiosInstance.get(`/api/menus/${menuId}`);

//     return response?.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.message || "Failed to fetch menu items"
//       );
//     }
//     throw error;
//   }
// };
