"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchProvider } from "@/context/search-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <SearchProvider>
            <TooltipProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </TooltipProvider>
          </SearchProvider>
        </SessionProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
