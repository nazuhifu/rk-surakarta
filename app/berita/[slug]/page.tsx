import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text-components";
import ShareButtons from "@/components/share-buttons";

interface Params {
    params: {
        slug: string;
    };
}

interface Berita {
    title: string;
    slug: {
        current: string;
    };
    content: any[];
    image: any;
    publishedAt: string;
    category: string;
}

export async function getBeritaBySlug(slug: string): Promise<Berita | undefined> {
    const query = groq`*[_type == "berita" && slug.current == $slug][0]{
        title,
        slug,
        content,
        image,
        publishedAt,
        category
    }`;

    const data = await client.fetch<Berita>(query, { slug });
    return data;
}

export default async function BeritaDetailPage({ params }: Params) {
    const { slug } = await params;
    const berita = await getBeritaBySlug(slug);

    if (!berita) {
        notFound();
    }

    const beritaUrl = `https://rksurakarta.vercel.app/berita/${slug}`;
    const beritaTitle = berita.title;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="py-12 container max-w-3xl">
                <div className="mb-6">
                    <Link href="/berita" className="text-primary hover:underline">
                        ← Kembali ke Berita
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-4">{berita.title}</h1>
                <div className="flex items-center text-sm text-muted-foreground mb-6 gap-4">
                    <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(berita.publishedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                    <span className="capitalize">{berita.category}</span>
                </div>

                {berita.image && (
                    <div className="mb-6 w-full max-w-full rounded-xl overflow-hidden">
                        <Image src={urlFor(berita.image).width(800).url()} alt={berita.title} width={800} height={450} className="object-contain w-full h-auto" priority />
                    </div>
                )}

                <div className="text-base leading-relaxed space-y-4">
                    <PortableText value={berita.content} components={portableTextComponents} />
                </div>

                <ShareButtons title={beritaTitle} url={beritaUrl} />
            </main>
        </div>
    );
}