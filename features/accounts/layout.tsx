"use client";

import { LogOut, Settings, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { ReactNode, useState } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  const { data } = useSession();
  const [cartCount] = useState(3);

  const initials = data
    ?.user!.fullName!.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b md:px-16">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/user/" className="text-2xl font-bold text-primary">
                NOKU
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <nav className="items-center hidden gap-6 md:flex">
                <Link
                  href="/user/"
                  className="text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/user/shop"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Shop
                </Link>
                <Link
                  href="/user/orders"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  My Orders
                </Link>
                <Link
                  href="/user/reviews"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Reviews
                </Link>
              </nav>

              <Link href="/user/cart" className="relative">
                <Button variant="ghost" size="sm">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -top-1 -right-1 bg-primary">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative w-8 h-8 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={""} alt={data?.user!.fullName} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {data?.user!.fullName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {data?.user!.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user/settings">
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto">{children}</main>
    </div>
  );
}
