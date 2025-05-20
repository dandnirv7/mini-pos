import { axiosInstance } from "@/utils/axiosInstance";
import { useCallback } from "react";

export const useCartActions = (userId: string, onCartUpdate?: () => void) => {
  const handleAddToCart = useCallback(
    async (productId: string) => {
      try {
        await axiosInstance.post(`/api/users/${userId}/cart`, {
          productId,
          quantity: 1,
        });
        onCartUpdate?.();
      } catch (error) {
        console.error("Add to cart failed", error);
      }
    },
    [userId, onCartUpdate]
  );

  const updateCartItemQuantity = useCallback(
    async (productId: string, quantity: number) => {
      try {
        if (quantity < 1) {
          await axiosInstance.delete(`/api/users/${userId}/cart`, {
            data: { productId },
          });
        } else {
          await axiosInstance.patch(`/api/users/${userId}/cart`, {
            productId,
            quantity,
          });
        }
        onCartUpdate?.();
      } catch (error) {
        console.error("Update cart failed", error);
      }
    },
    [userId, onCartUpdate]
  );

  const handleCartDelete = useCallback(
    async (productId: string) => {
      try {
        await axiosInstance.delete(`/api/users/${userId}/cart`, {
          data: { productId },
        });

        onCartUpdate?.();
      } catch (error) {
        console.error("Delete cart failed", error);
      }
    },
    [userId, onCartUpdate]
  );

  return {
    handleAddToCart,
    updateCartItemQuantity,
    handleCartDelete,
  };
};
