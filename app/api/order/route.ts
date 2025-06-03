import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { getQueryParams } from "@/utils/getQueryParams";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const { page = 1, limit = 10, search } = getQueryParams(searchParams);

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

    const orders = await prisma.order.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { id: { contains: search, mode: "insensitive" } },
                  { orderNumber: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch orders");
  }
}
