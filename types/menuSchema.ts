import { z } from "zod";

export const MenuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  status: z.enum(["available", "unavailable"]).optional(),
  stock: z.number().int().min(0).optional(),
  menuCategoryId: z.string().optional(),
});

export type MenuInput = z.infer<typeof MenuSchema>;

export const menuSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  description: true,
  imageUrl: true,
  status: true,
  stock: true,
  menuCategoryId: true,
  menuCategory: {
    select: {
      id: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};
