"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { UserAvatarDropdown } from "./avatar-dropdown";
import { UserSearch } from "./search";

export const UserHeader = ({ cartQuantity }: { cartQuantity: number }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        <Link
          href="/user"
          className="flex items-center gap-2 focus:outline-none focus:ring-0 focus-within:ring-0"
        >
          <span className="text-3xl font-bold text-[#F26E41]">NOKU</span>
        </Link>{" "}
      </div>
      <div className="flex items-center gap-4">
        <UserSearch />
        <Button
          size="icon"
          className="relative bg-transparent rounded-none shadow-none hover:bg-transparent dark:focus-within:ring-[#F26E41] focus:outline-none"
        >
          <ShoppingCart className="text-[#F26E41] size-6" />
          <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-500 rounded-full -top-2 -right-2">
            {cartQuantity > 99 ? "99+" : cartQuantity}
          </span>
        </Button>
        <UserAvatarDropdown />
      </div>
    </div>
  );
};
