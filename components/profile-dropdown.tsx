"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/utils/getInitials";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function ProfileDropdown() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image ?? "/avatars/01.png"}
              alt={user?.username ?? "User"}
            />
            <AvatarFallback>
              {getInitials(user?.username ?? user?.name ?? "U")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none capitalize">
              {user?.username ?? "Unknown User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? "-"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <span className="flex w-full items-center justify-between cursor-pointer">
                Profile{" "}
                <DropdownMenuShortcut>
                  <kbd>⇧</kbd>
                  <kbd>⌘</kbd>
                  <kbd>P</kbd>
                </DropdownMenuShortcut>
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <span className="flex w-full items-center justify-between cursor-pointer">
                Settings{" "}
                <DropdownMenuShortcut>
                  <kbd>⌘</kbd>
                  <kbd>S</kbd>
                </DropdownMenuShortcut>
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
          <span className="flex w-full items-center justify-between cursor-pointer">
            Log out{" "}
            <DropdownMenuShortcut>
              <kbd>⇧</kbd>
              <kbd>⌘</kbd>
              <kbd>Q</kbd>
            </DropdownMenuShortcut>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
