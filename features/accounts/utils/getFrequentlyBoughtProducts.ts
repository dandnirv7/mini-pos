import { OrderItem } from "../types/order";
import { formatISO } from "date-fns";

type FrequentlyBoughtItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  lastOrdered: string;
  orderCount: number;
};

export function getFrequentlyBoughtProducts(
  orders: OrderItem[] = []
): FrequentlyBoughtItem[] {
  const map = new Map<string, FrequentlyBoughtItem>();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const key = item.product.name;
      const existing = map.get(key);

      if (existing) {
        existing.orderCount += item.quantity;
        existing.lastOrdered = formatISO(new Date(order.createdAt));
      } else {
        map.set(key, {
          id: item.id,
          name: item.product.name,
          price: item.price,
          image: item.product.imageUrl || "",
          lastOrdered: formatISO(new Date(order.createdAt)),
          orderCount: item.quantity,
        });
      }
    });
  });

  return Array.from(map.values())
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 3);
}
