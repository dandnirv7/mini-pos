import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { useUserStore } from "../stores/userStore";

interface AddToCartInput {
  userId: string;
  productId: string;
  quantity: number;
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  return useMutation({
    mutationFn: async ({ userId, productId, quantity }: AddToCartInput) => {
      const res = await axiosInstance.post(`/api/users/${userId}/cart`, {
        productId,
        quantity,
      });

      return res.data.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setUserInfo({ cart: data });
    },

    onError: (error) => {
      console.error("[CART_POST_ERROR]", error);
    },
  });
};
