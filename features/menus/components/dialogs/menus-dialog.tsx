"use client";

import { useMenus } from "@/features/menus/store/menusStore";
import { MenusDeleteDialog } from "./menus-delete-dialog";

export function MenusDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useMenus();

  return (
    <>
      {currentRow && (
        <>
          <MenusDeleteDialog
            key={`menu-delete-${currentRow.id}`}
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
