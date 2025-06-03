import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { id } = context.params;
    if (!id) {
      return NextResponse.json(
        { message: "Order number is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber: id },
      select: {
        orderNumber: true,
        totalAmount: true,
        discount: true,
        deliveryFee: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
        updatedAt: true,
        items: {
          select: {
            id: true,
            quantity: true,
            price: true,
            discount: true,
            product: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        user: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
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
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch order details");
  }
}
