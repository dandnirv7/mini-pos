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

    return NextResponse.json({
      success: true,
      message: "Daily discounts fetched successfully",
      data: discounts,
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
