import { prisma } from "@/lib/db";

export async function generateOrderNumber(
  isTracking: boolean = false
): Promise<string> {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  const datePart = `${year}${month}${day}`;

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const lastOrder = await prisma.order.findFirst({
    where: {
      orderNumber: {
        startsWith: `NOKU${datePart}`,
      },
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let sequence = 1;
  if (lastOrder && lastOrder.orderNumber) {
    const lastSequence = parseInt(lastOrder.orderNumber.slice(-4), 10);
    if (!isNaN(lastSequence)) {
      sequence = lastSequence + 1;
    }
  }

  const sequencePart = sequence.toString().padStart(4, "0");

  const prefix = isTracking ? "ORD-" : "NOKU";

  return `${prefix}${datePart}${sequencePart}`;
}
