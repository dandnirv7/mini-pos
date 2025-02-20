import { prisma } from "@/lib/db";
import { MenuSchema, menuSelect } from "@/types/menuSchema";
import { handleError, handleValidationError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { getQueryParams } from "@/utils/getQueryParams";
import sanitizeData from "@/utils/sanitize";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const {
      page = 1,
      limit = 10,
      search,
      categories,
      sortBy,
      sortOrder = "asc",
    } = getQueryParams(searchParams);

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

    const offset = (page - 1) * limit;

    const whereCondition: Prisma.MenuWhereInput = {
      deletedAt: null,
      AND: [
        categories ? { menuCategory: { is: { name: categories } } } : {},
        search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
      ],
    };

    const [totalMenu, menu] = await Promise.all([
      prisma.menu.count({ where: whereCondition }),
      prisma.menu.findMany({
        where: whereCondition,
        skip: offset,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
      }),
    ]);

    const totalPages = Math.ceil(totalMenu / limit);
    const currentPage = page > totalPages ? totalPages : page;

    const response = {
      status: true,
      data: {
        menu: menu,
        limit: limit,
        total_menu: totalMenu,
        total_pages: totalPages,
        current_page: currentPage,
        message: "Menu retrivied successfully",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: "Failed to retrieve users" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sanitizedData = sanitizeData(body, MenuSchema);
    const result = MenuSchema.safeParse(sanitizedData);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validatedData = result.data;

    const existingMenu = await prisma.menu.findFirst({
      where: {
        slug: validatedData.slug,
        deletedAt: null,
      },
    });

    if (existingMenu) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MENU_EXISTS },
        { status: 409 }
      );
    }

    const newMenu = await prisma.menu.create({
      data: validatedData,
      select: menuSelect,
    });

    return NextResponse.json(
      {
        success: true,
        data: newMenu,
        message: "Menu created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}
