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
    const { id } = params;

    if (!id) {
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

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: updatedItem,
          message: "Cart item updated successfully",
        },
        { status: 200 }
      );
    }

    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newItem,
        message: "Cart item added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
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
