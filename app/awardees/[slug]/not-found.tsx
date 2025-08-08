import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white dark:from-primary/20 dark:to-background border-b">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Profil Awardee</h1>
            <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Detail informasi awardee RK Surakarta</p>
          </div>
        </section>
        <section className="py-12">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Profil Tidak Ditemukan</h2>
              <p className="text-muted-foreground mb-6">Maaf, profil awardee yang Anda cari tidak ditemukan. Hal ini bisa terjadi karena:</p>
              <ul className="text-muted-foreground mb-6 text-left max-w-md mx-auto space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>URL yang Anda masukkan salah</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Profil awardee belum tersedia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Data sedang dalam proses update</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/awardees">Kembali ke Daftar Awardee</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
