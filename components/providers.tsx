"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "@/context/search-context";

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <TooltipProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </TooltipProvider>
        </SearchProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
