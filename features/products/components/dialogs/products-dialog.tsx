"use client";

import { useProducts } from "@/features/products/store/productsStore";
import { ProductsDeleteDialog } from "./products-delete-dialog";

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts();

  return (
    <>
      {currentRow && (
        <>
          <ProductsDeleteDialog
            key={`product-delete-${currentRow.id}`}
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
