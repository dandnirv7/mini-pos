import { prisma } from "@/lib/db";
import { MenuSchema, menuSelect } from "@/types/menuSchema";
import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import sanitizeData from "@/utils/sanitize";
import { NextResponse } from "next/server";

export async function handler(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { params } = context;
    const id = params?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    switch (request.method) {
      case "GET": {
        const existingMenu = await prisma.menu.findUnique({
          where: { id },
          select: menuSelect,
        });

        if (!existingMenu) {
          return handleCustomError(ERROR_MESSAGES.MENU_NOT_FOUND, 404);
        }

        return NextResponse.json(
          {
            success: true,
            data: existingMenu,
            message: "Menu retrieved successfully",
          },
          { status: 200 }
        );
      }

      case "PUT": {
        const body = await request.json();
        const sanitizedData = sanitizeData(body, MenuSchema);
        const result = MenuSchema.safeParse(sanitizedData);

        if (!result.success) {
          return handleValidationError(result.error);
        }

        const validatedData = result.data;

        const existingMenu = await prisma.menu.findFirst({
          where: { id, deletedAt: null },
        });

        if (!existingMenu) {
          return handleCustomError(ERROR_MESSAGES.MENU_NOT_FOUND, 404);
        }

        const updatedMenu = await prisma.menu.update({
          where: { id },
          data: validatedData,
          select: menuSelect,
        });

        return NextResponse.json(
          {
            success: true,
            data: updatedMenu,
            message: "Menu updated successfully",
          },
          { status: 200 }
        );
      }

      case "PATCH": {
        const body = await request.json();
        const sanitizedData = sanitizeData(body, MenuSchema.partial());
        const result = MenuSchema.partial().safeParse(sanitizedData);

        if (!result.success) {
          return handleValidationError(result.error);
        }

        const validatedData = result.data;

        const existingMenu = await prisma.menu.findFirst({
          where: { id, deletedAt: null },
        });

        if (!existingMenu) {
          return handleCustomError(ERROR_MESSAGES.MENU_NOT_FOUND, 404);
        }

        const updatedMenu = await prisma.menu.update({
          where: { id },
          data: validatedData,
          select: menuSelect,
        });

        return NextResponse.json(
          {
            success: true,
            data: updatedMenu,
            message: "Menu updated successfully",
          },
          { status: 200 }
        );
      }

      case "DELETE": {
        const menu = await prisma.$transaction(async (prisma) => {
          const existingMenu = await prisma.menu.findFirst({
            where: { id, deletedAt: null },
          });

          if (!existingMenu) {
            return handleCustomError(ERROR_MESSAGES.MENU_NOT_FOUND, 404);
          }

          return await prisma.menu.delete({
            where: { id },
            select: menuSelect,
          });
        });

        return NextResponse.json(
          { success: true, message: "Menu deleted successfully", data: menu },
          { status: 200 }
        );
      }

      default:
        return NextResponse.json(
          { error: "Method Not Allowed" },
          { status: 405 }
        );
    }
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as PUT };
