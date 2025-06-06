/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[order_number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `category_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'SUPERADMIN');

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "users_phoneNumber_key";

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "payment_id" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_number" TEXT NOT NULL,
ADD COLUMN     "order_timeline_id" TEXT,
ADD COLUMN     "payment_id" TEXT,
ADD COLUMN     "shipping_id" TEXT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address_id" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "shippings" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "shipping_fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tracking_number" TEXT,
    "estimate_delivery" TIMESTAMP(3),
    "method" TEXT,
    "status" TEXT DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shippings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_timelines" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "order_timelines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shippings_order_id_key" ON "shippings"("order_id");

-- CreateIndex
CREATE INDEX "shippings_order_id_idx" ON "shippings"("order_id");

-- CreateIndex
CREATE INDEX "shippings_address_id_idx" ON "shippings"("address_id");

-- CreateIndex
CREATE INDEX "order_timelines_order_id_idx" ON "order_timelines"("order_id");

-- CreateIndex
CREATE INDEX "addresses_user_id_idx" ON "addresses"("user_id");

-- CreateIndex
CREATE INDEX "addresses_is_primary_idx" ON "addresses"("is_primary");

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "daily_discounts_product_id_idx" ON "daily_discounts"("product_id");

-- CreateIndex
CREATE INDEX "daily_discounts_start_date_idx" ON "daily_discounts"("start_date");

-- CreateIndex
CREATE INDEX "daily_discounts_end_date_idx" ON "daily_discounts"("end_date");

-- CreateIndex
CREATE INDEX "order_items_payment_id_idx" ON "order_items"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "orders_address_id_idx" ON "orders"("address_id");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_payment_status_idx" ON "orders"("payment_status");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "orders_order_number_idx" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- CreateIndex
CREATE INDEX "products_price_idx" ON "products"("price");

-- CreateIndex
CREATE INDEX "products_stock_idx" ON "products"("stock");

-- CreateIndex
CREATE INDEX "products_created_at_idx" ON "products"("created_at");

-- CreateIndex
CREATE INDEX "products_status_idx" ON "products"("status");

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_timelines" ADD CONSTRAINT "order_timelines_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
