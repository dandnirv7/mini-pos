import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  status: z.enum(["available", "unavailable"]).default("available").optional(),
  stock: z.number().int().min(0).optional(),
  category: z.string().optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
