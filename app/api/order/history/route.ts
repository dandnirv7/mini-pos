import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: token?.id ?? "" },
      orderBy: { createdAt: "desc" },
      select: {
        orderNumber: true,
        status: true,
        totalAmount: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            product: {
              select: { name: true, price: true, imageUrl: true },
            },
          },
        },
      },
      take: 10,
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return handleError(error, "Failed to fetch order history");
  }
}
