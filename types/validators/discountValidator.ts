import { z } from "zod";

export const discountValidatorSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(["createdAt", "discount", "startDate"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  productId: z.string().uuid().optional(),
  today: z.coerce.boolean().optional(),
});

export type DiscountValidatorSchema = z.infer<typeof discountValidatorSchema>;
