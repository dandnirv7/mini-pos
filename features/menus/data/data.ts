import { IconToolsKitchen, IconBottle } from "@tabler/icons-react";
import { MenuStatus } from "./schema";

export const callTypes = new Map<MenuStatus | null | string, string>([
  [
    "available",
    "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200",
  ],
  ["out of stock", "bg-neutral-300/40 border-neutral-300"],
]);

export const statusTypes = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Out of Stock",
    value: "out of stock",
  },
];

export const categoriesTypes = [
  {
    label: "Food",
    value: "food",
    icon: IconToolsKitchen,
  },
  {
    label: "Beverages",
    value: "beverages",
    icon: IconBottle,
  },
] as const;
