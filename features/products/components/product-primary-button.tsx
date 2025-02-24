"use client";

import { Button } from "@/components/ui/button";
import { IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function ProductPrimaryButtons() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => router.push("/dashboard/product/new")}
      >
        <span>Add Product</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
