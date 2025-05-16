"use client";

import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import SearchInput from "@/components/search-input";
import BeritaCard from "@/components/berita-card";

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

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await client.fetch(query);
                const mapped = result.map((item: any) => ({
                    ...item,
                    imageUrl: item.image ? urlFor(item.image).url() : "/placeholder.jpg",
                }));
                setData(mapped);
                setFiltered(mapped);
            } catch (error) {
                console.error("Gagal memuat berita:", error);
            }
        }
        fetchData();
    }, []);

    const handleSearch = (keyword: string) => {
        const lower = keyword.toLowerCase();
        const result = data.filter((item) => {
            const matchTitle = item.title.toLowerCase().includes(lower);
            const matchContent = item.content?.some((block: any) => block._type === "block" && block.children?.some((span: any) => span.text?.toLowerCase().includes(lower)));
            return matchTitle || matchContent;
        });
        setFiltered(result);
    };

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
                        {data.length === 0 && <p className="text-center text-muted-foreground">Sedang memuat berita...</p>}

                        {data.length > 0 && filtered.length === 0 && <p className="text-center text-muted-foreground">Tidak ditemukan berita dengan kata kunci tersebut.</p>}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.slice(0, visibleCount).map((item) => (
                                <BeritaCard key={item._id} data={item} />
                            ))}
                        </div>

                        {visibleCount < filtered.length && (
                            <div className="text-center mt-8">
                                <button onClick={() => setVisibleCount((prev) => prev + 6)} className="px-6 py-2 text-sm font-medium rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition">
                                    Tampilkan Lebih Banyak
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
