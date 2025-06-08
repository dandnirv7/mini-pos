import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          {
            id,
          },
          {
            orderNumber: id,
          },
        ],
      },
      select: {
        orderNumber: true,
        userId: true,
        totalAmount: true,
        createdAt: true,
        status: true,
        paymentStatus: true,
        discount: true,
        deliveryFee: true,
        items: {
          select: {
            id: true,
            discount: true,
            price: true,
            quantity: true,
            product: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        address: {
          select: {
            street: true,
            city: true,
            state: true,
            postalCode: true,
          },
        },
        user: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Pastikan order milik user yang sedang login
    if (order.userId !== token.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return handleError(error, "Failed to fetch order details");
  }
}
