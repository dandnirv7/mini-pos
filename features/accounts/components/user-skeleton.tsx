import { Skeleton } from "@/components/ui/skeleton";

export default function UserSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b md:px-16">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-8" />

            <div className="flex items-center gap-4">
              <nav className="items-center hidden gap-6 md:flex">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-16 h-4" />
                ))}
              </nav>

              <Skeleton className="relative w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <Skeleton className="w-64 h-8 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 rounded-md bg-secondary">
                  <div className="flex items-center">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="ml-3 space-y-2">
                      <Skeleton className="w-24 h-4" />
                      <Skeleton className="w-16 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="p-6 rounded-md bg-secondary">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-20 h-6" />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {[...Array(2)].map((_, idx) => (
                          <Skeleton
                            key={idx}
                            className="w-10 h-10 border-2 border-white rounded-full"
                          />
                        ))}
                        <Skeleton className="w-10 h-10 border-2 border-white rounded-full" />
                      </div>
                      <div>
                        <Skeleton className="w-24 h-4 mb-1" />
                        <Skeleton className="w-16 h-3" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="space-y-1 text-right">
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="w-24 h-4" />
                      </div>
                      <Skeleton className="w-20 h-8 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Daily Deals */}
            <div className="p-6 rounded-md bg-secondary">
              <div className="flex flex-row items-center justify-between mb-4">
                <div className="space-y-1">
                  <Skeleton className="w-48 h-6" />
                  <Skeleton className="w-64 h-4" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="relative h-56 bg-gray-200 rounded-md animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="p-6 rounded-md bg-secondary">
              <Skeleton className="w-32 h-6 mb-4" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-10 mb-3 rounded-md" />
              ))}
            </div>

            {/* Frequently Bought */}
            <div className="p-6 rounded-md bg-secondary">
              <Skeleton className="w-40 h-6 mb-2" />
              <Skeleton className="w-64 h-4 mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-24 h-3" />
                      <Skeleton className="w-20 h-2" />
                    </div>
                    <Skeleton className="w-20 h-8 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="p-6 rounded-md bg-secondary">
              <Skeleton className="w-40 h-6 mb-2" />
              <Skeleton className="w-64 h-4 mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-24 h-3" />
                      <Skeleton className="w-20 h-2" />
                    </div>
                    <Skeleton className="w-20 h-8 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Preferences */}
            <div className="p-6 rounded-md bg-secondary">
              <Skeleton className="h-6 mb-4 w-44" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4 space-y-1 last:mb-0">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-48 h-3" />
                </div>
              ))}
              <Skeleton className="w-full h-10 rounded" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
