"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const coffeeProducts = [
  {
    name: "Indonesian Beans",
    description: "Selected coffee beans with the best quality from Indonesia",
    price: 35.0,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Ethiopia Beans",
    description: "Selected coffee beans with the best quality from Ethiopia",
    price: 33.5,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Peru Beans",
    description: "Selected coffee beans with the best quality from Peru",
    price: 30.0,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Costa Rica Beans",
    description: "Selected coffee  beans with the best quality from Costa Rica",
    price: 34.0,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Guatemala Beans",
    description: "Selected coffee beans with the best quality from Guatemala",
    price: 35.0,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    name: "Colombia Beans",
    description: "Selected coffee beans with the best quality from Colombia",
    price: 33.0,
    image: "/placeholder.svg?height=300&width=200",
  },
];

export const ProductsSection = () => {
  return (
    <section id="products" className="px-12 py-16 dark:bg-slate-950">
      <div className="container">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-sm font-medium text-[#F26E41] bg-[#FDEAE3] rounded-full p-3 w-fit mb-2">
            OUR PRODUCTS
          </h2>
          <h3 className="text-3xl font-bold">The best product by Noku</h3>
        </div>
        <Tabs defaultValue="coffee" className="mb-8">
          <TabsList className="grid max-w-md grid-cols-5 mx-auto bg-[#FDEAE3] ">
            <TabsTrigger
              value="coffee"
              className="p-2 border-none shadow-none rounded-none bg-[#FDEAE3] text-gray-500 font-semibold data-[state=active]:bg-[#FDEAE3] data-[state=active]:text-[#F26E41] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:font-extrabold hover:text-[#F26E41]"
            >
              Coffee
            </TabsTrigger>
            <TabsTrigger
              value="tea"
              className="p-2 border-none shadow-none rounded-none bg-[#FDEAE3] text-gray-500 font-semibold data-[state=active]:bg-[#FDEAE3] data-[state=active]:text-[#F26E41] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:font-extrabold hover:text-[#F26E41]"
            >
              Tea
            </TabsTrigger>
            <TabsTrigger
              value="beans"
              className="p-2 border-none shadow-none rounded-none bg-[#FDEAE3] text-gray-500 font-semibold data-[state=active]:bg-[#FDEAE3] data-[state=active]:text-[#F26E41] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:font-extrabold hover:text-[#F26E41]"
            >
              Beans
            </TabsTrigger>
            <TabsTrigger
              value="snacks"
              className="p-2 border-none shadow-none rounded-none bg-[#FDEAE3] text-gray-500 font-semibold data-[state=active]:bg-[#FDEAE3] data-[state=active]:text-[#F26E41] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:font-extrabold hover:text-[#F26E41]"
            >
              Snacks
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="p-2 border-none shadow-none rounded-none bg-[#FDEAE3] text-gray-500 font-semibold data-[state=active]:bg-[#FDEAE3] data-[state=active]:text-[#F26E41] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:font-extrabold hover:text-[#F26E41]"
            >
              All
            </TabsTrigger>
          </TabsList>
          <div className="flex justify-end my-4">
            <div className="relative w-full md:w-64">
              <Input placeholder="Search product..." className="pr-8" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute w-4 h-4 -translate-y-1/2 right-2 top-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
          <TabsContent value="coffee" className="mt-6 ">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coffeeProducts.map((product, index) => (
                <Card
                  key={index}
                  className="overflow-hidden dark:border-zinc-800 dark:bg-zinc-800"
                >
                  <div className="relative flex items-center justify-center m-3 bg-gray-100 dark:bg-zinc-900 rounded-xl aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h4 className="text-xl font-bold">{product.name}</h4>
                    <p className="pr-10 mb-4 text-lg text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button className="bg-[#F26E41] hover:bg-[#e05a2e] text-white p-8 rounded-full">
                View All Product
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="tea">
            <div className="py-12 text-center text-muted-foreground">
              No tea products available at the moment.
            </div>
          </TabsContent>
          <TabsContent value="beans">
            <div className="py-12 text-center text-muted-foreground">
              Check back soon for our bean selection.
            </div>
          </TabsContent>
          <TabsContent value="snacks">
            <div className="py-12 text-center text-muted-foreground">
              Snack products coming soon!
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="py-12 text-center text-muted-foreground">
              View all our products in one place.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
