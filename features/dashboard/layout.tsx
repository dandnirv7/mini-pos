"use client";

import { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="mx-auto max-w-screen-2xl">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
