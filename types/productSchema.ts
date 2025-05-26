import { ProductStatus } from "@prisma/client";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  status: z
    .enum(["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"])
    .optional()
    .default("AVAILABLE")
    .transform((val) => val as ProductStatus),
  stock: z.number().int().min(0).optional().default(10),
  categoryId: z.string().uuid("Invalid category ID"),
});

export type ProductInput = z.infer<typeof ProductSchema>;
