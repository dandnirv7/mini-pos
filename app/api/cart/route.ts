import { prisma } from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = token.sub;
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: cart }, { status: 200 });
  } catch (error) {
    return handleError(error, "failed to fetch cart");
  }
}
