"use client";

import { searchParams } from "@/lib/search-params";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault("")
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withDefault(1)
  );

  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    searchParams.status.withOptions({ shallow: false }).withDefault("")
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    "categories",
    searchParams.categories.withOptions({ shallow: false }).withDefault("")
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setStatusFilter("");
    setCategoriesFilter("");
    setPage(1);
  }, [setSearchQuery, setStatusFilter, setCategoriesFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!statusFilter || !!categoriesFilter;
  }, [searchQuery, statusFilter, categoriesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    categoriesFilter,
    setCategoriesFilter,
    resetFilters,
    isAnyFilterActive,
  };
}
