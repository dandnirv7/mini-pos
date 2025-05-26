import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: id },
      include: {
        items: {
          include: { product: true },
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

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });

      return NextResponse.json(
        { success: true, data: updatedItem },
        { status: 200 }
      );
    } else {
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });

      return NextResponse.json(
        { success: true, data: newItem },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("[CART_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { productId, quantity } = await request.json();

    if (!userId || !productId || typeof quantity !== "number") {
      return NextResponse.json(
        { error: "User ID, product ID, and quantity are required" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (!existingItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedItem,
        message: "Cart item quantity updated",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and product ID are required" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const itemToDelete = cart.items.find(
      (item) => item.productId === productId
    );

    if (!itemToDelete) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: itemToDelete.id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Cart item removed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}
