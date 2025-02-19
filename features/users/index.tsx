import { searchParamsCache } from "@/lib/search-params";
import { SearchParams } from "nuqs";
import DataListing from "./components/data-table/data-listing";
import { UsersDialogs } from "./components/dialogs/users-dialog";
import { UsersPrimaryButtons } from "./components/users-primary-button";
import UsersProviders from "./context/users-context";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function UsersPage(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <UsersProviders>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 px-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User List</h2>
          <p className="text-muted-foreground">
            Manage your users and their roles here.
          </p>
        </div>
        <UsersPrimaryButtons />
      </div>
      <div className="flex-1 overflow-auto py-1 lg:flex-row lg:space-x-12 lg:space-y-0 mt-4 px-2 ">
        <DataListing />
      </div>
      <UsersDialogs />
    </UsersProviders>
  );
}
