import { searchParamsCache } from "@/lib/search-params";
import { DataTable } from "@/features/products/components/data-table";
import { columns } from "./columns";
import { productActions } from "@/features/products/actions/productActions";

export default async function DataListing() {
  const filters = {
    page: Number(searchParamsCache.get("page")) || 1,
    perPage: Number(searchParamsCache.get("limit")) || 10,
    q: searchParamsCache.get("q") || "",
    sortBy: searchParamsCache.get("sortBy") || "createdAt",
    sortOrder: (searchParamsCache.get("sortOrder") || "desc") as "asc" | "desc",
    categories: searchParamsCache.get("categories") || "",
    status: searchParamsCache.get("status") || "",
  };

  const { product, total_product } = await productActions.getProducts(filters);

  return (
    <DataTable columns={columns} data={product} totalItems={total_product} />
  );
}
