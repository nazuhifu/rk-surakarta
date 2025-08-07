import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";

import { getBeritaBySlug, getAllBeritaSlugs } from "./utils";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/portable-text-components";
import ShareButtons from "@/components/share-buttons";

interface Params {
  params: { slug: string };
}

// Generate static params for all berita
export async function generateStaticParams() {
  const slugs = await getAllBeritaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) {
    return {
      title: "Berita tidak ditemukan | RK Surakarta",
      description: "Berita yang Anda cari tidak tersedia.",
    };
  }

  const beritaUrl = `https://rksurakarta.vercel.app/berita/${slug}`;
  const imageUrl = berita.image ? urlFor(berita.image).width(1200).height(630).url() : "https://rksurakarta.vercel.app/images/og-image.png";

  // Improved content extraction for description
  const rawDescription = (berita.content || [])
    .filter((block: any) => block._type === "block" && block.children)
    .map((block: any) =>
      block.children
        .filter((span: any) => span.text)
        .map((span: any) => span.text)
        .join(" ")
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const trimmed = rawDescription.slice(0, 155);
  const lastSpace = trimmed.lastIndexOf(" ");
  const description = trimmed.slice(0, lastSpace > 0 ? lastSpace : 155) + (rawDescription.length > 155 ? "…" : "");

  return {
    title: `${berita.title} | RK Surakarta`,
    description,
    openGraph: {
      type: "article",
      url: beritaUrl,
      title: berita.title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: berita.title,
        },
      ],
      siteName: "RK Surakarta",
      locale: "id_ID",
      publishedTime: berita.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: berita.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: beritaUrl,
    },
  };
}

export default async function BeritaDetailPage({ params }: Params) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) {
    notFound();
  }

  const beritaUrl = `https://rksurakarta.vercel.app/berita/${slug}`;
  const beritaTitle = berita.title;

  // Check if image exists and has proper metadata
  const hasValidImage = berita.image && berita.image.asset && berita.image.asset.url && berita.image.asset.metadata && berita.image.asset.metadata.dimensions;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="py-12 container max-w-3xl">
        <div className="mb-6">
          <Link href="/berita" className="text-primary hover:underline inline-flex items-center gap-2 transition-colors">
            ← Kembali ke Berita
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{berita.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-6 gap-4 flex-wrap">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(berita.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {berita.category && <span className="capitalize bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{berita.category}</span>}
            </div>
          </header>

          {hasValidImage ? (
            <div className="mb-8 w-full rounded-xl overflow-hidden">
              <Image
                src={berita.image!.asset.url}
                alt={berita.title}
                width={berita.image!.asset.metadata.dimensions.width}
                height={berita.image!.asset.metadata.dimensions.height}
                className="object-cover w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="mb-8 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center aspect-video">
              <div className="text-center text-muted-foreground">
                <p>Tidak ada gambar</p>
              </div>
            </div>
          )}

          <div className="prose prose-gray dark:prose-invert max-w-none">
            {berita.content && berita.content.length > 0 ? <PortableText value={berita.content} components={portableTextComponents} /> : <div className="text-muted-foreground italic text-center py-8">Konten belum tersedia.</div>}
          </div>
        </article>

        <ShareButtons title={beritaTitle} url={beritaUrl} />
      </main>
    </div>
  );
}
