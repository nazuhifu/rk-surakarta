import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface Berita {
    title: string;
    slug: { current: string };
    content: any[];
    image: {
        asset: {
            url: string;
            metadata: {
                dimensions: {
                    width: number;
                    height: number;
                };
            };
        };
    } | null;
    publishedAt: string;
    category: string;
}

export async function getBeritaBySlug(slug: string): Promise<Berita | undefined> {
    const query = groq`*[_type == "berita" && slug.current == $slug][0]{
      title,
      slug,
      content,
      image {
        asset->{
          _id,
          url,
          metadata { dimensions { width, height } }
        }
      },
      publishedAt,
      category
    }`;

    const data = await client.fetch<Berita>(query, { slug });
    return data;
}
