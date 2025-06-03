import { prisma } from "@/lib/db";
import { handleCustomError, handleError } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return handleCustomError("Method Not Allowed", 405);
    }

    const items = await prisma.orderItem.findMany({
      include: {
        product: {
          include: {
            dailyDiscounts: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch order items");
  }
}
