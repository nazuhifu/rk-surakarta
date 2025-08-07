import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";

import { getBeritaBySlug } from "./utils";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/portable-text-components";
import ShareButtons from "@/components/share-buttons";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params) {
  const berita = await getBeritaBySlug(params.slug);

  if (!berita) {
    return {
      title: "Berita tidak ditemukan | RK Surakarta",
      description: "Berita yang Anda cari tidak tersedia.",
    };
  }

  const beritaUrl = `https://rksurakarta.vercel.app/berita/${params.slug}`;
  const imageUrl = berita.image ? urlFor(berita.image).width(1200).height(630).url() : "https://rksurakarta.vercel.app/images/og-image.png";

  const rawDescription = (berita.content || [])
    .filter((block: any) => block._type === "block" && block.children)
    .map((block: any) => block.children.map((span: any) => span.text).join(" "))
    .join(" ");

  const trimmed = rawDescription.slice(0, 155);
  const lastSpace = trimmed.lastIndexOf(" ");
  const description = trimmed.slice(0, lastSpace > 0 ? lastSpace : 155) + "…";

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
        },
      ],
      siteName: "RK Surakarta",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: berita.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BeritaDetailPage({ params }: Params) {
  const berita = await getBeritaBySlug(params.slug);

  if (!berita) {
    notFound();
  }

  const beritaUrl = `https://rksurakarta.vercel.app/berita/${params.slug}`;
  const beritaTitle = berita.title;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="py-12 container max-w-3xl">
        <div className="mb-6">
          <Link href="/berita" className="text-primary hover:underline">
            ← Kembali ke Berita
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">{berita.title}</h1>
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

        {berita.image && berita.image.asset && berita.image.asset.url && berita.image.asset.metadata && berita.image.asset.metadata.dimensions ? (
          <div className="mb-6 w-full max-w-full rounded-xl overflow-hidden">
            <Image src={berita.image.asset.url} alt={berita.title} width={berita.image.asset.metadata.dimensions.width} height={berita.image.asset.metadata.dimensions.height} className="object-contain w-full h-auto" priority />
          </div>
        ) : (
          <div className="mb-6 w-full max-w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center aspect-video">
            <Image src="/placeholder.jpg" alt="Tidak ada gambar" width={800} height={450} className="object-contain w-full h-auto opacity-60" priority />
          </div>
        )}

        <div className="text-base leading-relaxed space-y-4">
          {berita.content && berita.content.length > 0 ? <PortableText value={berita.content} components={portableTextComponents} /> : <div className="text-muted-foreground italic">Konten belum tersedia.</div>}
        </div>

        <ShareButtons title={beritaTitle} url={beritaUrl} />
      </main>
    </div>
  );
}
