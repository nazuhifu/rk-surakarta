"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Awardee detail page error:", error);
  }, [error]);

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
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan</h2>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Maaf, terjadi kesalahan saat memuat data profil awardee. Silakan coba lagi.</AlertDescription>
              </Alert>
              <div className="space-x-4">
                <Button onClick={reset} className="inline-flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Coba Lagi
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/awardees" className="inline-flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Daftar Awardee
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
