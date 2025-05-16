import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

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
    const contentPreview = data.content?.[0]?.children?.[0]?.text?.slice(0, 150) || "";

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group flex flex-col gap-4">
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image src={data.imageUrl} alt={data.title} fill className="object-cover transition-transform group-hover:scale-105" />
            </div>
            <div>
                <div className="flex items-center text-sm text-muted-foreground mb-6 gap-4">
                    <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(data.publishedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                    <span className="capitalize">{data.category}</span>
                </div>
                <Link href={`/berita/${data.slug.current}`}>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors text-foreground">{data.title}</h3>
                </Link>
                <div className="text-muted-foreground text-sm line-clamp-3 mb-4">{contentPreview}...</div>
                <Link href={`/berita/${data.slug.current}`} className="text-primary font-medium group-hover:underline inline-flex items-center group">
                    Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
