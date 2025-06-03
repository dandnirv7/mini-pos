import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid identifier" },
        { status: 400 }
      );
    }

    const items = await prisma.orderItem.findMany({
      where: {
        OR: [{ orderId: id }, { order: { orderNumber: id } }],
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order items not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch order items");
  }
}
