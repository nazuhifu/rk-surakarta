import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useMemo } from "react";

type Props = {
  data: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    imageUrl: string;
    content: any[];
    category?: string;
  };
};

export default function BeritaCard({ data }: Props) {
  // Improved content preview extraction
  const contentPreview = useMemo(() => {
    if (!data.content || data.content.length === 0) {
      return "Konten belum tersedia.";
    }

    const firstBlock = data.content.find((block: any) => block._type === "block" && block.children && block.children.length > 0);

    if (!firstBlock) {
      return "Konten belum tersedia.";
    }

    const text = firstBlock.children
      .filter((span: any) => span.text)
      .map((span: any) => span.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return text.slice(0, 150) + (text.length > 150 ? "..." : "");
  }, [data.content]);

  const formattedDate = useMemo(() => {
    return new Date(data.publishedAt).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [data.publishedAt]);

  return (
    <article className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group flex flex-col gap-4 h-full">
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback to placeholder on error
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.jpg";
          }}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center text-sm text-muted-foreground mb-4 gap-4 flex-wrap">
          <time dateTime={data.publishedAt} className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formattedDate}
          </time>
          {data.category && <span className="capitalize bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{data.category}</span>}
        </div>

        <Link href={`/berita/${data.slug.current}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg mb-3 text-foreground line-clamp-2">{data.title}</h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">{contentPreview}</p>

        <Link href={`/berita/${data.slug.current}`} className="text-primary font-medium group-hover:underline inline-flex items-center mt-auto" aria-label={`Baca selengkapnya tentang ${data.title}`}>
          Selengkapnya
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
