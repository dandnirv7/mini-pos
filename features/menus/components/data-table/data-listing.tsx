import { searchParamsCache } from "@/lib/search-params";
import { DataTable } from "@/features/menus/components/data-table";
import { columns } from "./columns";
import { menuActions } from "@/features/menus/actions/menuActions";

export default async function DataListing() {
  const filters = {
    page: Number(searchParamsCache.get("page")) || 1,
    perPage: Number(searchParamsCache.get("limit")) || 10,
    search: searchParamsCache.get("q") || "",
    sortBy: searchParamsCache.get("sortBy") || "createdAt",
    sortOrder: (searchParamsCache.get("sortOrder") || "desc") as "asc" | "desc",
    categories: searchParamsCache.get("categories") || "",
    status: searchParamsCache.get("status") || "",
  };

  const { menu, total_menu } = await menuActions.getMenus(filters);

  return <DataTable columns={columns} data={menu} totalItems={total_menu} />;
}
