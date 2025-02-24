import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TableToolbarActions from "@/features/products/components/table-actions/table-toolbar-actions";
import { useTableFilters } from "@/features/products/components/use-table-filters";
import { categoriesTypes, statusTypes } from "@/features/products/data/data";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useTransition } from "react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const {
    setSearchQuery,
    searchQuery,
    statusFilter,
    setStatusFilter,
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
  } = useTableFilters();

  const [, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition });
  };

  return (
    <div className="flex flex-col justify-between gap-4 md:items-center md:flex-row">
      <div className="flex flex-col-reverse items-end justify-end flex-1 md:justify-start gap-y-2 sm:flex-row sm:space-x-2">
        <Input
          placeholder="Filter menu..."
          value={searchQuery ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-8 w-[200px] lg:w-[250px]"
        />
        <div className="flex gap-x-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              title="Status"
              options={statusTypes.map((t) => ({ ...t }))}
              setFilterValue={setStatusFilter}
              filterValue={statusFilter}
            />
          )}
          {table.getColumn("category") && (
            <DataTableFacetedFilter
              title="Categories"
              options={categoriesTypes.map((t) => ({ ...t }))}
              setFilterValue={setCategoriesFilter}
              filterValue={categoriesFilter}
            />
          )}
        </div>
        {isAnyFilterActive && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <TableToolbarActions table={table} />
    </div>
  );
}
