"use client";

import { ReactNode } from "react";

export const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="container p-4 mx-auto max-w-8xl">
        <div className="p-6 bg-white shadow-sm rounded-xl dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </main>
  );
};
