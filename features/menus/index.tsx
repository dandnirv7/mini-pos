import { searchParamsCache } from "@/lib/search-params";
import { SearchParams } from "nuqs";
import { MenusDialogs } from "./components/dialogs/menus-dialog";
import MenusProviders from "./context/menus-context";
import { MenusPrimaryButtons } from "./components/menus-primary-button";
import DataListing from "./components/data-table/data-listing";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function MenusPage(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <MenusProviders>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 px-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Menu List</h2>
          <p className="text-muted-foreground">
            Manage your menus and their categories here.
          </p>
        </div>
        <MenusPrimaryButtons />
      </div>
      <div className="flex-1 overflow-auto py-1 lg:flex-row lg:space-x-12 lg:space-y-0 mt-4 px-2 ">
        <DataListing />
      </div>
      <MenusDialogs />
    </MenusProviders>
  );
}
