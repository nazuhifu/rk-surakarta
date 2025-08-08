export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="relative h-[50vh] min-h-[400px]">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="container relative h-full flex flex-col justify-end pb-12 z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-xl overflow-hidden border-4 border-white shadow-xl bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              <div className="text-white">
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded-full mb-2 animate-pulse"></div>
                <div className="h-8 w-64 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section Skeleton */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Biography Skeleton */}
                <div>
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                  </div>
                </div>

                {/* Education Skeleton */}
                <div>
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-6">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-700">
                        <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Skeleton */}
                <div>
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-6">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l border-gray-200 dark:border-gray-700">
                        <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
