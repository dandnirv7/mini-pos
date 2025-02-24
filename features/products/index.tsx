import { searchParamsCache } from "@/lib/search-params";
import { SearchParams } from "nuqs";
import { ProductsDialogs } from "./components/dialogs/products-dialog";
import ProductsProviders from "./context/products-context";
import { ProductPrimaryButtons } from "./components/product-primary-button";
import DataListing from "./components/data-table/data-listing";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage(props: pageProps) {
  const searchParams = await props.searchParams;

  searchParamsCache.parse(searchParams);

  return (
    <ProductsProviders>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 px-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
          <p className="text-muted-foreground">
            Manage your products and their categories here.
          </p>
        </div>
        <ProductPrimaryButtons />
      </div>
      <div className="flex-1 overflow-auto py-1 lg:flex-row lg:space-x-12 lg:space-y-0 mt-4 px-2 ">
        <DataListing />
      </div>
      <ProductsDialogs />
    </ProductsProviders>
  );
}
