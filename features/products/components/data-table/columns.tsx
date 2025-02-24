"use client";

import LongText from "@/components/long-text";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/features/products/components/data-table/data-table-column-header";
import { callTypes } from "@/features/products/data/data";
import { cn } from "@/lib/utils";
import placeholderImage from "@/public/placeholder.png";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableRowActions } from "./data-table-row-actions";
import toRupiahs from "@/utils/formatCurrency";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square w-20 h-20">
          {row.getValue("imageUrl") !== null ? (
            <Image
              src={row.getValue("imageUrl")}
              alt={row.getValue("name")}
              fill
              className="rounded-lg"
            />
          ) : (
            <Image
              src={placeholderImage}
              alt={row.getValue("name")}
              fill
              className="bg-zinc-500"
            />
          )}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    enableHiding: false,
  },

  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="truncate w-fit capitalize">
          {row.getValue("category")}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs">
        <LongText>{row.getValue("description")}</LongText>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="truncate w-fit">{toRupiahs(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => (
      <div className="truncate  text-center">{row.getValue("stock")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2 text-center">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
