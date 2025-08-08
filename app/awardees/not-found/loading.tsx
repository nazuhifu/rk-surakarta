export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/20 dark:to-background border-b">
          <div className="container text-center">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 max-w-3xl mx-auto animate-pulse"></div>
          </div>
        </section>
        <section className="py-12">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse mx-auto"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse mx-auto"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
