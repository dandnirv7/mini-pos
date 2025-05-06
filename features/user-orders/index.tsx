import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import OrderCard from "./components/order-card";
import { orders } from "./data/order";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-5xl p-4 mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link href="/user">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Orders Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-1">
                  <Link
                    href="/user/profile"
                    className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </Link>
                  <Link
                    href="/user/settings"
                    className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </Link>
                  <Link
                    href="/user/orders"
                    className="flex items-center px-3 py-2 text-white bg-black rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    My Orders
                  </Link>
                </nav>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search orders..."
                      className="pl-8"
                    />
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Filter by Status
                    </h3>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        All Orders
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        Processing
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        Shipped
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        Delivered
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        Cancelled
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Filter by Date
                    </h3>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        Last 30 days
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        Last 6 months
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        2023
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-left"
                      >
                        2022
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                {orders
                  .filter(
                    (order) =>
                      order.status === "processing" ||
                      order.status === "shipped"
                  )
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {orders
                  .filter((order) => order.status === "delivered")
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </TabsContent>

              <TabsContent value="cancelled" className="space-y-4">
                {orders
                  .filter((order) => order.status === "cancelled")
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
