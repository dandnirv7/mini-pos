"use client";

import { Button } from "@/components/ui/button";
import { IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function MenusPrimaryButtons() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => router.push("/dashboard/menus/new")}
      >
        <span>Add Menu</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
