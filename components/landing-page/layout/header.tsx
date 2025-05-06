"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full p-5 bg-white border-b dark:bg-slate-950">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#F26E41]">NOKU</span>
          </Link>
        </div>

        <nav className="hidden w-full gap-6 md:flex md:items-center md:justify-center">
          <Link
            href="#about"
            className="text-sm text-muted-foreground font-semibold hover:text-[#F26E41]"
          >
            About NOKU
          </Link>
          <Link
            href="#products"
            className="text-sm text-muted-foreground font-semibold hover:text-[#F26E41]"
          >
            Products
          </Link>
          <Link
            href="#location"
            className="text-sm text-muted-foreground font-semibold hover:text-[#F26E41]"
          >
            Location
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              size="default"
              className="hidden md:flex hover:text-[#F26E41]"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="default"
              className="hidden md:flex bg-[#F26E41] hover:bg-[#E05A2E] text-white"
            >
              Sign Up
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="default"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {/* {isOpen && (
        <div className="bg-gray-100 border-t md:hidden animate-in fade-in">
          <div className="container py-4 space-y-3">
            <Link
              href="#about"
              className="block px-4 py-2 text-sm font-semibold hover:text-[#F26E41]"
              onClick={() => setIsOpen(false)}
            >
              About NOKU
            </Link>
            <Link
              href="#products"
              className="block px-4 py-2 text-sm font-semibold hover:text-[#F26E41]"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="#location"
              className="block px-4 py-2 text-sm font-semibold hover:text-[#F26E41]"
              onClick={() => setIsOpen(false)}
            >
              Location
            </Link>
            <div className="flex flex-col gap-2 p-2 border-t">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#F26E41] hover:bg-[#E05A2E] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )} */}

      <div
        className={`
        fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white border-l
        shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:hidden
      `}
      >
        <div className="p-4 space-y-4">
          <Link
            href="#about"
            className="block px-4 py-2 text-sm font-semibold hover:text-[#F26E41]"
            onClick={() => setIsOpen(false)}
          >
            About NOKU
          </Link>
          <Link
            href="#products"
            className="block px-4 py-2 text-sm font-semibold hover:text-[#F26E41]"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            href="#location"
            className="block px-4 py-2 text-sm font-semibold hover:text-[#F26E41]"
            onClick={() => setIsOpen(false)}
          >
            Location
          </Link>
          <div className="flex flex-col gap-2 p-2 border-t">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full hover:text-[#F26E41]">
                Sign In
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-[#F26E41] hover:bg-[#E05A2E] text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
