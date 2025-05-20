import { z } from "zod";

export const discountValidatorSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "1"))
    .refine((val) => val > 0),
  limit: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "10"))
    .refine((val) => val > 0),
  sortBy: z.enum(["date", "discount", "createdAt"]).optional().default("date"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  productId: z.string().optional(),
  today: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1"),
});
