import { prisma } from "@/lib/db";
import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { hashPassword } from "@/utils/hashPassword";
import sanitizeData from "@/utils/sanitize";
import { userSelect } from "@/utils/selectOptions";
import { NextResponse } from "next/server";
import { UserSchema } from "@/types/schema";

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
        const existingUser = await prisma.user.findUnique({
          where: { id },
          select: userSelect,
        });

        if (!existingUser) {
          return handleCustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
        }

        return NextResponse.json(
          {
            success: true,
            data: existingUser,
            message: "User retrieved successfully",
          },
          { status: 200 }
        );
      }

      case "PUT": {
        const body = await request.json();
        const sanitizedData = sanitizeData(body, UserSchema);
        const result = UserSchema.safeParse(sanitizedData);

        if (!result.success) {
          return handleValidationError(result.error);
        }

        const validatedData = result.data;

        const existingUser = await prisma.user.findFirst({
          where: { id, deletedAt: null },
        });

        if (!existingUser) {
          return NextResponse.json(
            { error: ERROR_MESSAGES.USER_NOT_FOUND },
            { status: 404 }
          );
        }

        if (validatedData.email || validatedData.username) {
          const checkDuplicate = await prisma.user.findFirst({
            where: {
              OR: [
                validatedData.email ? { email: validatedData.email } : {},
                validatedData.username
                  ? { username: validatedData.username }
                  : {},
              ],
              NOT: { id },
              deletedAt: null,
            },
          });

          if (checkDuplicate) {
            return NextResponse.json(
              { error: ERROR_MESSAGES.USERNAME_EMAIL_EXISTS },
              { status: 409 }
            );
          }
        }

        if (validatedData.password) {
          validatedData.password = await hashPassword(validatedData.password);
        }

        const updatedUser = await prisma.user.update({
          where: { id },
          data: validatedData,
          select: userSelect,
        });

        return NextResponse.json(
          {
            success: true,
            data: updatedUser,
            message: "User updated successfully",
          },
          { status: 200 }
        );
      }

      case "PATCH": {
        const body = await request.json();
        const sanitizedData = sanitizeData(body, UserSchema.partial());
        const result = UserSchema.partial().safeParse(sanitizedData);

        if (!result.success) {
          return handleValidationError(result.error);
        }

        const validatedData = result.data;

        const existingUser = await prisma.user.findFirst({
          where: { id, deletedAt: null },
        });

        if (!existingUser) {
          return NextResponse.json(
            { error: ERROR_MESSAGES.USER_NOT_FOUND },
            { status: 404 }
          );
        }

        if (validatedData.email || validatedData.username) {
          const checkDuplicate = await prisma.user.findFirst({
            where: {
              OR: [
                validatedData.email ? { email: validatedData.email } : {},
                validatedData.username
                  ? { username: validatedData.username }
                  : {},
              ],
              NOT: { id },
              deletedAt: null,
            },
          });

          if (checkDuplicate) {
            return NextResponse.json(
              { error: ERROR_MESSAGES.USERNAME_EMAIL_EXISTS },
              { status: 409 }
            );
          }
        }

        if (validatedData.password) {
          validatedData.password = await hashPassword(validatedData.password);
        }

        const updatedUser = await prisma.user.update({
          where: { id },
          data: validatedData,
          select: userSelect,
        });

        return NextResponse.json(
          {
            success: true,
            data: updatedUser,
            message: "User updated successfully",
          },
          { status: 200 }
        );
      }

      case "DELETE": {
        const user = await prisma.$transaction(async (prisma) => {
          const existingUser = await prisma.user.findFirst({
            where: { id, deletedAt: null },
          });

          if (!existingUser) {
            return handleCustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
          }

          return await prisma.user.delete({
            where: { id },
            select: { email: true, username: true },
          });
        });

        return NextResponse.json(
          { success: true, message: "User deleted successfully", data: user },
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

export { handler as GET, handler as PUT, handler as PATCH, handler as DELETE };
