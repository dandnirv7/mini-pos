import { prisma } from "@/lib/db";
import { ProductSchema } from "@/types/productSchema";
import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import sanitizeData from "@/utils/sanitize";
import { NextResponse } from "next/server";

export async function handler(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { params } = context;
    const id = params?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    switch (request.method) {
      case "GET": {
        const existingProduct = await prisma.product.findFirst({
          where: {
            OR: [
              {
                id: id,
              },
              {
                slug: id,
              },
            ],
          },
        });

        if (!existingProduct) {
          return handleCustomError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404);
        }

        return NextResponse.json(
          {
            success: true,
            data: existingProduct,
            message: "Product retrieved successfully",
          },
          { status: 200 }
        );
      }

      case "PUT": {
        const body = await request.json();
        const sanitizedData = sanitizeData(body, ProductSchema);
        const result = ProductSchema.safeParse(sanitizedData);

        if (!result.success) {
          return handleValidationError(result.error);
        }

        const validatedData = result.data;

        const existingProduct = await prisma.product.findFirst({
          where: { id, deletedAt: null },
        });

        if (!existingProduct) {
          return handleCustomError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404);
        }

        const updatedProduct = await prisma.product.update({
          where: { id },
          data: validatedData,
        });

        return NextResponse.json(
          {
            success: true,
            data: updatedProduct,
            message: "Product updated successfully",
          },
          { status: 200 }
        );
      }

      case "PATCH": {
        const body = await request.json();
        const sanitizedData = sanitizeData(body, ProductSchema.partial());
        const result = ProductSchema.partial().safeParse(sanitizedData);

        if (!result.success) {
          return handleValidationError(result.error);
        }

        const validatedData = result.data;

        const existingProduct = await prisma.product.findFirst({
          where: { id, deletedAt: null },
        });

        if (!existingProduct) {
          return handleCustomError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404);
        }

        const updatedProduct = await prisma.product.update({
          where: { id },
          data: validatedData,
        });

        return NextResponse.json(
          {
            success: true,
            data: updatedProduct,
            message: "Product updated successfully",
          },
          { status: 200 }
        );
      }

      case "DELETE": {
        const product = await prisma.$transaction(async (prisma) => {
          const existingProduct = await prisma.product.findFirst({
            where: { id, deletedAt: null },
          });

          if (!existingProduct) {
            return handleCustomError(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404);
          }

          return await prisma.product.delete({
            where: { id },
          });
        });

        return NextResponse.json(
          {
            success: true,
            message: "Product deleted successfully",
            data: product,
          },
          { status: 200 }
        );
      }

      default:
        return NextResponse.json(
          { error: "Method Not Allowed" },
          { status: 405 }
        );
    }
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as PUT };
