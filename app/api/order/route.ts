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
      select: {
        id: true,
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
        shipping: {
          select: {
            trackingNumber: true,
            estimateDelivery: true,
            method: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch orders");
  }
}
