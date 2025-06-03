import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

prisma.$use(async (params, next) => {
  const modelsWithDeletedAt = ["User", "Category", "Product"];

  if (
    params.action === "findMany" &&
    modelsWithDeletedAt.includes(params.model!)
  ) {
    if (!params.args) {
      params.args = {};
    }
    if (!params.args.where) {
      params.args.where = {};
    }
    params.args.where = {
      AND: [params.args.where, { deletedAt: null }],
    };
  }
  return next(params);
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
