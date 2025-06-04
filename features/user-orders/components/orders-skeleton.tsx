import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrdersPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b md:px-16">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <Skeleton className="w-20 h-8 bg-gray-100" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-4 bg-gray-100" />
            <Skeleton className="w-16 h-4 bg-gray-100" />
            <Skeleton className="w-6 h-6 bg-gray-100 rounded-full" />
          </div>
        </div>
      </header>

      <main className="container py-8 mx-auto md:px-20">
        <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
          <div>
            <Skeleton className="w-32 h-8 mb-2 bg-gray-100" />
            <Skeleton className="w-48 h-4 bg-gray-100" />
          </div>
          <div className="w-full mt-4 md:mt-0 md:w-auto">
            <Skeleton className="w-full h-10 bg-gray-100 md:w-64" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-20 h-10 bg-gray-100" />
            ))}
          </div>
          <Skeleton className="hidden w-16 h-8 bg-gray-100 md:block" />
        </div>

        {/* Orders List */}
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="overflow-hidden bg-secondary">
              <CardHeader className="py-4 bg-gray-50">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center">
                      <Skeleton className="w-5 h-5 mr-2 bg-gray-100 " />
                      <Skeleton className="w-24 h-5 bg-gray-100 " />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="w-4 h-4 mr-1 bg-gray-100 " />
                      <Skeleton className="w-20 h-4 bg-gray-100 " />
                    </div>
                  </div>
                  <Skeleton className="w-20 h-6 bg-gray-100 " />
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    {Array.from({ length: 3 }).map((_, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Skeleton className="w-10 h-10 mr-3 bg-gray-100 rounded-md " />
                          <div>
                            <Skeleton className="w-32 h-4 mb-1 bg-gray-100 " />
                            <Skeleton className="w-16 h-3 bg-gray-100 " />
                          </div>
                        </div>
                        <Skeleton className="w-20 h-4 bg-gray-100 " />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <Skeleton className="w-20 h-3 mb-1 bg-gray-100 " />
                        <Skeleton className="w-24 h-6 bg-gray-100 " />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="w-24 bg-gray-100 h-9" />
                        <Skeleton className="bg-gray-100 h-9 w-28" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
