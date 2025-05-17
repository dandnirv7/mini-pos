import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "Cart is empty or not found",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: cart.items,
        message: "Cart retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}
