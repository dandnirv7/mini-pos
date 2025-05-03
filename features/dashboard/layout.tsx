"use client";

import { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UsersProviders from "@/features/users/context/users-context";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="mx-auto max-w-screen-2xl">
          {pathname === "/dashboard" ? (
            <Header>
              <TopNav links={topNav} />
              <div className="ml-auto flex items-center space-x-4">
                <Search />
                <ModeToggle />
                <ProfileDropdown />
              </div>
            </Header>
          ) : (
            <Header>
              <Search />
              <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <ProfileDropdown />
              </div>
            </Header>
          )}
          <UsersProviders>
            <Main>{children}</Main>
            <Toaster />
          </UsersProviders>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Product",
    href: "dashboard/product",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
