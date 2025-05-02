"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { ArrowRight, Calendar, Users } from "lucide-react";
import SearchInput from "@/components/search-input";
import { portableTextComponents } from "@/components/portable-text-components";

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
    const [filtered, setFiltered] = useState<Berita[]>([]); // Inisialisasi sebagai array kosong

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await client.fetch(query);
                const mapped = result.map((item: any) => ({
                    ...item,
                    imageUrl: item.image ? urlFor(item.image).url() : "/placeholder.jpg",
                }));
                setData(mapped);
                setFiltered(mapped); // Set filtered setelah data berhasil di-fetch
            } catch (error) {
                console.error("Gagal memuat berita:", error);
            }
        }
        fetchData();
    }, []);

    const handleSearch = (keyword: string) => {
        const lowerCaseKeyword = keyword.toLowerCase();
        const filteredData = data.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(lowerCaseKeyword);
            const contentMatch = item.content.some((block: any) => {
                if (block._type === "block" && block.children) {
                    return block.children.some((span: any) => span.text && span.text.toLowerCase().includes(lowerCaseKeyword));
                }
                return false;
            });
            return titleMatch || contentMatch;
        });
        setFiltered(filteredData);
    };

    const [featured, ...others] = filtered;
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6); // Tambah 6 item setiap klik
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

                {data.length > 0 && filtered.length === 0 && (
                    <div className="container py-12">
                        <p className="text-center text-muted-foreground">Tidak ditemukan berita dengan kata kunci tersebut.</p>
                    </div>
                )}

                {data.length === 0 && (
                    <div className="container py-12">
                        <p className="text-center text-muted-foreground">Sedang memuat berita...</p>
                    </div>
                )}

                {featured && (
                    <section className="py-12">
                        <div className="container">
                            <h2 className="text-2xl font-bold mb-8 text-foreground">Berita Utama</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Featured Berita */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                                    <div className="relative h-80">
                                        <Image src={featured.imageUrl} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform group-hover:scale-105" priority />
                                        <div className="absolute top-4 left-4 bg-secondary dark:bg-primary text-white text-xs font-medium px-2 py-1 rounded">Utama</div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                                            <span className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {new Date(featured.publishedAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                {featured.category}
                                            </span>
                                        </div>
                                        <Link href={`/berita/${featured.slug.current}`}>
                                            <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors text-foreground">{featured.title}</h3>
                                        </Link>
                                        <div className="text-muted-foreground mb-4 line-clamp-3">
                                            <PortableText value={featured.content} components={portableTextComponents} />
                                        </div>
                                        <Link href={`/berita/${featured.slug.current}`} className="text-primary font-medium group-hover:underline inline-flex items-center group">
                                            Selengkapnya
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Other Berita */}
                                <div className="flex flex-col gap-6">
                                    {others.slice(0, 3).map((item) => (
                                        <div key={item._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group flex flex-col md:flex-row gap-6">
                                            <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden rounded-lg">
                                                <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                            </div>
                                            <div className="md:w-2/3">
                                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {new Date(item.publishedAt).toLocaleDateString()}
                                                </div>
                                                <Link href={`/berita/${item.slug.current}`}>
                                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors text-foreground">{item.title}</h3>
                                                </Link>
                                                <div className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                                    <PortableText value={item.content} components={portableTextComponents} />
                                                </div>
                                                <Link href={`/berita/${item.slug.current}`} className="text-primary font-medium group-hover:underline inline-flex items-center group">
                                                    Selengkapnya
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Other Berita */}
                {others.length > 0 && (
                    <section className="py-12 bg-gray-50 dark:bg-gray-900">
                        <div className="container">
                            <h2 className="text-2xl font-bold mb-8">Berita & Aktivitas Terbaru</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {others.slice(3, 3 + visibleCount).map((item) => (
                                    <div key={item._id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-all group">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {new Date(item.publishedAt).toLocaleDateString()}
                                            </div>
                                            <Link href={`/berita/${item.slug.current}`}>
                                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                            </Link>
                                            <div className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                                <PortableText value={item.content} components={portableTextComponents} />
                                            </div>
                                            <Link href={`/berita/${item.slug.current}`} className="text-primary font-medium group-hover:underline inline-flex items-center group">
                                                Selengkapnya
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {visibleCount < others.length - 3 && (
                                <div className="text-center mt-8">
                                    <button onClick={handleLoadMore} className="px-6 py-2 text-sm font-medium rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition">
                                        Tampilkan Lebih Banyak
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}