"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const UserSearch = () => {
  return (
    <div className="relative w-72">
      <Input
        className="py-2 pl-10 pr-4 rounded-md dark:focus-within:ring-[#F26E41]"
        placeholder="Find coffee, tea, or beans"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  );
};
