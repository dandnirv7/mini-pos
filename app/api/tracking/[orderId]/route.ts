import { prisma } from "@/lib/db";
import { handleCustomError, handleError } from "@/utils/errorHandler";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const token = await getToken({ req, secret });

  if (!token) {
    return handleCustomError("Unauthorized", 401);
  }

  try {
    const { orderId } = await params;

    if (!orderId || typeof orderId !== "string") {
      return handleCustomError("Invalid order ID", 400);
    }

    const order = await prisma.order.findFirst({
      where: { orderNumber: orderId },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        shipping: {
          select: {
            trackingNumber: true,
            estimateDelivery: true,
            method: true,
            status: true,
          },
        },
        address: {
          select: {
            street: true,
            city: true,
            postalCode: true,
            phoneNumber: true,
          },
        },
        orderTimeline: true,
      },
    });

    if (!order) {
      return handleCustomError("Order not found", 404);
    }

    const response = {
      id: order.id,
      orderNumber: order.orderNumber,
      date: order.createdAt,
      status: (order.shipping?.status ?? "delivered").toLowerCase(),
      items: order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: Math.round(order.totalAmount),
      customer: {
        name: order.user.fullName,
        phone: order.user.phoneNumber ?? "-",
      },
      shipping: {
        address: order?.address.street || "-",
        city: order?.address.city || "-",
        postalCode: order?.address.postalCode || "-",
        country: "Indonesia",
        method: order.shipping?.method || "Standard",
        estimatedDelivery: order.shipping?.estimateDelivery ?? null,
      },
      trackingNumber: order.shipping?.trackingNumber,
      currentLocation: "Jakarta Distribution Center",
      timeline: order.orderTimeline.map((t) => ({
        status: t.status,
        date: t.date,
        description: t.description,
      })),
    };

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "Failed to fetch tracking information");
  }
}
