import { axiosInstance } from "@/utils/axiosInstance";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useCartActions = (userId: string) => {
  const queryClient = useQueryClient();

  const handleAddToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      try {
        if (!userId) throw new Error("User ID is required");
        if (!productId) throw new Error("Product ID is required");

        const response = await axiosInstance.post(`/api/users/${userId}/cart`, {
          productId,
          quantity,
        });

        queryClient.invalidateQueries({ queryKey: ["user-cart", userId] });

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        console.error("Add to cart failed:", error);
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to add to cart",
        };
      }
    },
    [userId, queryClient]
  );

  const updateCartItemQuantity = useCallback(
    async (productId: string, quantity: number) => {
      try {
        if (!userId) throw new Error("User ID is required");
        if (!productId) throw new Error("Product ID is required");
        if (quantity < 0) throw new Error("Quantity cannot be negative");

        let response;

        if (quantity === 0) {
          response = await axiosInstance.delete(`/api/users/${userId}/cart`, {
            data: { productId },
          });
        } else {
          response = await axiosInstance.patch(`/api/users/${userId}/cart`, {
            productId,
            quantity,
          });
        }

        queryClient.invalidateQueries({ queryKey: ["user-cart", userId] });

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        console.error("Update cart failed:", error);
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to update cart",
        };
      }
    },
    [userId, queryClient]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      try {
        if (!userId) throw new Error("User ID is required");
        if (!productId) throw new Error("Product ID is required");

        const response = await axiosInstance.delete(
          `/api/users/${userId}/cart`,
          {
            data: { productId },
          }
        );

        queryClient.invalidateQueries({ queryKey: ["user-cart", userId] });

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        console.error("Remove from cart failed:", error);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to remove from cart",
        };
      }
    },
    [userId, queryClient]
  );

  return {
    handleAddToCart,
    updateCartItemQuantity,
    removeFromCart,
  };
};
