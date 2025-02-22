import { z } from "zod";

export const MenuSchema = z.object({
  name: z.string().min(2, "Menu must be at least 2 characters"),
  slug: z.string().min(2, "Menu must be at least 2 characters"),
  description: z.string().min(5, "Menu must be at least 5 characters"),
  price: z.number().min(10000, "Price must be equal or greater than 10000"),
  imageUrl: z.string().optional(),
  status: z.string().default("available").optional(),
  stock: z.number().min(0, "Stock must be greater than 0"),
  // menuCategoryId: z.uuid().default("1ac3fc25-1191-4510-b551-9390c42cf0c6"),
});

// model Menu {
//   id             String        @id @default(uuid()) @map("id")
//   name           String
//   slug           String        @unique
//   price          Float
//   description    String
//   imageUrl       String?       @map("image_url")
//   status         String?       @default("available") @map("status")
//   stock          Int           @default(0)
//   createdAt      DateTime      @default(now()) @map("created_at")
//   updatedAt      DateTime      @default(now()) @map("updated_at")
//   deletedAt      DateTime?     @map("deleted_at")
//   menuCategoryId String?       @map("menu_category_id")
//   menuCategory   MenuCategory? @relation(fields: [menuCategoryId], references: [id])
// }
