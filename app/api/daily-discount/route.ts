import { prisma } from "@/lib/db";
import { discountValidatorSchema } from "@/types/validators/discountValidator";
import { endOfDay, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

type WhereCondition = {
  productId?: string;
  date?: {
    gte: Date;
    lte: Date;
  };
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const queryParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    const parsed = discountValidatorSchema.parse(queryParams);
    const { page, limit, sortBy, order, productId, today } = parsed;

    const skip = (page - 1) * limit;

    const where: WhereCondition = {};
    if (productId) where.productId = productId;
    if (today) {
      where.date = {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date()),
      };
    }

    const [discounts, total] = await Promise.all([
      prisma.dailyDiscount.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
        include: {
          product: true,
        },
      }),
      prisma.dailyDiscount.count({ where }),
    ]);

    const calculateDiscountedPrice = (
      priceProduct: number,
      discountPercentage: number
    ): number => {
      if (
        priceProduct <= 0 ||
        discountPercentage < 0 ||
        discountPercentage > 100
      ) {
        throw new Error("Invalid price or discount percentage");
      }

      const discounted = priceProduct * (1 - discountPercentage / 100);
      return Math.round(discounted);
    };

    const response = discounts.map((discount) => ({
      id: discount.product.id,
      name: discount.product.name,
      slug: discount.product.slug,
      description: discount.product.description,
      price: discount.product.price,
      discountPercentage: Math.round(discount.discount),
      discountedPrice: calculateDiscountedPrice(
        discount.product.price,
        discount.discount
      ),
      imageUrl: discount.product.imageUrl,
      stock: discount.product.stock,
    }));

    return NextResponse.json({
      success: true,
      message: "Daily discounts fetched successfully",
      data: response,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error("[DAILY_DISCOUNT_GET_ERROR]", error);

    let errorMessage = "Unknown error occurred";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes("query")) {
        statusCode = 400;
        errorMessage = "Invalid query parameters";
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch daily discounts",
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}
