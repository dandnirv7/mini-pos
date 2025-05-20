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
    const query = Object.fromEntries(searchParams.entries());
    const parsed = discountValidatorSchema.parse(query);
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
  } catch (error) {
    console.error("[DAILY_DISCOUNT_GET_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch daily discounts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
