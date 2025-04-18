import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="mb-3">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
        blockquote: ({ children }: any) => <blockquote className="italic border-l-4 border-gray-300 pl-4 my-4">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
        number: ({ children }: any) => <li className="mb-1">{children}</li>,
    },
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null; // Handle jika tidak ada gambar
            }
            return (
                <div className="relative w-full my-6 rounded-md overflow-hidden">
                    <Image src={urlFor(value).url()} alt={value?.alt || "Gambar dalam berita"} width={800} height={450} className="object-cover w-full h-auto" />
                    {value?.alt && <p className="text-sm text-gray-500 mt-1">{value.alt}</p>}
                </div>
            );
        },
    },
};
