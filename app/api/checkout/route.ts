import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { generateOrderNumber } from "@/utils/generateOrderNumber";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await req.json();
    const { addressId } = body;

    if (!addressId) {
      return NextResponse.json(
        { message: "Shipping address is required" },
        { status: 400 }
      );
    }

    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId: userId,
      },
    });

    if (!address) {
      return NextResponse.json(
        { message: "Invalid shipping address" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                dailyDiscounts: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const today = new Date();

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const totalDiscount = cart.items.reduce((sum, item) => {
      const activeDiscount = item.product.dailyDiscounts.find(
        (d) => d.startDate <= today && d.endDate >= today
      );
      const discountRate = (activeDiscount?.discount || 0) / 100;
      return sum + item.product.price * discountRate * item.quantity;
    }, 0);

    const deliveryFee = 15000;
    const totalAmount = Math.max(0, subtotal - totalDiscount + deliveryFee);

    const orderNumber = await generateOrderNumber();

    let order;

    await prisma.$transaction(async (tx) => {
      order = await tx.order.create({
        data: {
          orderNumber: orderNumber,
          userId: userId,
          addressId: addressId,
          totalAmount: totalAmount,
          discount: totalDiscount,
          deliveryFee: deliveryFee,
          status: "PENDING",
          paymentStatus: "PENDING",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      for (const item of cart.items) {
        const activeDiscount = item.product.dailyDiscounts.find(
          (d) => d.startDate <= today && d.endDate >= today
        );
        const discountRate = (activeDiscount?.discount || 0) / 100;
        const discountNominal = Math.round(item.product.price * discountRate);

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            discount: discountNominal,
          },
        });

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
            updatedAt: new Date(),
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          orderId: order!.id,
          orderNumber: orderNumber,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "Failed to create order");
  }
}
