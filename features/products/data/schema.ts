import { z } from "zod";

export const productStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
]);

export type ProductStatus = z.infer<typeof productStatusSchema>;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string(),
  price: z.coerce
    .number()
    .min(10000, { message: "Price must be at least Rp 10.000." })
    .max(200000, { message: "Price must be less than or equal Rp 200.000." }),
  stock: z.coerce
    .number()
    .min(10, { message: "Price must be at least 10." })
    .max(1000, { message: "Price must be less than or equal 1000." }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must be less than or equal 500 characters.",
    }),
});

export type ProductData = z.infer<typeof productSchema>;
