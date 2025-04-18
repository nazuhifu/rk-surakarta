"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text-components";

type Berita = {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    excerpt?: string;
    publishedAt?: string;
    category?: string;
    image?: any;
    content: any[];
};

type Testimoni = {
    _id: string;
    name: string;
    role?: string;
    quote: string;
    image?: any;
};

const beritaQuery = `
  *[_type == "berita"] | order(publishedAt desc) [0...3]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    image,
    content
  }
`;

const testimoniQuery = `
  *[_type == "testimoni"] [0...3]{
    _id,
    name,
    role,
    quote,
    image
  }
`;

type HeroSlide = {
    _key: string;
    alt?: string;
    asset: any;
};

type HeroSlideshowData = {
    images: HeroSlide[];
};

const heroSlideshowQuery = `
    *[_type == "heroSlideshow"][0] {
      images[]{
        _key,
        alt,
        asset
      }
    }
  `;

export default function Home() {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
    const [slideshowImages, setSlideshowImages] = useState<HeroSlide[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        async function fetchHeroSlideshow() {
            try {
                const data: HeroSlideshowData = await client.fetch(heroSlideshowQuery);
                if (data?.images) {
                    setSlideshowImages(data.images);
                }
            } catch (error) {
                console.error("Gagal memuat data slideshow hero:", error);
            }
        }

        fetchHeroSlideshow();
    }, []);

    useEffect(() => {
        if (slideshowImages.length > 0) {
            const intervalId = setInterval(() => {
                goToNextSlide();
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [slideshowImages]);

    const goToPreviousSlide = () => {
        if (!isTransitioning && slideshowImages.length > 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? slideshowImages.length - 1 : prevIndex - 1));
                setIsTransitioning(false);
            }, 700);
        }
    };

    const goToNextSlide = () => {
        if (!isTransitioning && slideshowImages.length > 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
                setIsTransitioning(false);
            }, 700);
        }
    };

    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll(".reveal");
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                }
            }
        };
        window.addEventListener("scroll", reveal);
        reveal();
        return () => window.removeEventListener("scroll", reveal);
    }, []);

    useEffect(() => {
        async function fetchBerita() {
            try {
                const data = await client.fetch(beritaQuery);
                const mappedBerita = data.map((item: any) => ({
                    ...item,
                    imageUrl: item.image ? urlFor(item.image).url() : "/placeholder.svg",
                }));
                setBerita(mappedBerita);
            } catch (error) {
                console.error("Gagal memuat berita:", error);
            }
        }

        async function fetchTestimoni() {
            try {
                const data = await client.fetch(testimoniQuery);
                setTestimoni(data);
            } catch (error) {
                console.error("Gagal memuat testimoni:", error);
            }
        }

        fetchBerita();
        fetchTestimoni();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
                        <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl"></div>
                    </div>
                    <div className="container relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/50 text-secondary dark:text-secondary-foreground text-sm font-medium mb-2 animate-float">RUMAH KEPEMIMPINAN ANGKATAN XII</div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">Inkubator Pemimpin Indonesia</h1>
                            <p className="text-md md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                Menjadi inkubator pemimpin masa depan Indonesia yang siap berkontribusi dalam transformasi dan pembangunan Bangsa menuju Indonesia Maju.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                                <Link href="#tentang-kami">
                                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 group transition-all duration-300">
                                        Tentang Kami
                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
                                {slideshowImages.length > 1 && (
                                <button
                                    onClick={goToPreviousSlide}
                                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/20 text-white rounded-full p-2 z-10 hover:bg-black/40 transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                                )}
                                {slideshowImages.length > 0 && (
                                <Image
                                    key={slideshowImages[currentImageIndex]._key}
                                    src={urlFor(slideshowImages[currentImageIndex].asset).url()}
                                    alt={slideshowImages[currentImageIndex].alt || "Hero Image"}
                                    width={600}
                                    height={600}
                                    className={`rounded-lg object-cover transition-opacity duration-200 ease-in-out ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                                    priority
                                />
                                )}
                                {slideshowImages.length > 1 && (
                                <button
                                    onClick={goToNextSlide}
                                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/20 text-white rounded-full p-2 z-10 hover:bg-black/40 transition-colors"
                                >
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-lg -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/5 dark:bg-secondary/10 rounded-lg -z-10"></div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 bg-white dark:bg-gray-900">
                    <div className="container">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center reveal">
                                <p className="text-4xl font-bold text-secondary mb-2">100+</p>
                                <p className="text-muted-foreground">Awardee</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center reveal" style={{ transitionDelay: "0.1s" }}>
                                <p className="text-4xl font-bold text-secondary mb-2">4</p>
                                <p className="text-muted-foreground">Angkatan</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center reveal" style={{ transitionDelay: "0.1s" }}>
                                <p className="text-4xl font-bold text-secondary mb-2">24/7</p>
                                <p className="text-muted-foreground">Kebaikan</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center reveal" style={{ transitionDelay: "0.2s" }}>
                                <p className="text-4xl font-bold text-secondary mb-2">100%</p>
                                <p className="text-muted-foreground">Bismillah Sukses</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="tentang-kami" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                    <div className="container">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 relative reveal animate-float">
                                <div className="relative rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-[1.02] duration-500">
                                    <Image src="/images/about.webp?height=600&width=600" alt="Peserta Rumah Kepemimpinan Surakarta" width={600} height={600} className="rounded-lg" />
                                    <div className="absolute top-0 left-0 w-full h-full bg-primary/10"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-lg -z-10"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/5 dark:bg-secondary/10 rounded-lg -z-10"></div>
                            </div>
                            <div className="flex-1 space-y-6 reveal">
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/100 text-primary dark:text-foreground text-sm font-medium mb-2">Tentang Kami</div>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Tentang RK Surakarta</h2>
                                    <div className="h-1 w-20 bg-secondary mb-6"></div>
                                </div>
                                <p className="text-md md:text-lg text-muted-foreground">
                                    Rumah Kepemimpinan Regional 9 Surakarta merupakan bagian dari jaringan nasional Rumah Kepemimpinan, sebuah program pembinaan pemimpin muda berbasis nilai yang berfokus pada pengembangan karakter,
                                    kompetensi, dan kontribusi.
                                </p>
                                <p className="text-md md:text-lg text-muted-foreground">
                                    Didirikan pada tahun 2017, Regional 9 Surakarta menjadi tempat tumbuhnya mahasiswa-mahasiswa terpilih dari Universitas Sebelas Maret Surakarta. Program pembinaan yang diadaptasi dari Rumah Kepemimpinan
                                    pusat yang dirancang untuk mencetak pemimpin muda yang berintegritas, tangguh, dan siap memberi dampak nyata bagi masyarakat.
                                </p>
                                <p className="text-md md:text-lg text-muted-foreground">
                                    Rumah Kepemimpinan Surakarta bukan sekadar tempat belajar, tapi juga ruang tumbuh bersama. Di sinilah semangat bertumbuh, bertanya, berkolaborasi, dan saling menguatkan. Dengan semangat kebersamaan, kami
                                    terus berupaya menumbuhkan barisan pemuda yang siap melanjutkan estafet kebaikan di masa depan.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured News Section */}
                <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                    <div className="container">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 reveal">
                            <div>
                                <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/100 text-secondary dark:text-foreground text-sm font-medium mb-2">Update Terbaru</div>
                                <h2 className="text-center md:text-left text-3xl md:text-4xl font-bold tracking-tight">Berita</h2>
                            </div>
                            <Link href="/berita" className="mt-4 md:mt-0 inline-flex items-center text-primary font-medium hover:underline group">
                                Lihat Semua Berita
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {berita.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group reveal"
                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image src={item.image?.asset ? urlFor(item.image).url() : "/placeholder.svg"} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                        <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-medium px-2 py-1 rounded">{item.category}</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {item.publishedAt && new Date(item.publishedAt).toLocaleDateString()}
                                        </div>
                                        <Link href={`/berita/${item.slug.current}`} className="text-primary font-medium hover:underline inline-flex items-center group">
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                        </Link>
                                        {item.excerpt && <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{item.excerpt}</p>}
                                        {!item.excerpt && item.content && (
                                            <div className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                                <PortableText value={item.content} components={portableTextComponents} />
                                            </div>
                                        )}
                                        <Link href={`/berita/${item.slug.current}`} className="text-primary font-medium hover:underline inline-flex items-center group">
                                            Selengkapnya
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 md:py-24 dark:bg-gray-900">
                    <div className="container">
                        <div className="text-center mb-16 max-w-3xl mx-auto reveal">
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/100 text-primary dark:text-foreground text-sm font-medium mb-2">Testimoni</div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Kata Mereka Tentang RK</h2>
                            <div className="h-1 w-20 bg-secondary mb-6 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimoni.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all reveal"
                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20">
                                            <Image src={item.image?.asset ? urlFor(item.image).url() : "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground italic">"{item.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
