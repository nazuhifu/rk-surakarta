"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("berita_visible_count");
      return saved ? Number(saved) : 9;
    }
    return 9;
  });
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
        setVisibleCount(() => {
          if (typeof window !== "undefined") {
            const saved = window.localStorage.getItem("berita_visible_count");
            return saved ? Number(saved) : 9;
          }
          return 9;
        });
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
      setVisibleCount(9);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("berita_visible_count", "9");
      }
    },
    [data]
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => {
      const next = Math.min(prev + 9, filtered.length);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("berita_visible_count", String(next));
      }
      return next;
    });
  }, [filtered.length]);

  const hasMoreItems = useMemo(() => visibleCount < filtered.length, [visibleCount, filtered.length]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 9 }).map((_, index) => (
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
                    setVisibleCount(() => {
                      if (typeof window !== "undefined") {
                        const saved = window.localStorage.getItem("berita_visible_count");
                        return saved ? Number(saved) : 9;
                      }
                      return 9;
                    });
                  }}
                  className="px-6 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  Tampilkan Semua Berita
                </button>
              </div>
            )}

            {!isLoading && !error && filtered.length > 0 && (
              <>
                {/* Highlight section for the newest/first item */}
                {filtered[0] && (
                  <Link href={`/berita/${filtered[0].slug?.current ?? ""}`} className="group block mb-12">
                    <article className="overflow-hidden rounded-2xl border bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="relative h-64 sm:h-80 lg:h-full">
                          <Image src={filtered[0].imageUrl || "/placeholder.jpg"} alt={filtered[0].title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0 lg:hidden" />
                        </div>
                        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                          <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">{filtered[0].category || "Umum"}</span>
                            <time dateTime={filtered[0].publishedAt}>
                              {new Date(filtered[0].publishedAt).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">{filtered[0].title}</h2>
                          <p className="mt-4 line-clamp-3 text-muted-foreground">
                            {(() => {
                              try {
                                const firstBlock = filtered[0].content?.find((b: any) => b._type === "block");
                                const text = firstBlock?.children?.map((c: any) => c.text).join(" ") || "";
                                return text;
                              } catch {
                                return "";
                              }
                            })()}
                          </p>
                          <span className="mt-6 inline-flex items-center text-primary font-medium">
                            Baca selengkapnya
                            <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Grid for the rest items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered
                    .slice(1) // exclude the highlighted one
                    .slice(0, Math.max(0, visibleCount - 1))
                    .map((item) => (
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
