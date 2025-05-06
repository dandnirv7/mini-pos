"use client";

import Link from "next/link";
import { UserSearch } from "./search";
import { UserAvatarDropdown } from "./avatar-dropdown";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export const UserHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        <Link href="/user" className="flex items-center gap-2">
          <span className="text-3xl font-bold text-[#F26E41]">NOKU</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <UserSearch />
        <Button variant="outline" size="icon" className="relative">
          <Coffee className="w-5 h-5" />
          <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-500 rounded-full -top-2 -right-2">
            3
          </span>
        </Button>
        <UserAvatarDropdown />
      </div>
    </div>
  );
};
