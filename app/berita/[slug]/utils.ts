import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface BeritaImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

interface Berita {
  _id: string;
  title: string;
  slug: { current: string };
  content: any[];
  image: BeritaImage | null;
  publishedAt: string;
  category: string;
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  if (!slug) {
    return null;
  }

  try {
    const query = groq`*[_type == "berita" && slug.current == $slug][0]{
      _id,
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
    return data || null;
  } catch (error) {
    console.error("Error fetching berita by slug:", error);
    return null;
  }
}

// Add a function to get all berita slugs for static generation
export async function getAllBeritaSlugs(): Promise<string[]> {
  try {
    const query = groq`*[_type == "berita" && defined(slug.current)]{
      "slug": slug.current
    }`;

    const data = await client.fetch<{ slug: string }[]>(query);
    return data.map((item) => item.slug);
  } catch (error) {
    console.error("Error fetching berita slugs:", error);
    return [];
  }
}
