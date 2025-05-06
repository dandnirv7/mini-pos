"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  inCart?: boolean;
  quantity?: number;
};

type MenuSectionProps = {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  defaultCategory?: string;
};

export const MenuSection = ({
  categories,
  productsByCategory,
  defaultCategory = "coffee",
}: MenuSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Explore Our Menu</h2>
        <Button variant="link" className="text-sm">
          View All
        </Button>
      </div>

      <Tabs defaultValue={defaultCategory} className="w-full">
        <CategoryTabs categories={categories} />

        {Object.entries(productsByCategory).map(([categoryId, products]) => (
          <TabsContent key={categoryId} value={categoryId} className="mt-0">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const CategoryTabs = ({ categories }: { categories: Category[] }) => {
  return (
    <TabsList className="justify-start w-full h-auto gap-2 pb-1 mb-6 bg-transparent border-b">
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="rounded-full border data-[state=active]:bg-black data-[state=active]:text-white px-4 py-1.5 h-auto"
        >
          {category.name}
        </TabsTrigger>
      ))}
      <div className="ml-auto">
        <Button variant="outline" size="sm" className="rounded-full">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
          >
            <path
              d="M4 5.5C4 5.22386 4.22386 5 4.5 5H10.5C10.7761 5 11 5.22386 11 5.5C11 5.77614 10.7761 6 10.5 6H4.5C4.22386 6 4 5.77614 4 5.5ZM5.5 8C5.22386 8 5 8.22386 5 8.5C5 8.77614 5.22386 9 5.5 9H9.5C9.77614 9 10 8.77614 10 8.5C10 8.22386 9.77614 8 9.5 8H5.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Filter
        </Button>
      </div>
    </TabsList>
  );
};
