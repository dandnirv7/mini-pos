"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Product;
}

export function ProductsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/products/${currentRow.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast({
            title: "Deletion Failed",
            description: `Failed to delete product with name: ${currentRow.name}.`,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "The following product has been deleted:",
          description: `The account with product ${currentRow.name} in category (${currentRow.category}) has been successfully deleted.`,
        });

        router.refresh();
        onOpenChange(false);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Deletion Error",
            description: ERROR_MESSAGES.DELETE_FAILED,
            variant: "destructive",
          });
        }
      }
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name || isPending}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="inline-block mr-1 stroke-destructive"
            size={18}
          />{" "}
          Delete Product
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.name}</span>?
            <br />
            This action will permanently remove the product with the category of{" "}
            <span className="font-bold uppercase">
              {currentRow.category}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2 ">
            Product Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter product name to confirm deletion."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={isPending ? "Deleting product..." : "Delete"}
      destructive
      isLoading={isPending}
    />
  );
}
