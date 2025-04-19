// ./awardee/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link"; // Import Link
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GraduationCap, Search } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect, useCallback } from "react";

interface Awardee {
  _id: string;
  name?: string | null;
  role?: string | null;
  program?: string | null;
  year?: string | null;
  imageUrl: string;
  slug?: {
    current?: string;
  };
}

async function getAwardees(): Promise<Awardee[]> {
  try {
    const data = await client.fetch(`
      *[_type == "awardee"] | order(year desc, name asc) {
        _id,
        name,
        role,
        program,
        year,
        image,
        slug
      }
    `);

    return data.map((item: any) => ({
      ...item,
      imageUrl: item.image ? urlFor(item.image).url() : "/placeholder.svg",
    }));
  } catch (error) {
    console.error("Failed to fetch awardees:", error);
    return [];
  }
}

export default function AwardeesPage() {
  const [allAwardees, setAllAwardees] = useState<Awardee[]>([]);
  const [filteredAwardees, setFilteredAwardees] = useState<Awardee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAndSetAwardees = async () => {
      const awardeesData = await getAwardees();
      setAllAwardees(awardeesData);
      setFilteredAwardees(awardeesData); // Initialize filteredAwardees after data is fetched
    };

    fetchAndSetAwardees();
  }, []);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const results = allAwardees.filter((awardee) =>
      (awardee.name?.toLowerCase() ?? "").includes(query) ||
      (awardee.program?.toLowerCase() ?? "").includes(query) ||
      (awardee.role?.toLowerCase() ?? "").includes(query) ||
      (awardee.year ?? "").includes(query)
    );
    setFilteredAwardees(results);
  }, [allAwardees]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/20 dark:to-background border-b">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">RK Surakarta Awardees</h1>
            <p className="texl-md md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Mahasiswa yang telah menjadi keluarga Rumah Kepemimpinan Regional 9 Surakarta</p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Cari nama, jurusan, atau tahun..."
                className="w-full p-4 pl-12 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-gray-900"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Awardees Grid */}
        <section className="py-12">
          <div className="container">
            {allAwardees.length > 0 ? (
              filteredAwardees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAwardees.map((awardee) => (
                    <AwardeeCard
                      key={awardee._id}
                      name={awardee.name}
                      role={awardee.role}
                      program={awardee.program}
                      year={awardee.year}
                      image={awardee.imageUrl}
                      slug={awardee.slug?.current} // Kirim slug ke AwardeeCard
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Tidak ada awardee yang ditemukan.</p>
              )
            ) : (
              <p className="text-center text-muted-foreground">Sedang memuat data awardee...</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

interface AwardeeCardProps {
  name?: string | null;
  role?: string | null;
  program?: string | null;
  year?: string | null;
  image: string;
  slug?: string; // Terima properti slug
}

function AwardeeCard({ name, role, program, year, image, slug }: AwardeeCardProps) {
  return (
    <Link href={`/awardees/${slug}`}> {/* Gunakan Link untuk navigasi */}
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group cursor-pointer"> {/* Tambahkan cursor-pointer */}
        <div className="relative h-64 overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={name || "Awardee Image"} fill className="object-cover transition-transform group-hover:scale-105" />
          <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-medium px-2 py-1 rounded">{year}</div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{name || "Nama Tidak Tersedia"}</h3>
          <p className="text-muted-foreground text-sm mb-2">{role || "Role Tidak Tersedia"}</p>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm">{program || "Program Tidak Tersedia"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}