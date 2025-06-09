"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAvatarDropdown from "./avatar-dropdown";
import { useUserStore } from "../lib/stores/userStore";

const navLinks = [
  { href: "/user", label: "Dashboard" },
  { href: "/user/shop", label: "Shop" },
  { href: "/user/orders", label: "My Orders" },
  { href: "/user/settings", label: "Settings" },
];

export default function Header() {
  const { cart } = useUserStore();

  const cartItems = cart?.items ?? [];

  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/user") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between`}>
          <Link href="/" className="text-primary font-bold text-2xl">
            NOKU
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm ${
                  isActive(href)
                    ? "font-medium text-orange-500"
                    : "text-gray-500 hover:text-orange-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/user/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Button>
            </Link>
            <UserAvatarDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
