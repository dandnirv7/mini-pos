import { prisma } from "@/lib/db";
import { ProductSchema } from "@/types/productSchema";
import { handleError, handleValidationError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { getQueryParams } from "@/utils/getQueryParams";
import sanitizeData from "@/utils/sanitize";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const {
      page = 1,
      limit = 10,
      search,
      categories,
      sortBy,
      sortOrder = "asc",
      status,
    } = getQueryParams(searchParams);

    if (
      isNaN(page as number) ||
      page < 1 ||
      isNaN(limit as number) ||
      limit < 1
    ) {
      return NextResponse.json(
        { success: true, message: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const whereCondition: Prisma.ProductWhereInput = {
      deletedAt: null,
      AND: [
        categories ? { category: categories } : {},
        status ? { status: status } : {},
        search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
      ],
    };

    const [totalProduct, product] = await Promise.all([
      prisma.product.count({ where: whereCondition }),
      prisma.product.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
      }),
    ]);

    const totalPages = Math.ceil(totalProduct / limit);
    const currentPage = page > totalPages ? totalPages : page;

    const response = {
      status: true,
      data: {
        product: product,
        limit: limit,
        total_product: totalProduct,
        total_pages: totalPages,
        current_page: currentPage,
        message: "Product retrivied successfully",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: "Failed to retrieve users" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sanitizedData = sanitizeData(body, ProductSchema);
    const result = ProductSchema.safeParse(sanitizedData);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validatedData = result.data;

    const existingProduct = await prisma.product.findFirst({
      where: {
        slug: validatedData.slug,
        deletedAt: null,
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.PRODUCT_EXISTS },
        { status: 409 }
      );
    }

    const newProduct = await prisma.product.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}
