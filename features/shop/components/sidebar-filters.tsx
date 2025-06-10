import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useShopStore } from "../lib/store/shopStores";
import { categories, origins, roastLevels } from "../mock/products";

export default function SidebarFilters() {
  const {
    selectedCategory,
    selectedOrigins,
    selectedRoastLevels,
    priceRange,
    setState,
  } = useShopStore();

  const setSelectedCategory = (value: string) =>
    setState({ selectedCategory: value });

  const setPriceRange = (value: [number, number]) =>
    setState({ priceRange: value });

  const setSelectedOrigins = (value: string[]) =>
    setState({ selectedOrigins: value });

  const setSelectedRoastLevels = (value: string[]) =>
    setState({ selectedRoastLevels: value });

  return (
    <div className="lg:w-64 space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1500000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
            <span>Rp {priceRange[1].toLocaleString("id-ID")}</span>
          </div>
        </div>
      </Card>

      {selectedCategory === "beans" && (
        <>
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Origin</h3>
            <div className="space-y-2">
              {origins.map((origin) => (
                <div key={origin} className="flex items-center space-x-2">
                  <Checkbox
                    id={origin}
                    checked={selectedOrigins.includes(origin)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedOrigins([...selectedOrigins, origin]);
                      } else {
                        setSelectedOrigins(
                          selectedOrigins.filter((o) => o !== origin)
                        );
                      }
                    }}
                  />
                  <label htmlFor={origin} className="text-sm">
                    {origin}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Roast Level</h3>
            <div className="space-y-2">
              {roastLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={selectedRoastLevels.includes(level)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRoastLevels([...selectedRoastLevels, level]);
                      } else {
                        setSelectedRoastLevels(
                          selectedRoastLevels.filter((l) => l !== level)
                        );
                      }
                    }}
                  />
                  <label htmlFor={level} className="text-sm">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
