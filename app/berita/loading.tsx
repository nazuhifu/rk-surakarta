export default function Loading() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground text-lg">Loading...</p>
          </div>
      </div>
  );
}
