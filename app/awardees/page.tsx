// ./awardees/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Search, AlertCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Awardee } from "@/types/awardee";

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
      imageUrl: item.image ? urlFor(item.image).url() : "/images/placeholder-avatar.png",
    }));
  } catch (error) {
    console.error("Failed to fetch awardees:", error);
    throw new Error("Gagal memuat data awardee");
  }
}

export default function AwardeesPage() {
  const [allAwardees, setAllAwardees] = useState<Awardee[]>([]);
  const [filteredAwardees, setFilteredAwardees] = useState<Awardee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  useEffect(() => {
    const fetchAndSetAwardees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const awardeesData = await getAwardees();
        setAllAwardees(awardeesData);
        setFilteredAwardees(awardeesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetAwardees();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const results = allAwardees.filter((awardee) => {
            const matchesSearch =
              (awardee.name?.toLowerCase() ?? "").includes(query.toLowerCase()) ||
              (awardee.program?.toLowerCase() ?? "").includes(query.toLowerCase()) ||
              (awardee.role?.toLowerCase() ?? "").includes(query.toLowerCase()) ||
              (awardee.year ?? "").includes(query);

            const matchesYear = selectedYear === "all" || awardee.year === selectedYear;

            return matchesSearch && matchesYear;
          });
          setFilteredAwardees(results);
        }, 300);
      };
    })(),
    [allAwardees, selectedYear]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const handleYearFilter = useCallback(
    (year: string) => {
      setSelectedYear(year);
      const results = allAwardees.filter((awardee) => {
        const matchesSearch =
          (awardee.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
          (awardee.program?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
          (awardee.role?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
          (awardee.year ?? "").includes(searchQuery);

        const matchesYear = year === "all" || awardee.year === year;

        return matchesSearch && matchesYear;
      });
      setFilteredAwardees(results);
    },
    [allAwardees, searchQuery]
  );

  // Get unique years for filter
  const uniqueYears = [...new Set(allAwardees.map((awardee) => awardee.year).filter(Boolean))].sort((a, b) => (b || "").localeCompare(a || ""));

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/20 dark:to-background border-b">
            <div className="container text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">RK Surakarta Awardees</h1>
              <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Mahasiswa yang telah menjadi keluarga Rumah Kepemimpinan Regional 9 Surakarta</p>
            </div>
          </section>
          <section className="py-12">
            <div className="container">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="mt-4">
                <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/20 dark:to-background border-b">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">RK Surakarta Awardees</h1>
            <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Mahasiswa yang telah menjadi keluarga Rumah Kepemimpinan Regional 9 Surakarta</p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Cari nama, jurusan, atau tahun..."
                className="w-full p-4 pl-12 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-gray-900"
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Cari awardee"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Filters */}
        {!isLoading && allAwardees.length > 0 && (
          <section className="py-6 border-b">
            <div className="container">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant={selectedYear === "all" ? "default" : "outline"} size="sm" onClick={() => handleYearFilter("all")}>
                  Semua Tahun
                </Button>
                {uniqueYears.map((year) => (
                  <Button key={year} variant={selectedYear === year ? "default" : "outline"} size="sm" onClick={() => handleYearFilter(year || "")}>
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Awardees Grid */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground text-lg">Memuat data awardee...</p>
              </div>
            ) : allAwardees.length > 0 ? (
              filteredAwardees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAwardees.map((awardee) => (
                    <AwardeeCard key={awardee._id} name={awardee.name} role={awardee.role} program={awardee.program} year={awardee.year} image={awardee.imageUrl} slug={awardee.slug?.current} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Tidak ada awardee yang ditemukan.</p>
                  <p className="text-muted-foreground">Coba ubah kata kunci pencarian atau filter tahun.</p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Belum ada data awardee.</p>
                <p className="text-muted-foreground">Data awardee akan ditampilkan setelah tersedia.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

interface AwardeeCardProps {
  name?: string | null;
  role?: string | null;
  program?: string | null;
  year?: string | null;
  image?: string;
  slug?: string | undefined;
}

function AwardeeCard({ name, role, program, year, image, slug }: AwardeeCardProps) {
  // Jika tidak ada slug, gunakan slug dummy yang akan mengarah ke not-found
  const targetSlug = slug || "not-found";

  return (
    <Link href={`/awardees/${targetSlug}`} aria-label={`Lihat profil ${name}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image || "/images/placeholder-avatar.png"}
            alt={name ? `Foto ${name}` : "Foto awardee"}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
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
