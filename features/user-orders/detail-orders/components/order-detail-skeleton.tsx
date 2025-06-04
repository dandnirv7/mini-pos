import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrderDetailsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="flex items-center mb-6">
          <Skeleton className="w-32 h-4 bg-gray-100" />
        </div>

        <div className="flex flex-col items-start justify-between mb-6 md:flex-row ">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="w-32 h-8 bg-gray-100" />
              <Skeleton className="w-20 h-6 bg-gray-100" />
            </div>
            <div className="flex items-center">
              <Skeleton className="w-4 h-4 mr-1 bg-gray-100" />
              <Skeleton className="w-40 h-4 bg-gray-100" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Skeleton className="w-24 h-8 bg-gray-100" />
            <Skeleton className="w-32 h-8 bg-gray-100" />
            <Skeleton className="h-8 bg-gray-100 w-28" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Order Items */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <Skeleton className="w-24 h-6 bg-gray-100" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start pb-4 border-b last:border-b-0 last:pb-0"
                    >
                      <Skeleton className="flex-shrink-0 w-20 h-20 mr-4 bg-gray-100 rounded-md" />
                      <div className="flex-grow">
                        <Skeleton className="w-32 h-5 mb-2 bg-gray-100" />
                        <Skeleton className="w-20 h-4 mb-1 bg-gray-100" />
                        <Skeleton className="w-16 h-4 bg-gray-100" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="w-20 h-5 mb-1 bg-gray-100" />
                        <Skeleton className="w-16 h-4 bg-gray-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 bg-gray-100 w-36" />
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Skeleton className="h-5 mb-2 bg-gray-100 w-28" />
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Skeleton className="bg-gray-100 h-4 w-4 mr-2 mt-0.5" />
                        <div className="space-y-1">
                          <Skeleton className="w-40 h-4 bg-gray-100" />
                          <Skeleton className="w-32 h-4 bg-gray-100" />
                          <Skeleton className="w-20 h-4 bg-gray-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-5 mb-2 bg-gray-100 w-28" />
                    <div className="space-y-2">
                      <Skeleton className="w-32 h-4 bg-gray-100" />
                      <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-1 bg-gray-100" />
                        <Skeleton className="h-4 bg-gray-100 w-36" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-1 bg-gray-100" />
                        <Skeleton className="h-4 bg-gray-100 w-28" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 bg-gray-100 w-28" />
              </CardHeader>
              <CardContent>
                <ol className="relative ml-3 border-l border-gray-200">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="mb-6 ml-6">
                      <Skeleton className="absolute w-6 h-6 bg-gray-100 rounded-full -left-3" />
                      <div className="flex items-center mb-1">
                        <Skeleton className="w-24 h-5 mr-3 bg-gray-100" />
                        {index === 0 && (
                          <Skeleton className="w-12 h-5 bg-gray-100" />
                        )}
                      </div>
                      <Skeleton className="w-32 h-4 mb-1 bg-gray-100" />
                      <Skeleton className="w-48 h-4 mb-1 bg-gray-100" />
                      <Skeleton className="w-20 h-3 bg-gray-100" />
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 bg-gray-100 w-28" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex justify-between">
                        <Skeleton className="w-16 h-4 bg-gray-100" />
                        <Skeleton className="w-20 h-4 bg-gray-100" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <Skeleton className="w-12 h-5 bg-gray-100" />
                      <Skeleton className="w-24 h-5 bg-gray-100" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Skeleton className="w-24 h-4 mb-1 bg-gray-100" />
                    <Skeleton className="w-32 h-4 mb-1 bg-gray-100" />
                    <Skeleton className="w-16 h-4 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="bg-secondary">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 bg-gray-100 w-36" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-start">
                      <Skeleton className="bg-gray-100 h-4 w-4 mr-2 mt-0.5" />
                      <div>
                        <Skeleton className="w-12 h-4 mb-1 bg-gray-100" />
                        <Skeleton className="h-4 bg-gray-100 w-28" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-orange-100 bg-orange-50">
              <CardHeader className="pb-3">
                <Skeleton className="w-20 h-6 " />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-4 mb-2 " />
                <Skeleton className="w-3/4 h-4 mb-4 " />
                <Skeleton className="w-full h-10 " />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
