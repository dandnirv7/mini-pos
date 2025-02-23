import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "@/types/menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMenus } from "@/features/menus/store/menusStore";

interface DataTableRowActionsProps {
  row: Row<Menu>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow, currentRow } = useMenus();
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original);
            router.push(`/dashboard/menus/${currentRow!.slug}`);
          }}
        >
          Edit
          <IconEdit size={16} className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("delete");
          }}
          className="!text-red-500"
        >
          Delete
          <IconTrash size={16} className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
