import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useShopStore } from "../lib/store/shopStores";

interface Props {
  filteredCount: number;
  totalCount: number;
}

export default function SearchAndControls({
  filteredCount,
  totalCount,
}: Props) {
  const { searchQuery, sortBy, viewMode, showFilters, setState } =
    useShopStore();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setState({ searchQuery: e.target.value })}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) => setState({ sortBy: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="lg"
              onClick={() => setState({ viewMode: "grid" })}
              className="rounded-r-none px-4 py-2"
            >
              <Grid className="size-6" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="lg"
              onClick={() => setState({ viewMode: "list" })}
              className="rounded-l-none px-4 py-2"
            >
              <List className=" size-6" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCount} of {totalCount} products
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setState({ showFilters: !showFilters })}
          className="lg:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}
