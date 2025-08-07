"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import SearchInput from "@/components/search-input";
import BeritaCard from "@/components/berita-card";
import { Skeleton } from "@/components/ui/skeleton";

type Berita = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  imageUrl: string;
  content: any[];
  category: string;
};

const query = groq`*[_type == "berita"] | order(publishedAt desc){
  _id,
  title,
  slug,
  content,
  publishedAt,
  category,
  image
}`;

export default function BeritaPage() {
  const [data, setData] = useState<Berita[]>([]);
  const [filtered, setFiltered] = useState<Berita[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await client.fetch(query);
        const mapped = result.map((item: any) => ({
          ...item,
          imageUrl: item?.image && item.image.asset ? urlFor(item.image).url() : "/placeholder.jpg",
        }));
        setData(mapped);
        setFiltered(mapped);
      } catch (err: any) {
        setError("Gagal memuat berita. Silakan coba lagi nanti.");
        console.error("Gagal memuat berita:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) {
        setFiltered(data);
        setVisibleCount(6);
        return;
      }

      const lower = keyword.toLowerCase().trim();
      const result = data.filter((item) => {
        const matchTitle = item.title.toLowerCase().includes(lower);
        const matchCategory = item.category?.toLowerCase().includes(lower);
        const matchContent = item.content?.some((block: any) => block._type === "block" && block.children?.some((span: any) => span.text?.toLowerCase().includes(lower)));
        return matchTitle || matchCategory || matchContent;
      });
      setFiltered(result);
      setVisibleCount(6);
    },
    [data]
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 6, filtered.length));
  }, [filtered.length]);

  const hasMoreItems = useMemo(() => visibleCount < filtered.length, [visibleCount, filtered.length]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
          <Skeleton className="h-48 w-full rounded-lg mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-background border-b">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">Berita & Aktivitas</h1>
            <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Stay update tentang berita dan aktivitas terbaru dari Rumah Kepemimpinan Regional 9 Surakarta</p>
            <SearchInput onSearch={handleSearch} />
          </div>
        </section>

        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            {isLoading && <LoadingSkeleton />}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  Coba Lagi
                </button>
              </div>
            )}

            {!isLoading && !error && data.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Belum ada berita tersedia.</p>
              </div>
            )}

            {!isLoading && !error && data.length > 0 && filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Tidak ditemukan berita dengan kata kunci tersebut.</p>
                <button
                  onClick={() => {
                    setFiltered(data);
                    setVisibleCount(6);
                  }}
                  className="px-6 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  Tampilkan Semua Berita
                </button>
              </div>
            )}

            {!isLoading && !error && filtered.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.slice(0, visibleCount).map((item) => (
                    <BeritaCard key={item._id} data={item} />
                  ))}
                </div>

                {hasMoreItems && (
                  <div className="text-center mt-8">
                    <button onClick={handleLoadMore} className="px-6 py-2 text-sm font-medium rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Tampilkan lebih banyak berita">
                      Tampilkan Lebih Banyak ({filtered.length - visibleCount} tersisa)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
